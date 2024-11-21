import { FC } from 'react';

export const Footer: FC = () => {
    return (
        <div className="flex">
            <footer className="text-center py-6 bg-black text-indigo-500 w-screen">
                <p className="text-lg font-semibold italic mx-auto">
                SciVault Protocol: Open Knowledge for All
                </p>
                <p className="text-sm text-slate-400 mb-2">
                    Powered by Arweave, Irys, and Solana dapp-scaffold.
                </p>
            </footer>
        </div>
    );
};
