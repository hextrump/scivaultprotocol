import { useState, useEffect } from "react";
import { extractJsonMetadata } from "../utils/extractJsonMetadata";
import { extractPDFMetadata } from "../utils/extractPDFMetadata";

interface SelectedFiles {
  pdf: File | null;
  json?: File;
}

export const useMetadataExtractor = (selectedFiles: SelectedFiles) => {
  const [previewTags, setPreviewTags] = useState<Array<{ name: string; value: string }>>([]);

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

  return { previewTags };
}; 