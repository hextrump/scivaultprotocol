import { FC } from "react";
import { UploadStatus } from "./UploadStatus";

interface UploadButtonProps {
  onUpload: () => Promise<void>;
  isUploading: boolean;
  disabled: boolean;
  statusProps: {
    link: string | null;
    walletBalance: string | null;
    uploadCost: string | null;
    errorMessage: string | null;
  };
}

export const UploadButton: FC<UploadButtonProps> = ({
  onUpload,
  isUploading,
  disabled,
  statusProps
}) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onUpload}
        disabled={disabled || isUploading}
        className={`
          w-full px-4 py-2 
          bg-gradient-to-r from-indigo-500 to-purple-500 
          rounded-md shadow-lg 
          transition-all duration-200
          ${disabled || isUploading ? 
            'opacity-50 cursor-not-allowed' : 
            'hover:scale-105 hover:shadow-xl'
          }
        `}
      >
        {isUploading ? "Uploading... Waiting for 2 confirmations" : "Upload PDF"}
      </button>

      <UploadStatus {...statusProps} />
    </div>
  );
};
