import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { copyFileSync, existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Halaman awal hanya berisi BotVerificationGate, jadi CSS kritisnya cukup kecil
// relatif. Menanam (inline) seluruh CSS hasil build ke index.html menghapus
// permintaan render-blocking (~300ms di jaringan throttled) dan request RTT
// tambahan tanpa mengubah tampilan. Preload logo gate juga dibuat sadar-base
// agar tetap benar saat di-deploy ke subpath GitHub Pages.
const inlineCssPlugin = (): Plugin => ({
  name: "inline-critical-css",
  apply: "build",
  closeBundle() {
    const index = path.join(__dirname, "dist", "index.html");
    if (!existsSync(index)) return;
    const base = (process.env.BASE_PATH || "/").replace(/\/$/, ""); // "" atau "/lontara-honey"
    let html = readFileSync(index, "utf8");
    const inlined: string[] = [];

    html = html.replace(
      /<link rel="stylesheet"[^>]*?href="([^"]+\.css)"[^>]*?>/g,
      (match, href: string) => {
        const rel = (href.startsWith(base) && base ? href.slice(base.length) : href).replace(/^\//, "");
        const cssPath = path.join(__dirname, "dist", rel);
        if (!existsSync(cssPath)) return match;
        const css = readFileSync(cssPath, "utf8");
        inlined.push(cssPath);
        return `<style>${css}</style>`;
      },
    );

    html = html.replace(/href="\/logo-gate\.webp"/g, `href="${base}/logo-gate.webp"`);

    writeFileSync(index, html);
    for (const p of inlined) rmSync(p, { force: true });
    if (inlined.length) console.log(`[inline-critical-css] ${inlined.length} file CSS ditanam ke index.html`);
  },
});

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
  plugins: [react(), inlineCssPlugin(), spaFallback404Plugin()],
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
