import { gql, request } from 'graphql-request';

// 定义 GraphQL 查询
const QUERY_scivaultv1_FILES = gql`
  query {
    transactions(
      tags: [
        { name: "application", values: ["scivaultv1"] },
        { name: "Content-Type", values: ["application/pdf"] }
      ]
    ) {
      edges {
        node {
          id
          tags {
            name
            value
          }
          timestamp
        }
      }
    }
  }
`;

// 定义数据类型
interface Tag {
  name: string;
  value: string;
}

interface TransactionNode {
  id: string;
  tags: Tag[];
  timestamp: number;
  filename?: string; // 添加文件名字段
}

interface TransactionEdge {
  node: TransactionNode;
}

interface TransactionsResponse {
  transactions: {
    edges: TransactionEdge[];
  };
}

// 查询函数
export const fetchFiles = async (): Promise<TransactionNode[]> => {
  const endpoint = 'https://uploader.irys.xyz/graphql'; // 替换为实际的 Irys GraphQL 端点
  try {
    // 使用泛型指定返回类型
    const response = await request<TransactionsResponse>(endpoint, QUERY_scivaultv1_FILES);

    // 提取并返回交易节点，同时解析 filename 标签
    return response.transactions.edges.map(edge => {
      const node = edge.node;
      const filenameTag = node.tags.find(tag => tag.name === "filename"); // 查找 filename 标签
      return {
        ...node,
        filename: filenameTag?.value || "Unnamed File", // 如果不存在 filename 标签，设置默认值
      };
    });
  } catch (error) {
    console.error('Error fetching scivaultv1 files:', JSON.stringify(error, null, 2));
    return [];
  }
};
