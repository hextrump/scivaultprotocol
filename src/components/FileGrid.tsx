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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {files.map((file) => (
        <div key={file.id} className="card bg-gray-100 shadow-md rounded-lg p-4 text-left">
          <h2 className="text-lg font-bold text-gray-800">
            {file.tags.find((tag) => tag.name === "title")?.value || "Unknown Title"}
          </h2>
          <p className="text-sm text-gray-600">
            DOI: {file.tags.find((tag) => tag.name === "doi")?.value || "Unknown DOI"}
          </p>
          <p className="text-sm text-gray-600">
            Uploaded: {new Date(file.timestamp).toLocaleString()}
          </p>
          <a
            href={`https://gateway.irys.xyz/${file.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 underline mt-2 block"
          >
            View PDF
          </a>
        </div>
      ))}
      {files.length === 0 && (
        <p className="text-gray-400 mt-6 col-span-full text-center">No files found.</p>
      )}
    </div>
  );
};
