# SciVault Protocol

SciVault Protocol is a decentralized platform designed to enable permanent publication of research papers. With blockchain technology, researchers can ensure their work is stored securely and made accessible globally forever, directly from their own computers.

This protocol empowers open science, breaking down barriers to knowledge sharing while supporting researchers through decentralized funding mechanisms. Built using Solana, Arweave, and Irys, it ensures that science is decentralized, permanent, and accessible to all.

## User Guide

### For Readers
1. **Browsing Papers**
   - Click "Read" in the navigation bar
   - Browse all available papers
   - Use search functionality to find specific papers by:
     - Title
     - DOI number
     - Author name
   - Click any paper title to open the PDF

### For Authors/Uploaders
1. **Prerequisites**
   - Connect your Solana wallet (e.g., Phantom)
   - Ensure sufficient SOL for upload fees

2. **Upload Process**
   - Click "Upload" in the navigation bar
   - Select your PDF file
   - Optionally add metadata (JSON file)
   - Confirm upload and pay storage fee
   - Receive permanent access link

### Key Features
- Permanent paper storage on Arweave
- Automatic metadata extraction
- Blockchain-based verification
- Direct PDF viewing in browser
- Advanced search functionality

## Technical Setup

### Installation

```bash
npm install
# or
yarn install
```

### Environment Configuration
Create a .env.local file in the root directory:
```bash
NEXT_PUBLIC_RPC_ENDPOINT=<YOUR_RPC_ENDPOINT>
```

### Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```
├── public                # Publicly hosted assets
├── pages                 # Next.js routing and page-level views
├── components            # Reusable UI components
├── utils                 # Helper functions and logic
├── styles               # Global and component-specific styles
├── out                  # Output files after static export
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
```

## Features

The SciVault Protocol includes:
- Decentralized Knowledge Archive: Store research papers permanently on Arweave
- Blockchain Accessibility: Built on Solana for secure and high-speed transactions
- Researcher Support: $SciVault tokens to fund and incentivize scientific contributions
- Seamless Uploads: Powered by Irys for efficient file tagging and retrieval
- Open Access Philosophy: Committed to breaking barriers in science publication

## Contributing
At SciVault Protocol, we believe in empowering the community to build and customize the platform to suit their needs. We welcome contributions and encourage everyone to experiment, fork, and implement their own desired features.

## Community
- Twitter: @scivault
- Telegram Group: https://t.me/+iNxIiBQP83Q3NmJl

## Learn More 
- [Arweave Documentation](https://www.arweave.org/) - Learn about permanent decentralized storage
- [Irys Documentation](https://docs.irys.xyz/learn/learn-about-irys/what-is-irys) - File upload and retrieval
- [Solana dApp Scaffold](https://github.com/solana-labs/dapp-scaffold) - Building Solana dApps

## Latest Updates (2024-12-01)
- Optimized navigation menu with Home, Read, Upload options
- Improved mobile responsiveness
- Enhanced sidebar functionality
- Added filename display feature for uploaded PDFs

## License
MIT