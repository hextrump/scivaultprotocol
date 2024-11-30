// AppBar.tsx
import { FC } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import NavElement from './nav-element';
import SolanaLogo from './SolanaLogo';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const AppBar: FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <div className="navbar flex h-20 flex-row md:mb-2 shadow-lg bg-black text-neutral-content border-b border-zinc-600 bg-opacity-66">
        
      <div className="navbar-start align-items-center">
        <div className="w-22 h-22 md:p-2 ml-10">
          <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-500 transition duration-200">
          SciVault Protocol
          </Link>
        </div>
      </div>



        {/* Right side: Navigation Links, Upload, and Settings */}
        <div className="navbar-end">
          <div className="hidden md:inline-flex align-items-center justify-items gap-6">
            <NavElement label="Home" href="/" navigationStarts={() => setIsNavOpen(false)} />
            <NavElement label="Read" href="/read" navigationStarts={() => setIsNavOpen(false)} />
            <NavElement label="Upload" href="/upload" navigationStarts={() => setIsNavOpen(false)} /> {/* 新增 Upload 按钮 */}
            <WalletMultiButtonDynamic className="btn-ghost btn-sm rounded-btn text-lg mr-6" />
          </div>

{/* Dropdown Menu for Mobile */}
{isNavOpen && (
  <div className="absolute top-20 right-0 bg-base-100 p-4 shadow rounded-box w-48">
    <ul className="menu">
      <li>
        <NavElement label="Home" href="/" navigationStarts={() => setIsNavOpen(false)} />
      </li>
      <li>
        <NavElement label="Read" href="/read" navigationStarts={() => setIsNavOpen(false)} />
      </li>
      <li>
        <NavElement label="Upload" href="/upload" navigationStarts={() => setIsNavOpen(false)} />
      </li>
      <li>
        <label className="cursor-pointer flex justify-between items-center">
          <span>Autoconnect</span>
          <input
            type="checkbox"
            checked={autoConnect}
            onChange={(e) => setAutoConnect(e.target.checked)}
            className="toggle"
          />
        </label>
      </li>
      <li>
        <NetworkSwitcher />
      </li>
    </ul>
  </div>
)}


          {/* Dropdown Menu */ }
          <div className={`dropdown-content ${isNavOpen ? 'block' : 'hidden'} md:hidden`}>
            <ul className="p-2 shadow bg-base-100 rounded-box">
              <li><NavElement label="Home" href="/" navigationStarts={() => setIsNavOpen(false)} /></li>
              <li><NavElement label="Read" href="/read" navigationStarts={() => setIsNavOpen(false)} /></li>
              <li><NavElement label="Upload" href="/upload" navigationStarts={() => setIsNavOpen(false)} /></li>
            </ul>
          </div>


        </div>
      </div>
    </div>
  );
};
