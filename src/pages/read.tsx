import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { fetchFiles as fetchFilesFromApi } from "../utils/fetchFiles";
import { ReadView } from "../views/read";

type File = {
  id: string;
  tags: { name: string; value: string }[];
  timestamp: number;
};

const Read: NextPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch files on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await fetchFilesFromApi();
        setFiles(data);
        setFilteredFiles(data); // Show all files by default
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to load files. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Filter files based on search query
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredFiles(files); // Reset to all files if search query is empty
    } else {
      const filtered = files.filter((file) =>
        file.tags.some((tag) =>
          (tag.name === "title" && tag.value.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (tag.name === "doi" && tag.value.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
      setFilteredFiles(filtered);
    }
  };

  return (
    <div>
      <Head>
        <title>Read PDFs</title>
        <meta name="description" content="Browse and search uploaded PDFs" />
      </Head>
      {isLoading && (
        <div className="text-center text-slate-400 mt-4">Loading files...</div>
      )}
      {error && (
        <div className="text-center text-red-500 mt-4">{error}</div>
      )}
      {!isLoading && !error && (
        <ReadView
          files={filteredFiles}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default Read;
