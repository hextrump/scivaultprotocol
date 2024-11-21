import type { NextPage } from "next";
import Head from "next/head";
import { PDFList } from "../components/PDFList";

const Read: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Read PDFs</title>
        <meta name="description" content="Browse previously uploaded PDFs" />
      </Head>
      <PDFList title="Browse PDFs" />
    </div>
  );
};

export default Read;
