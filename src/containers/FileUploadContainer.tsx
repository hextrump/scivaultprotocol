import React, { useState } from "react";
import { FileSelector } from "../components/FileSelector";
import { UploadButton } from "../components/UploadButton";
import { useMetadataExtractor } from "../hooks/useMetadataExtractor";
import { useFileUploader } from "../hooks/useFileUploader";

interface SelectedFiles {
  pdf: File | null;
  json?: File;
}

interface SelectedFilesPreviewProps {
  files: SelectedFiles;
}

const SelectedFilesPreview: React.FC<SelectedFilesPreviewProps> = ({ files }) => {
  if (!files.pdf && !files.json) return null;
  
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="font-bold text-white mb-2">Selected Files:</h3>
      {files.pdf && (
        <p className="text-gray-300">PDF: {files.pdf.name}</p>
      )}
      {files.json && (
        <p className="text-gray-300">JSON: {files.json.name}</p>
      )}
    </div>
  );
};

interface MetadataPreviewProps {
  tags: Array<{ name: string; value: string }>;
}

const MetadataPreview: React.FC<MetadataPreviewProps> = ({ tags }) => {
  if (tags.length === 0) return null;

  return (
    <div className="mt-4 text-left">
      <h3 className="font-bold text-white mb-2">Metadata Preview:</h3>
      <div className="bg-gray-800 p-4 rounded-md">
        {tags.map((tag, index) => (
          <div key={index} className="text-sm text-gray-300">
            <span className="font-semibold">{tag.name}:</span> {tag.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export const FileUploadContainer: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({ pdf: null });
  const { previewTags } = useMetadataExtractor(selectedFiles);
  const { 
    handleUpload, 
    isUploading, 
    estimatedPrice,      // 使用 estimatedPrice 替代 uploadCost
    uploadUrl,           // 使用 uploadUrl 替代 link
    walletBalance,
    errorMessage
  } = useFileUploader(selectedFiles.pdf, previewTags);

  return (
    <div className="space-y-6">
      <FileSelector
        onSelectFiles={setSelectedFiles}
        accept={{
          'application/pdf': ['.pdf'],
          'application/json': ['.json']
        }}
      />
      <SelectedFilesPreview files={selectedFiles} />
      <MetadataPreview tags={previewTags} />
      
      {/* 显示钱包余额和预估上传费用 */}
      {(walletBalance || estimatedPrice) && (
        <div className="p-4 bg-gray-800 rounded-lg space-y-2">
          {walletBalance && (
            <p className="text-gray-300">
              Wallet Balance: <span className="text-indigo-400 font-semibold">{walletBalance}</span>
            </p>
          )}
          {estimatedPrice && (
            <p className="text-gray-300">
              Estimated upload cost: <span className="text-indigo-400 font-semibold">{estimatedPrice}</span>
            </p>
          )}
        </div>
      )}

      {/* 显示错误信息 */}
      {errorMessage && (
        <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
          <p className="text-red-200">{errorMessage}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFiles.pdf || isUploading}
        className={`
          w-full py-3 px-6 rounded-xl
          font-bold text-lg
          transition-all duration-200
          shadow-lg
          ${!selectedFiles.pdf || isUploading
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]'
          }
        `}
      >
        {isUploading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Uploading...</span>
          </div>
        ) : (
          'Upload PDF'
        )}
      </button>

      {/* 上传成功后的链接显示 */}
      {uploadUrl && (
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-gray-300 mb-2">Upload successful! Your file is available at:</p>
          <a 
            href={uploadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 break-all font-mono text-sm"
          >
            {uploadUrl}
          </a>
        </div>
      )}
    </div>
  );
}; 