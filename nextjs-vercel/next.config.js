/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com'], // Si estás usando Cloudinary
    },
  };
  
  module.exports = nextConfig;
  