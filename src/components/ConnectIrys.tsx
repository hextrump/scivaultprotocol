import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useCallback } from 'react';
import { WebUploader } from "@irys/web-upload";
import { WebSolana } from "@irys/web-upload-solana";
import { notify } from "../utils/notifications";

export const ConnectIrys = () => {
    const { connection } = useConnection();
    const { publicKey, wallet } = useWallet();
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const connectToIrys = useCallback(async () => {
        if (!wallet) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('Error: Wallet not connected');
            return;
        }

        try {
            const irysUploader = await WebUploader(WebSolana).withProvider(wallet.adapter);
            console.log(`Connected to Irys from ${irysUploader.address}`);
            notify({ type: 'success', message: 'Connected to Irys successfully!' });
            setIsConnected(true);
        } catch (error) {
            console.error("Error connecting to Irys:", error);
            notify({ type: 'error', message: 'Error connecting to Irys', description: error.message });
        }
    }, [wallet]);

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button
                    className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-purple-500 to-blue-500 hover:from-white hover:to-purple-300 text-black"
                    onClick={connectToIrys}
                    disabled={!wallet || isConnected}
                >
                    <div className="hidden group-disabled:block">
                        {isConnected ? "Already connected" : "Wallet not connected"}
                    </div>
                    <span className="block group-disabled:hidden">
                        {isConnected ? "Connected to Irys" : "Connect Irys"}
                    </span>
                </button>
            </div>
        </div>
    );
};
