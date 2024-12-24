import React, { FC, useState } from "react";

interface File {
  id: string;
  tags: Array<{ name: string; value: string }>;
  timestamp: number;
}

interface FileGridProps {
  files: File[];
}

interface MetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  tags: Array<{ name: string; value: string }>;
  filename: string;
}

const MetadataModal: FC<MetadataModalProps> = ({ isOpen, onClose, tags, filename }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{filename} - Metadata</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {tags.map((tag, index) => (
            <div key={index} className="text-sm">
              <span className="text-indigo-400 font-semibold">{tag.name}:</span>
              <span className="text-gray-300 ml-2">{tag.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FileGrid: FC<FileGridProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTagValue = (file: File, tagName: string) => 
    file.tags.find((tag) => tag.name === tagName)?.value;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {files.map((file) => {
        const filename = getTagValue(file, "filename") || "Unnamed File";
        const title = getTagValue(file, "title");
        const doi = getTagValue(file, "doi");
        const authors = getTagValue(file, "authors");

        return (
          <div key={file.id} className="card bg-base-100 shadow-xl rounded-lg p-6 text-left hover:shadow-2xl transition-shadow">
            {/* 文件名变成可点击链接 */}
            <a
              href={`https://gateway.irys.xyz/${file.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2 hover:opacity-80 cursor-pointer"
            >
              {filename}
            </a>

            {title && (
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold">Title:</span> {title}
              </p>
            )}

            {authors && (
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold">Authors:</span> {authors}
              </p>
            )}

            {doi && (
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold">DOI:</span> {doi}
              </p>
            )}

            {/* 上传时间 */}
            <p className="text-xs text-gray-400">
              Uploaded: {new Date(file.timestamp).toLocaleString()}
            </p>

            {/* Add metadata link */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => {
                  setSelectedFile(file);
                  setIsModalOpen(true);
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                View full metadata →
              </button>
            </div>
          </div>
        )
      })}
      
      {/* Add metadata modal */}
      {selectedFile && (
        <MetadataModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFile(null);
          }}
          tags={selectedFile.tags}
          filename={getTagValue(selectedFile, "filename") || "Unnamed File"}
        />
      )}
      
      {files.length === 0 && (
        <p className="text-gray-400 mt-6 col-span-full text-center">No files found.</p>
      )}
    </div>
  );
};
