/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'; // 检测运行环境

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // 添加路径末尾斜杠
  assetPrefix: isProd ? './' : undefined, // 仅生产模式使用相对路径
  basePath: isProd ? '' : undefined, // 仅生产模式调整路径根目录
};

module.exports = nextConfig;
