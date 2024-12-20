import React, { FC } from "react";

interface File {
  id: string;
  tags: Array<{ name: string; value: string }>;
  timestamp: number;
}

interface FileGridProps {
  files: File[];
}

export const FileGrid: FC<FileGridProps> = ({ files }) => {
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
          </div>
        )
      })}
      {files.length === 0 && (
        <p className="text-gray-400 mt-6 col-span-full text-center">No files found.</p>
      )}
    </div>
  );
};
