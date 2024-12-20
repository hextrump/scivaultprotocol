import { useState, useEffect } from "react";
import { getIrysUploader } from "../utils/getIrysUploader";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import { extractPDFMetadata } from "../utils/extractPDFMetadata";
import { extractJsonMetadata } from "../utils/extractJsonMetadata";

export const useFileUploader = (
  selectedFile: File | null,
  tags: Array<{ name: string; value: string }>,
) => {
  const wallet = useWallet();
  const [link, setLink] = useState<string | null>(null);
  const [uploadCost, setUploadCost] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "";

  const handleUpload = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setErrorMessage("Wallet is not connected");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("Please select a PDF file");
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const connection = new Connection(rpcEndpoint);
      const irysUploader = await getIrysUploader(wallet);

      const size = selectedFile.size;
      const price = await irysUploader.getPrice(size);
      setUploadCost(`${irysUploader.utils.fromAtomic(price)} tokens`);

      const balanceInLamports = await connection.getBalance(wallet.publicKey);
      const balanceInSol = balanceInLamports / 1e9;
      setWalletBalance(`${balanceInSol.toFixed(4)} SOL`);

      if (new BigNumber(balanceInLamports).isLessThan(price)) {
        throw new Error("Insufficient balance for upload");
      }

      await irysUploader.fund(price);

      console.log("Uploading with tags:", tags);
      const response = await irysUploader.uploadFile(selectedFile, { tags });
      const irysLink = `https://gateway.irys.xyz/${response.id}`;
      setLink(irysLink);
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage(error.message || "Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleUpload,
    link,
    uploadCost,
    walletBalance,
    isUploading,
    errorMessage,
  };
};
