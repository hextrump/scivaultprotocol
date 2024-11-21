import React, { FC } from "react";

interface FileSelectorProps {
    onSelectFile: (files: File[]) => void;
    accept?: string;
}

export const FileSelector: FC<FileSelectorProps> = ({ onSelectFile, accept }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onSelectFile(Array.from(event.target.files));
        }
    };

    return (
        <div className="flex justify-center items-center mt-4">
            <label
                htmlFor="file-input"
                className="cursor-pointer px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-md shadow-lg hover:scale-105"
            >
                Select PDF File
            </label>
            <input
                id="file-input"
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};
