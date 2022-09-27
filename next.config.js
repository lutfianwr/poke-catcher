/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`play.pokemonshowdown.com`, `raw.githubusercontent.com`],
  },
};

module.exports = nextConfig;
