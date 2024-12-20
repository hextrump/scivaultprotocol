import { PDFDocument } from "pdf-lib";

export const extractPDFMetadata = async (file: File): Promise<
  Array<{ name: string; value: string }>
> => {
  try {
    console.log("Starting PDF metadata extraction");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const tags: Array<{ name: string; value: string }> = [];

    // 提取基本元数据
    const title = pdfDoc.getTitle();
    if (title) tags.push({ name: "title", value: title });

    const author = pdfDoc.getAuthor();
    if (author) tags.push({ name: "authors", value: author });

    const subject = pdfDoc.getSubject();
    if (subject) tags.push({ name: "subject", value: subject });

    const keywords = pdfDoc.getKeywords();
    if (keywords) tags.push({ name: "keywords", value: keywords });

    // 尝试从 Creator 字段提取 DOI
    const creator = pdfDoc.getCreator();
    if (creator && creator.match(/10\.\d{4,}/)) {
      tags.push({ name: "doi", value: creator });
    }

    // 日期信息
    const creationDate = pdfDoc.getCreationDate();
    if (creationDate) {
      tags.push({ name: "creationDate", value: creationDate.toISOString() });
    }

    const modificationDate = pdfDoc.getModificationDate();
    if (modificationDate) {
      tags.push({ name: "modificationDate", value: modificationDate.toISOString() });
    }

    console.log("Extracted PDF tags:", tags);
    return tags;
  } catch (error) {
    console.error("Error extracting PDF metadata:", error);
    return [
      { name: "error", value: "Failed to extract PDF metadata" }
    ];
  }
};
