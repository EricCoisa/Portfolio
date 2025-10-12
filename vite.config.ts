import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Dynamic chunk configuration function
export function getBuildConfig(mode: string) {
  // Chunk size mapping for better size estimation
  const packageSizeMap: Record<string, number> = {
    'react': 45 * 1024,
    'react-dom': 130 * 1024,
    'framer-motion': 120 * 1024,
    '@radix-ui': 80 * 1024,
    'recharts': 200 * 1024,
    '@tanstack/react-query': 100 * 1024,
    'i18next': 60 * 1024,
    'lucide-react': 150 * 1024,
    // Default size for unknown packages
    'default': 50 * 1024
  };

  const config = {
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            const sizeMap: Record<string, string[]> = {};
            const chunkSizeLimit = 400 * 1024; // 400 KB per chunk
            let currentChunk = 'vendor-0';
            let currentSize = 0;

            const packageName = id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();

            // Get estimated size for the package
            let estimatedSize = packageSizeMap[packageName] || packageSizeMap['default'];
            
            // Special handling for scoped packages like @radix-ui
            if (packageName.startsWith('@')) {
              const scopedName = packageName.split('/')[0];
              estimatedSize = packageSizeMap[scopedName] || packageSizeMap['default'];
            }

            // Priority chunks for core libraries
            if (packageName === 'react' || packageName === 'react-dom') {
              return 'react-core';
            }
            
            if (packageName.startsWith('@radix-ui')) {
              return 'radix-ui';
            }
            
            if (packageName === 'framer-motion') {
              return 'animation';
            }
            
            if (packageName === 'recharts') {
              return 'charts';
            }
            
            if (packageName.includes('i18n')) {
              return 'i18n';
            }

            // Dynamic chunking for other packages
            if (currentSize + estimatedSize > chunkSizeLimit) {
              const chunkIndex = Object.keys(sizeMap).length;
              currentChunk = `vendor-${chunkIndex}`;
              currentSize = 0;
            }

            if (!sizeMap[currentChunk]) sizeMap[currentChunk] = [];
            sizeMap[currentChunk].push(packageName);
            currentSize += estimatedSize;

            return currentChunk;
          }
        },
      },
    },
  };

  return config;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: getBuildConfig(mode)
}));
