import { FC, useEffect, useState } from 'react';
import { fetchpermapaperFiles } from '../../utils/fetchpermapaperFiles';

export const ReadView: FC = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await fetchpermapaperFiles();
        setFiles(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load files. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          Uploaded PDFs
        </h1>
        <h4 className="md:w-full text-2xl text-center text-slate-300 my-2">
          Browse and access previously uploaded PDF files.
        </h4>

        {isLoading && (
          <div className="text-center text-slate-400 mt-4">Loading files...</div>
        )}

        {error && (
          <div className="text-center text-red-500 mt-4">{error}</div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {files.map((file) => (
              <div key={file.id} className="card bg-gray-100 shadow-md rounded-lg p-4">
                <h2 className="text-lg font-bold text-gray-800">File ID: {file.id}</h2>
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
          </div>
        )}
      </div>
    </div>
  );
};
