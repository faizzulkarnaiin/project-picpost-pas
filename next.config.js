/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  // },
  image: {
    domains: ["play-lh.googleusercontent.com", "media.istockphoto.com", 'localhost', 'encrypted-tbn0.gstatic.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'play-lh.googleusercontent.com',
    //     port: '',
    //     pathname: '',
    //   },
    // ],
},
  // images: ["localhost", "play-lh.googleusercontent.com"],
};

module.exports = nextConfig;
