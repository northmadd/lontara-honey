import { Suspense, lazy } from "react";
import BotVerificationGate from "./components/BotVerificationGate";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";

// Router + halaman dimuat malas. Selama di gate verifikasi, react-router-dom
// tidak perlu diunduh sama sekali (tidak ada navigasi client-side di situs ini;
// semua link memakai reload penuh). Ini memangkas JS pada muatan awal.
const SiteRoutes = lazy(() => import("./SiteRoutes"));

// Tentukan apakah path saat ini halaman utama (yang butuh gate verifikasi bot).
// Karena seluruh navigasi memakai reload penuh, keputusan saat mount aman.
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const isHomeRoute = (() => {
  const path = window.location.pathname;
  return path === `${basePath}/` || path === basePath || path === "";
})();

const App = () => (
  <LanguageProvider>
    <AdminProvider>
      {isHomeRoute ? (
        // Gate verifikasi bot HANYA untuk halaman utama (intro). Halaman quick
        // link legal (tab baru) & 404 dibuka TANPA gate.
        <BotVerificationGate>
          <Suspense fallback={null}>
            <SiteRoutes />
          </Suspense>
        </BotVerificationGate>
      ) : (
        <Suspense fallback={null}>
          <SiteRoutes />
        </Suspense>
      )}
    </AdminProvider>
  </LanguageProvider>
);

export default App;
