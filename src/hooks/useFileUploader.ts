import { useState, useEffect } from "react";
import { getIrysUploader } from "../utils/getIrysUploader";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import { extractPDFMetadata } from "../utils/extractPDFMetadata";

export const useFileUploader = (selectedFile: File | null) => {
  const wallet = useWallet();
  const [link, setLink] = useState<string | null>(null);
  const [uploadCost, setUploadCost] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tags, setTags] = useState<Array<{ name: string; value: string }>>([]);

  const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "";

  useEffect(() => {
    if (!selectedFile) {
      setTags([]); // 重置标签
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setErrorMessage("Wallet is not connected");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("No file selected");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setErrorMessage("Selected file is not a valid PDF");
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const connection = new Connection(rpcEndpoint);
      const irysUploader = await getIrysUploader(wallet);

      // 获取文件大小和价格
      const size = selectedFile.size;
      const price = await irysUploader.getPrice(size);
      setUploadCost(`${irysUploader.utils.fromAtomic(price)} tokens`);

      // 检查钱包余额是否足够
      const balanceInLamports = await connection.getBalance(wallet.publicKey);
      const balanceInSol = balanceInLamports / 1e9;
      setWalletBalance(`${balanceInSol.toFixed(4)} SOL`);

      if (new BigNumber(balanceInLamports).isLessThan(price)) {
        setErrorMessage("Not enough balance for transaction. Please add SOL to your wallet.");
        return;
      }

      // 提供资金（Lazy Funding）
      await irysUploader.fund(price);

      // 提取 PDF Metadata
      const metadataTags = await extractPDFMetadata(selectedFile);

      // 内联清理文件名中的非法字符
      const cleanedFileName = selectedFile.name.replace(/[:<>"/\\|?*]/g, "-");

      // 生成上传标签
      const generatedTags = [
        { name: "filename", value: cleanedFileName },
        { name: "application", value: "permapaper" }, // 添加 permapaper 标签
        ...metadataTags,
      ];

      setTags(generatedTags);

      // 打印 Tags 用于调试
      console.log("Tags for upload:", generatedTags);

      // 上传文件
      const response = await irysUploader.uploadFile(selectedFile, { tags: generatedTags });
      const irysLink = `https://gateway.irys.xyz/${response.id}`;
      setLink(irysLink);
    } catch (error) {
      setErrorMessage("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
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
    tags,
  };
};
