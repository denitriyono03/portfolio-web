/** @type {import('next').NextConfig} */
const isGithub = process.env.DEPLOY_TARGET === 'github';
const nextConfig = {
  output: 'export',
  basePath: isGithub ? '/portfolio-web' : '',
  images: { unoptimized: true },
  trailingSlash: true,
};
module.exports = nextConfig;
