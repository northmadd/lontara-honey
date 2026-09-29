import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BotVerificationGate from "./components/BotVerificationGate";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LegalPage from "./pages/LegalPage";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";

const queryClient = new QueryClient();

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <AdminProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={routerBasename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Gate verifikasi bot HANYA untuk halaman utama (intro). Halaman
              quick link legal (tab baru) & 404 dibuka TANPA gate — permintaan:
              "gausah ada verif bot kalau mau ke quick link". */}
          <Route path="/" element={<BotVerificationGate><Index /></BotVerificationGate>} />
          <Route path="/legal/:page" element={<LegalPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AdminProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
