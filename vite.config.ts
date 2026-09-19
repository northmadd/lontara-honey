import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages SPA fallback: untuk path yang tidak ada file fisik
// (/legal/faq, /legal/privacy, dst) GitHub Pages men-serve 404.html.
// Salinan index.html = SPA mount -> react-router render route yang benar.
// Diperlukan karena quick link legal sekarang buka di TAB BARU
// (target=_blank), jadi browser melakukan HTTP request penuh, bukan
// navigasi client-side react-router seperti <Link> sebelumnya.
const spaFallback404Plugin = (): Plugin => ({
  name: "spa-fallback-404",
  apply: "build",
  async closeBundle() {
    const index = path.join(__dirname, "dist", "index.html");
    const notFound = path.join(__dirname, "dist", "404.html");
    if (existsSync(index)) {
      copyFileSync(index, notFound);
      console.log("[spa-fallback-404] dist/404.html ditulis (copy index.html)");
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages deploys with BASE_PATH=/lontara-honey/ (see .github/workflows/deploy.yml).
  // cPanel production builds without BASE_PATH and serve from the root (/).
  base: process.env.BASE_PATH || "/",
  plugins: [react(), spaFallback404Plugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
