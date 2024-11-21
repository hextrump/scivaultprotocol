import type { NextPage } from "next";
import Head from "next/head";
import { UploadView } from "../views";

const Upload: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold - Upload</title>
        <meta
          name="description"
          content="Upload PDF to the Arweave network"
        />
      </Head>
      <UploadView />
    </div>
  );
};

export default Upload;
