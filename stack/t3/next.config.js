/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://localapi.helix.ai:8081/api/:path*'
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
        ],
      },
    ]
  }
};

// Handle self-signed certificates by setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default config;
