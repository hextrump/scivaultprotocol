import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { fetchpermapaperFiles } from "../utils/fetchpermapaperFiles";
import { ReadView } from "../views/read";

const Read: NextPage = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await fetchpermapaperFiles();
        setFiles(data);
        setFilteredFiles(data); // 默认显示所有文件
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load files. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter((file) =>
        file.tags.some((tag) =>
          (tag.name === "title" && tag.value.includes(searchQuery)) ||
          (tag.name === "doi" && tag.value.includes(searchQuery))
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
