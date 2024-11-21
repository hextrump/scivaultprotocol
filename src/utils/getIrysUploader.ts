import { WebUploader } from "@irys/web-upload";
import { WebSolana } from "@irys/web-upload-solana";

export const getIrysUploader = async (wallet: any) => {
    try {
        // 固定使用 QuikNode 的 RPC 地址
        const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "";

        // 创建 Irys Uploader 实例并绑定钱包和 RPC
        const irysUploader = await WebUploader(WebSolana)
            .withProvider(wallet)
            .withRpc(rpcEndpoint);

        console.log(`Connected to Irys using RPC endpoint: ${rpcEndpoint}`);
        return irysUploader;
    } catch (error) {
        console.error("Error connecting to Irys:", error);
        throw new Error("Error connecting to Irys");
    }
};
