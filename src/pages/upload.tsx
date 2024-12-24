import React from "react";
import Head from 'next/head';
import { useWallet } from "@solana/wallet-adapter-react";
import { useIrys } from "../components/ConnectIrys";
import { FileUploadContainer } from "../containers/FileUploadContainer";

export default function UploadPage() {
  const { publicKey } = useWallet();
  const { isConnected } = useIrys();

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
          <FileUploadContainer />
        )}
      </div>
    </>
  );
}
