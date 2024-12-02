import { FC } from "react";
import { useFileUploader } from "../hooks/useFileUploader";
import { UploadStatus } from "./UploadStatus";

interface UploadButtonProps {
  selectedFile: File | null;
  onTagsGenerated?: (tags: Array<{ name: string; value: string }>) => void; // 新增回调
}

export const UploadButton: FC<UploadButtonProps> = ({ selectedFile, onTagsGenerated }) => {
  const { handleUpload, link, uploadCost, walletBalance, isUploading, errorMessage, tags } =
    useFileUploader(selectedFile);

  // 将生成的 tags 传递给父组件
  if (tags.length > 0 && onTagsGenerated) {
    onTagsGenerated(tags);
  }

  return (
    <div>
      <button
        onClick={handleUpload}
        disabled={isUploading || !selectedFile}
        className={`px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-lg hover:scale-105 ${
          isUploading || !selectedFile ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading... Waiting for 2 confirmations" : "Upload PDF"}
      </button>

      <UploadStatus
        link={link}
        walletBalance={walletBalance}
        uploadCost={uploadCost}
        errorMessage={errorMessage}
      />
    </div>
  );
};
