import { FC, useState } from "react";
import { getIrysUploader } from "../utils/getIrysUploader";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";

interface UploadButtonProps {
  selectedFile: File | null; // 单个文件
}

export const UploadButton: FC<UploadButtonProps> = ({ selectedFile }) => {
  const wallet = useWallet();
  const [link, setLink] = useState<string | null>(null); // 上传后的链接
  const [uploadCost, setUploadCost] = useState<string | null>(null); // 显示上传成本
  const [walletBalance, setWalletBalance] = useState<string | null>(null); // 钱包余额
  const [isUploading, setIsUploading] = useState(false); // 上传状态
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 错误消息

  const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "";

  const handleUpload = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setErrorMessage("Wallet is not connected");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("No file selected");
      return;
    }

    // 检查是否为 PDF 文件
    if (selectedFile.type !== "application/pdf") {
      setErrorMessage("Selected file is not a valid PDF");
      return;
    }

    setErrorMessage(null); // 清空之前的错误消息
    setIsUploading(true); // 设置上传状态
    try {
      const connection = new Connection(rpcEndpoint);
      const irysUploader = await getIrysUploader(wallet);

      // 获取文件大小
      const size = selectedFile.size;

      // 获取上传成本
      const price = await irysUploader.getPrice(size);
      const formattedPrice = `${irysUploader.utils.fromAtomic(price)} tokens`;
      setUploadCost(formattedPrice);

      console.log(`Uploading ${size} bytes costs ${formattedPrice}`);

      // 检查余额是否足够
      const balanceInLamports = await connection.getBalance(wallet.publicKey);
      const balanceInSol = balanceInLamports / 1e9;
      setWalletBalance(`${balanceInSol.toFixed(4)} SOL`);

      console.log(`Wallet balance: ${balanceInSol} SOL`);

      if (new BigNumber(balanceInLamports).isLessThan(price)) {
        setErrorMessage("Not enough balance for transaction. Please add SOL to your wallet.");
        return;
      }

      // 提供资金（Lazy-Funding）
      await irysUploader.fund(price);

      // 添加默认标签，包括文件名
      const tags = [
        { name: "Content-Type", value: selectedFile.type },
        { name: "application", value: "permapaper" }, // 默认添加 "permapaper" 标签
        { name: "filename", value: selectedFile.name }, // 添加文件名标签
      ];

      // 上传文件
      const response = await irysUploader.uploadFile(selectedFile, { tags });

      // 生成链接
      const irysLink = `https://gateway.irys.xyz/${response.id}`;
      setLink(irysLink);

      console.log(`File uploaded ==> ${irysLink}`);
    } catch (error) {
      setErrorMessage("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false); // 恢复上传状态
    }
  };

  return (
    <div>
      <button
        onClick={handleUpload}
        disabled={isUploading || !wallet.connected || !wallet.publicKey || !selectedFile}
        className={`px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-lg hover:scale-105 ${
          isUploading || !wallet.connected || !wallet.publicKey || !selectedFile
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isUploading ? "Uploading... Waiting for 2 confirmations" : "Upload PDF"}
      </button>

      {walletBalance && (
        <div className="mt-4">
          <p className="text-lg font-bold">Wallet Balance:</p>
          <p className="text-green-500">{walletBalance}</p>
        </div>
      )}

      {uploadCost && (
        <div className="mt-4">
          <p className="text-lg font-bold">Estimated Upload Cost:</p>
          <p
            className={
              uploadCost === "Insufficient balance. Please add SOL to your wallet."
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {uploadCost}
          </p>
        </div>
      )}

      {link && (
        <div className="mt-4">
          <p className="text-lg font-bold">Uploaded Link:</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {link}
          </a>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};
