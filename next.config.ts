import type { NextConfig } from "next";

const nextConfig: NextConfig =  {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

export default withPWA(nextConfig);
