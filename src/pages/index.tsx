import { FC, useEffect } from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import pkg from '../../package.json'
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore'
// import { Footer } from '../components/Footer'

export default function HomePage() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <>
      <Head>
        <title>SciVault Protocol</title>
        <meta name="description" content="Permanent publication of research papers" />
      </Head>

      <div className="mx-auto p-2 min-h-screen flex flex-col justify-center -mb-24">
        <div className="w-full max-w-4xl mx-auto -mt-24">
          <div className="mb-2">
            <div className='text-sm font-normal text-right text-slate-600 mb-1'>
              v{pkg.version}
            </div>
            <h1 className="text-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500">
              SciVault Protocol
            </h1>
          </div>
          <h4 className="text-2xl md:text-4xl text-center text-slate-300 mb-1">
            <p className="mb-1">Decentralized and permanent storage for open science.</p>
            <p className="text-slate-500 text-2xl leading-relaxed">
              Publish your paper permanently, right from your computer.
            </p>
          </h4>
        </div>
      </div>

      <SpeedInsights />
    </>
  )
}
