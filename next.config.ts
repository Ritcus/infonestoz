import type { NextConfig } from "next";

const nextConfig: NextConfig =  {
  /* config options here */
  
  allowedDevOrigins:["http://localhost:3000", // Your dev origin
      "10.5.0.2",             // Your specific IP
      "localhost" ],
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },

  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable'
          },
          {
            key: 'Content-Type',
            value: 'application/json'
          }
        ]
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ];
  }
  
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})


export default withPWA(nextConfig);
