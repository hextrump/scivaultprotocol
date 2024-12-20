interface SciHubDownload {
  timestamp?: number | string;
  university?: string;
  from?: string;
}

interface JsonMetadata {
  doi?: string;
  size?: number;
  md5?: string;
  sha256?: string;
  "sci-hub"?: {
    download?: SciHubDownload;
    image?: number;
  };
  libgen?: {
    ID?: number;
    TimeAdded?: string;
  };
  openalex?: any;  // OpenAlex 数据结构比较复杂，这里先用 any
  crossref?: any;  // Crossref 数据结构比较复杂，这里先用 any
}

export const extractJsonMetadata = async (file: File): Promise<Array<{ name: string; value: string }>> => {
  try {
    const text = await file.text();
    const data: JsonMetadata = JSON.parse(text);
    console.log("Parsing JSON metadata:", data);
    
    const tags: Array<{ name: string; value: string }> = [];
    
    // 基础文件信息
    if (data.doi) {
      tags.push({ name: "doi", value: data.doi });
    }
    if (data.size) {
      tags.push({ name: "size", value: data.size.toString() });
    }
    if (data.md5) {
      tags.push({ name: "md5", value: data.md5 });
    }
    if (data.sha256) {
      tags.push({ name: "sha256", value: data.sha256 });
    }

    // Sci-Hub 信息
    if (data["sci-hub"]) {
      const sciHub = data["sci-hub"];
      if (sciHub.download) {
        if (sciHub.download.timestamp) {
          tags.push({ 
            name: "sci-hub-timestamp", 
            value: sciHub.download.timestamp.toString() 
          });
        }
        if (sciHub.download.university) {
          tags.push({ 
            name: "sci-hub-university", 
            value: sciHub.download.university 
          });
        }
        if (sciHub.download.from) {
          tags.push({ 
            name: "sci-hub-from", 
            value: sciHub.download.from 
          });
        }
      }
      if (sciHub.image !== undefined) {
        tags.push({ 
          name: "sci-hub-image", 
          value: sciHub.image.toString() 
        });
      }
    }

    // Libgen 信息
    if (data.libgen) {
      if (data.libgen.ID) {
        tags.push({ 
          name: "libgen-id", 
          value: data.libgen.ID.toString() 
        });
      }
      if (data.libgen.TimeAdded) {
        tags.push({ 
          name: "libgen-time-added", 
          value: data.libgen.TimeAdded 
        });
      }
    }

    // OpenAlex 基本信息
    if (data.openalex) {
      const openalex = data.openalex;
      if (openalex.title) {
        tags.push({ name: "title", value: openalex.title });
      }
      if (openalex.publication_date) {
        tags.push({ name: "publication-date", value: openalex.publication_date });
      }
      // 作者信息
      if (openalex.authorships && Array.isArray(openalex.authorships)) {
        const authors = openalex.authorships
          .map((a: any) => a.author?.display_name)
          .filter(Boolean)
          .join("; ");
        if (authors) {
          tags.push({ name: "authors", value: authors });
        }
      }
    }

    // 添加数据来源标签
    tags.push({ name: "metadata-source", value: "scivault-json" });
    
    console.log("Generated tags from JSON:", tags);
    return tags;
  } catch (error) {
    console.error("Error parsing JSON metadata:", error);
    return [];
  }
}; 