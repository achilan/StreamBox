import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    REACT_APP_API_IP: process.env.REACT_APP_API_IP,
  }
};

export default nextConfig;
