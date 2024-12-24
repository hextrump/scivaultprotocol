import { FC } from "react";

interface UploadStatusProps {
  link: string | null;
  walletBalance: string | null;
  uploadCost: string | null;
  errorMessage: string | null;
}

interface StatusItemProps {
  label: string;
  value: string;
  type?: 'success' | 'error' | 'link' | 'default';
}

const StatusItem: FC<StatusItemProps> = ({ label, value, type = 'default' }) => {
  const getTextColorClass = () => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      case 'link': return 'text-blue-400 underline';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="mt-4">
      <p className="text-lg font-bold text-white">{label}</p>
      {type === 'link' ? (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={getTextColorClass()}
        >
          {value}
        </a>
      ) : (
        <p className={getTextColorClass()}>{value}</p>
      )}
    </div>
  );
};

export const UploadStatus: FC<UploadStatusProps> = ({
  link,
  walletBalance,
  uploadCost,
  errorMessage,
}) => (
  <div className="bg-gray-800 rounded-lg p-4 mt-4">
    {walletBalance && (
      <StatusItem 
        label="Wallet Balance" 
        value={walletBalance} 
        type="success" 
      />
    )}

    {uploadCost && (
      <StatusItem 
        label="Estimated Upload Cost" 
        value={uploadCost} 
        type={uploadCost.includes("Insufficient") ? "error" : "success"} 
      />
    )}

    {link && (
      <StatusItem 
        label="Uploaded Link" 
        value={link} 
        type="link" 
      />
    )}

    {errorMessage && (
      <StatusItem 
        label="Error" 
        value={errorMessage} 
        type="error" 
      />
    )}
  </div>
);
