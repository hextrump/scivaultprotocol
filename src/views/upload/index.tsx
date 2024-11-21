import React, { FC, useState } from "react";
import { FileSelector } from "../../components/FileSelector";
import { UploadButton } from "../../components/UploadButton";

export const UploadView: FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    return (
        <div className="mx-auto p-6 max-w-lg text-center bg-gray-900 rounded-lg shadow-lg">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
                Upload PDF File
            </h1>
            <FileSelector
                onSelectFile={(files) => setSelectedFile(files[0])}
                accept="application/pdf"
            />
            {selectedFile ? (
                <div className="mt-6">
                    <p className="text-lg font-bold text-white">Selected File:</p>
                    <p className="text-gray-300">{selectedFile.name}</p>
                </div>
            ) : (
                <p className="text-red-500 mt-4">Please select a PDF file to upload.</p>
            )}
            <UploadButton selectedFile={selectedFile} />
        </div>
    );
};
