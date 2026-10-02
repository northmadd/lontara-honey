import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Dipisah dari App agar react-router-dom tidak ikut pada bundle verifikasi.
// Semua navigasi situs memakai reload penuh (<a href> / window.location),
// sehingga router baru dibutuhkan setelah gate terlewati (atau pada halaman
// legal/404 yang dibuka langsung).
const Index = lazy(() => import("./pages/Index"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

const SiteRoutes = () => (
  <BrowserRouter
    basename={routerBasename}
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <Routes>
      <Route path="/" element={<Suspense fallback={null}><Index /></Suspense>} />
      <Route path="/legal/:page" element={<Suspense fallback={null}><LegalPage /></Suspense>} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
    </Routes>
  </BrowserRouter>
);

export default SiteRoutes;
