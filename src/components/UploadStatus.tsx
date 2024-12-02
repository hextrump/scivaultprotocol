import { FC } from "react";

interface UploadStatusProps {
  link: string | null;
  walletBalance: string | null;
  uploadCost: string | null;
  errorMessage: string | null;
}

export const UploadStatus: FC<UploadStatusProps> = ({
  link,
  walletBalance,
  uploadCost,
  errorMessage,
}) => (
  <div>
    {walletBalance && (
      <div className="mt-4">
        <p className="text-lg font-bold">Wallet Balance:</p>
        <p className="text-green-500">{walletBalance}</p>
      </div>
    )}

    {uploadCost && (
      <div className="mt-4">
        <p className="text-lg font-bold">Estimated Upload Cost:</p>
        <p className={uploadCost.includes("Insufficient") ? "text-red-500" : "text-green-500"}>
          {uploadCost}
        </p>
      </div>
    )}

    {link && (
      <div className="mt-4">
        <p className="text-lg font-bold">Uploaded Link:</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
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
