
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


SciVault V0 - 更新说明
日期：2024年12月1日
今日更新内容
优化导航菜单：

更新 AppBar 和 ContentContainer 中的导航项为 Home, Read, Upload。
修复移动端显示问题，确保导航项在移动端正常显示。
优化侧边栏 (Drawer)：

增加状态管理（isDrawerOpen），替代 checkbox 控制。
增加覆盖层（overlay），改善用户体验。
优化样式，确保侧边栏在窄屏时完全覆盖页面。
文件名显示功能：

在上传 PDF 文件时，文件名被添加为 filename 标签。
更新文件列表显示，支持文件名的读取与显示。
适配 fetchpermapaperFiles 函数，确保文件名正确解析并显示。
更新文件
src/components/AppBar.tsx：更新导航项。
src/components/ContentContainer.tsx：优化侧边栏。
src/utils/fetchpermapaperFiles.ts：添加文件名解析功能。
src/components/PDFList.tsx：显示文件名。