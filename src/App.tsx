import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BotVerificationGate from "./components/BotVerificationGate";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";

// Halaman utama (beserta seluruh section, framer-motion, react-query, dan
// modal) dimuat malas. BotVerificationGate adalah satu-satunya tampilan awal,
// jadi bundle verifikasi tidak perlu mengunduh/parse kode situs penuh.
const Index = lazy(() => import("./pages/Index"));
// Halaman legal & 404 tidak pernah tampil di muatan awal (gate), jadi ikut
// dipecah agar tidak menambah berat bundle verifikasi.
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <LanguageProvider>
    <AdminProvider>
      <BrowserRouter basename={routerBasename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Gate verifikasi bot HANYA untuk halaman utama (intro). Halaman
              quick link legal (tab baru) & 404 dibuka TANPA gate — permintaan:
              "gausah ada verif bot kalau mau ke quick link". */}
          <Route path="/" element={<BotVerificationGate><Suspense fallback={null}><Index /></Suspense></BotVerificationGate>} />
          <Route path="/legal/:page" element={<Suspense fallback={null}><LegalPage /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  </LanguageProvider>
);

export default App;
