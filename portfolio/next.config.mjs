/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k41jfyz0rmi8ju7o.public.blob.vercel-storage.com",
        port: "",
        pathname: "/*"
      }
    ]
  }
};

export default nextConfig;
