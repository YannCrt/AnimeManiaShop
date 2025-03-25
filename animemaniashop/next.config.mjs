/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcMinify: true, // Active SWC
    forceSwcTransforms: true, // Force l'utilisation de SWC même avec Babel
  },
};

export default nextConfig;
