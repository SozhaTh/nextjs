module.exports = {
    reactStrictMode: true, 
    images: {
      domains: ['res.cloudinary.com'],
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/products",
          permanent: true,
        },
      ];
    },
  };
  