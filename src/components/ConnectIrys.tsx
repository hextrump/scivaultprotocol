import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useCallback, useEffect } from 'react';
import { WebUploader } from "@irys/web-upload";
import { WebSolana } from "@irys/web-upload-solana";
import { notify } from "../utils/notifications";

export const useIrys = () => {
    const { connection } = useConnection();
    const { publicKey, wallet } = useWallet();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);

    const connectToIrys = useCallback(async () => {
        if (!wallet || !publicKey || isConnecting) {
            return;
        }

        try {
            setIsConnecting(true);
            const irysUploader = await WebUploader(WebSolana).withProvider(wallet.adapter);
            console.log(`Connected to Irys from ${irysUploader.address}`);
            notify({ type: 'success', message: 'Connected to Irys successfully!' });
            setIsConnected(true);
        } catch (error) {
            console.error("Error connecting to Irys:", error);
            notify({ type: 'error', message: 'Error connecting to Irys', description: error.message });
        } finally {
            setIsConnecting(false);
        }
    }, [wallet, publicKey, isConnecting]);

    useEffect(() => {
        if (!publicKey) {
            setIsConnected(false);
            return;
        }

        if (wallet && publicKey && !isConnected && !isConnecting) {
            connectToIrys();
        }
    }, [wallet, publicKey, isConnected, isConnecting, connectToIrys]);

    return { isConnected, isConnecting };
};
