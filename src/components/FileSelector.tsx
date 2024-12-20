import React, { useCallback, FC } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

interface FileSelectorProps {
  onSelectFiles: (files: { pdf: File | null; json?: File } | ((prev: { pdf: File | null; json?: File }) => { pdf: File | null; json?: File })) => void;
  accept: Accept;
}

export const FileSelector: FC<FileSelectorProps> = ({ onSelectFiles, accept }) => {
  // PDF文件选择器
  const { getRootProps: getPdfRootProps, getInputProps: getPdfInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type === 'application/pdf') {
        onSelectFiles(prev => ({ ...prev, pdf: file }));
      }
    }, [onSelectFiles]),
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  // JSON文件选择器
  const { getRootProps: getJsonRootProps, getInputProps: getJsonInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type === 'application/json') {
        onSelectFiles(prev => ({ ...prev, json: file }));
      }
    }, [onSelectFiles]),
    accept: { 'application/json': ['.json'] },
    multiple: false
  });

  return (
    <div className="flex flex-col gap-4">
      {/* PDF选择按钮 */}
      <div
        {...getPdfRootProps()}
        className="p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-400 transition-colors bg-gray-800 text-center"
      >
        <input {...getPdfInputProps()} />
        <p className="text-white">
          Select PDF File (Required)
        </p>
      </div>

      {/* JSON选择按钮 */}
      <div
        {...getJsonRootProps()}
        className="p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-purple-400 transition-colors bg-gray-800 text-center"
      >
        <input {...getJsonInputProps()} />
        <p className="text-white">
          Select JSON Metadata (Optional)
        </p>
      </div>
    </div>
  );
};
