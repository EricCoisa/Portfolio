import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Dynamic chunk configuration function
// Função para configuração de chunks do build Vite
export function getBuildConfig(mode: string) {
  // Mapeamento de bibliotecas pesadas para chunks dedicados
  const manualChunkLibs: Record<string, string> = {
    '@radix-ui': 'radix-ui',
    'framer-motion': 'animation',
    'recharts': 'charts',
    '@tanstack/react-query': 'react-query',
    'i18next': 'i18n',
    'lucide-react': 'icons',
  };

  return {
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        /**
         * Define chunks manuais apenas para libs pesadas.
         * React e ReactDOM ficam juntos, gerenciados pelo Vite.
         */
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;

          // Extrai o nome do pacote
          const parts = id.split('node_modules/');
          if (parts.length < 2) return;
          const pkg = parts[1].split('/')[0];

          // Chunks dedicados para libs pesadas
          if (manualChunkLibs[pkg]) {
            return manualChunkLibs[pkg];
          }

          // Demais dependências: Vite/Rollup decide
        },
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const devFilePath = path.resolve(__dirname, "./src/utils/fetch.dev.ts");
  const prodFilePath = path.resolve(__dirname, "./src/utils/fetch.prod.ts");

  // se o fetch.dev.ts não existir, fallback automático para prod
  const fetchDataAlias = fs.existsSync(devFilePath) ? devFilePath : prodFilePath;

  console.log(`📦 Alias fetchData => ${fetchDataAlias}`);

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "./src") },
        { find: "@/utils/fetchData", replacement: fetchDataAlias },
      ],
    },
    build: getBuildConfig(mode),
  };
});