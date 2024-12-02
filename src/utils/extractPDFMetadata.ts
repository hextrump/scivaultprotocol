import { PDFDocument } from "pdf-lib";

export const extractPDFMetadata = async (file: File): Promise<
  Array<{ name: string; value: string }>
> => {
  try {
    // 加载 PDF 文件
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // 提取 Metadata
    const title = pdfDoc.getTitle() || "Title not found";
    const author = pdfDoc.getAuthor() || "Author not found";
    const subject = pdfDoc.getSubject() || "Subject not found";
    const keywords = pdfDoc.getKeywords() || "Keywords not found";

    // 提取 Creator 字段并直接用作 DOI
    const doi = pdfDoc.getCreator() || "DOI not found";

    const creationDate = pdfDoc.getCreationDate()
      ? pdfDoc.getCreationDate().toISOString()
      : "Creation date not found";
    const modificationDate = pdfDoc.getModificationDate()
      ? pdfDoc.getModificationDate().toISOString()
      : "Modification date not found";

    // 返回提取的 Metadata
    return [
      { name: "title", value: title },
      { name: "author", value: author },
      { name: "subject", value: subject },
      { name: "keywords", value: keywords },
      { name: "doi", value: doi }, // 从 Creator 提取的 DOI
      { name: "creationDate", value: creationDate },
      { name: "modificationDate", value: modificationDate },
      { name: "Content-Type", value: "application/pdf" },
      { name: "application", value: "permapaper" }, // 默认添加 "permapaper" 标签
    ];
  } catch (error) {
    console.error("Error extracting PDF metadata:", error);
    return [
      { name: "Content-Type", value: "application/pdf" },
      { name: "application", value: "permapaper" }, // 默认添加 "permapaper" 标签
      { name: "error", value: "Failed to extract metadata" },
    ];
  }
};
