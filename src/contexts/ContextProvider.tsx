import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { 
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { FC, ReactNode, useCallback, useMemo } from "react";
import { AutoConnectProvider } from "./AutoConnectProvider";
import { notify } from "../utils/notifications";
import { NetworkConfigurationProvider } from "./NetworkConfigurationProvider";
import dynamic from "next/dynamic";

const ReactUIWalletModalProviderDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
    { ssr: false }
);

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const endpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || "";

    // 配置支持的钱包列表
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ], []);

    const onError = useCallback(
        (error: WalletError) => {
            notify({
                type: "error",
                message: error.message ? `${error.name}: ${error.message}` : error.name,
            });
            console.error(error);
        },
        []
    );

    return (
        <NetworkConfigurationProvider>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} onError={onError} autoConnect>
                    <ReactUIWalletModalProviderDynamic>{children}</ReactUIWalletModalProviderDynamic>
                </WalletProvider>
            </ConnectionProvider>
        </NetworkConfigurationProvider>
    );
};
