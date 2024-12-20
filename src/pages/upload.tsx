import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { useWallet } from "@solana/wallet-adapter-react";
import { FileSelector } from "../components/FileSelector";
import { UploadButton } from "../components/UploadButton";
import { useIrys } from "../components/ConnectIrys";
import { extractJsonMetadata } from "utils/extractJsonMetadata";
import { extractPDFMetadata } from "utils/extractPDFMetadata";

interface SelectedFiles {
  pdf: File | null;
  json?: File;
}

export default function UploadPage() {
  const { publicKey } = useWallet();
  const { isConnected } = useIrys();
  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({ pdf: null });
  const [previewTags, setPreviewTags] = useState<{ name: string; value: string }[]>([]);

  useEffect(() => {
    const extractMetadata = async () => {
      let metadataTags: Array<{ name: string; value: string }> = [];
      
      try {
        if (selectedFiles.json) {
          console.log("Extracting metadata from JSON...");
          const jsonTags = await extractJsonMetadata(selectedFiles.json);
          metadataTags = [...jsonTags];
        }

        if (selectedFiles.pdf) {
          console.log("Extracting metadata from PDF...");
          const pdfTags = await extractPDFMetadata(selectedFiles.pdf);
          
          const existingTagNames = new Set(metadataTags.map(tag => tag.name));
          pdfTags.forEach(tag => {
            if (!existingTagNames.has(tag.name)) {
              metadataTags.push(tag);
            }
          });
        }

        const allTags = [
          { name: "Content-Type", value: "application/pdf" },
          { name: "application", value: "scivaultv1" },
          ...(selectedFiles.pdf ? [{ 
            name: "filename", 
            value: selectedFiles.pdf.name.replace(/[:<>"/\\|?*]/g, "-") 
          }] : []),
          ...metadataTags
        ];

        setPreviewTags(allTags);
      } catch (error) {
        console.error("Error extracting metadata:", error);
        setPreviewTags([{ name: "error", value: "Failed to extract metadata" }]);
      }
    };

    extractMetadata();
  }, [selectedFiles]);

  return (
    <>
      <Head>
        <title>SciVault Protocol - Upload</title>
        <meta name="description" content="Upload research papers to permanent storage" />
      </Head>

      <div className="mx-auto p-6 max-w-lg text-center bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
          Upload PDF File
        </h1>

        {!publicKey ? (
          <p className="text-red-500 mt-4">Please connect your wallet first.</p>
        ) : !isConnected ? (
          <p className="text-yellow-500 mt-4">Connecting to Irys...</p>
        ) : (
          <div className="space-y-6">
            <FileSelector
              onSelectFiles={setSelectedFiles}
              accept={{
                'application/pdf': ['.pdf'],
                'application/json': ['.json']
              }}
            />

            {(selectedFiles.pdf || selectedFiles.json) && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <h3 className="font-bold text-white mb-2">Selected Files:</h3>
                {selectedFiles.pdf && (
                  <p className="text-gray-300">PDF: {selectedFiles.pdf.name}</p>
                )}
                {selectedFiles.json && (
                  <p className="text-gray-300">JSON: {selectedFiles.json.name}</p>
                )}
              </div>
            )}

            {previewTags.length > 0 && (
              <div className="mt-4 text-left">
                <h3 className="font-bold text-white mb-2">Metadata Preview:</h3>
                <div className="bg-gray-800 p-4 rounded-md">
                  {previewTags.map((tag, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      <span className="font-semibold">{tag.name}:</span> {tag.value}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <UploadButton 
              selectedFile={selectedFiles.pdf}
              tags={previewTags}
            />
          </div>
        )}
      </div>
    </>
  );
}
