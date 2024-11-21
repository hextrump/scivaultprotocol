
# SciVault Protocol

SciVault Protocol is a decentralized platform designed to enable permanent publication of research papers. With blockchain technology, researchers can ensure their work is stored securely and made accessible globally forever, directly from their own computers.

This protocol empowers open science, breaking down barriers to knowledge sharing while supporting researchers through decentralized funding mechanisms. Built using Solana, Arweave, and Irys, it ensures that science is decentralized, permanent, and accessible to all.

## Installation

```bash
npm install
# or
yarn install
```
To configure environment variables, follow these steps:

Create a .env.local file in the root directory of the project.
Add the following content to the file:
```bash
NEXT_PUBLIC_RPC_ENDPOINT=<YOUR_RPC_ENDPOINT>
```
Replace <YOUR_RPC_ENDPOINT> with your own RPC node URL. For example, you can use a free Solana RPC endpoint provided by QuickNode or any other RPC provider.

## Build and Run

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Features

The SciVault Protocol includes:

Decentralized Knowledge Archive: Store research papers permanently on Arweave.
Blockchain Accessibility: Built on Solana for secure and high-speed transactions.
Researcher Support: $SciVault tokens to fund and incentivize scientific contributions.
Seamless Uploads: Powered by Irys for efficient file tagging and retrieval.
Open Access Philosophy: Committed to breaking barriers in science publication.


### Structure

The project is organized as follows: 
```
├── public                # Publicly hosted assets
├── pages                 # Next.js routing and page-level views
├── components            # Reusable UI components
├── utils                 # Helper functions and logic
├── styles                # Global and component-specific styles
├── out                   # Output files after static export
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts


```

## Contributing
Contributing
At SciVault Protocol, we believe in empowering the community to build and customize the platform to suit their needs. We welcome contributions and encourage everyone to experiment, fork, and implement their own desired features.

Whether it's adding new functionality, improving existing code, or experimenting with innovative ideas, this project is yours to customize and expand upon.

Twitter: @scivault
Discuss at TG group
https://t.me/+iNxIiBQP83Q3NmJl

## Learn More 

Explore the technologies and tools that power SciVault Protocol:

Arweave Documentation - Learn about permanent decentralized storage for your data.
https://www.arweave.org/

Irys Documentation - Discover how to upload and retrieve files with advanced tagging and GraphQL support.
https://docs.irys.xyz/learn/learn-about-irys/what-is-irys

Solana dApp Scaffold - Get started with building Solana dApps using this comprehensive scaffold.
https://github.com/solana-labs/dapp-scaffold

## License
MIT