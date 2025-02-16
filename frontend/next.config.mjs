/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com", "i.imgur.com"],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default nextConfig;
