import React, { FC } from "react";
import { SearchBar } from "../../components/SearchBar";
import { FileGrid } from "../../components/FileGrid";

interface ReadViewProps {
  files: Array<{
    id: string;
    tags: Array<{ name: string; value: string }>;
    timestamp: number;
  }>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}

export const ReadView: FC<ReadViewProps> = ({
  files,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="mx-auto p-6 max-w-5xl text-center bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
        Browse Uploaded PDFs
      </h1>
      {/* 搜索框 */}
      <SearchBar
        placeholder="Search by Title or DOI"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      {/* 文件展示 */}
      <FileGrid files={files} />
    </div>
  );
};
