import { useState, useEffect } from "react";
import Head from 'next/head';
import { SearchBar } from "../components/SearchBar";
import { FileGrid } from "../components/FileGrid";
import { fetchFiles as fetchFilesFromApi } from "../utils/fetchFiles";

type File = {
  id: string;
  tags: { name: string; value: string }[];
  timestamp: number;
};

export default function ReadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const fetchedFiles = await fetchFilesFromApi();
        setFiles(fetchedFiles);
        setFilteredFiles(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  const handleSearch = () => {
    const filtered = files.filter((file) =>
      file.tags.some(
        (tag) =>
          (tag.name === "title" || tag.name === "doi" || tag.name === "authors") &&
          tag.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredFiles(filtered);
  };

  return (
    <>
      <Head>
        <title>SciVault Protocol - Read</title>
        <meta name="description" content="Browse and read research papers" />
      </Head>

      <div className="mx-auto p-6 max-w-5xl text-center bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
          Browse Uploaded PDFs
        </h1>
        <SearchBar
          placeholder="Search by Title, DOI, or Authors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
        {loading ? (
          <div className="mt-6">Loading...</div>
        ) : (
          <FileGrid files={filteredFiles} />
        )}
      </div>
    </>
  );
}
