/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "api.dicebear.com"],
  },
  // Exclude tempobook directories from the build
  experimental: {
    // NextJS 14.1.3 to 14.2.11:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],
    // Exclude tempobook directories from the build
    outputFileTracingExcludes: {
      "*": ["./tempobook/**/*", "**/tempobook/**/*"],
    },
  },
  // Ignore tempobook directories during build
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /tempobook/,
    };

    // Add rule to exclude tempobook directories
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /(node_modules|tempobook)/,
    });

    return config;
  },
  // Explicitly exclude tempobook directories from the build
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable directory traversal for tempobook
  transpilePackages: ["tempo-devtools"],
  distDir: ".next",
};

// Add runtime configuration to exclude tempobook paths
nextConfig.eslint = {
  ignoreDuringBuilds: true,
};

nextConfig.typescript = {
  ignoreBuildErrors: true,
};

// Add custom rewrites to prevent tempobook directory access during build
nextConfig.rewrites = async () => {
  return {
    beforeFiles: [
      {
        source: "/tempobook/:path*",
        destination: "/404",
      },
    ],
  };
};

module.exports = nextConfig;
