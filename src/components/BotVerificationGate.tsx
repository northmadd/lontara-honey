import React, { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import logo from '@/assets/logo-lontara.webp';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileWidgetId = string;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'error-callback': () => void;
      'expired-callback': () => void;
      theme?: 'light' | 'dark' | 'auto';
      size?: 'normal' | 'compact' | 'flexible';
    }
  ) => TurnstileWidgetId;
  reset: (widgetId?: TurnstileWidgetId) => void;
  remove: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface BotVerificationGateProps {
  children: React.ReactNode;
}

const isVerificationStillValid = () => {
  return false;
};

const markAsVerified = () => {
  // Verifikasi hanya berlaku untuk sesi halaman ini (tanpa penyimpanan permanen).
  // Setiap kali user membuka/memuat ulang website, ia harus verify kembali.
};

const BotVerificationGate: React.FC<BotVerificationGateProps> = ({ children }) => {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const verifyUrl = import.meta.env.VITE_TURNSTILE_VERIFY_URL || `${import.meta.env.BASE_URL}api/verify-turnstile.php`;
  const [isVerified, setIsVerified] = useState(() => isVerificationStillValid());
  const [isChallengePassed, setIsChallengePassed] = useState(false);
  const [verificationLanguage, setVerificationLanguage] = useState<'id' | 'en'>('en');
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [widgetSize, setWidgetSize] = useState<'flexible' | 'compact'>('flexible');
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);

  useEffect(() => {
    if (!siteKey) {
      setErrorMessage('Turnstile site key belum dikonfigurasi.');
      return;
    }

    if (isVerified || !widgetContainerRef.current) return;

    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !window.turnstile || !widgetContainerRef.current) {
        return;
      }

      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
        sitekey: siteKey,
        theme: 'dark',
        size: widgetSize,
        callback: async (token) => {
          setIsChecking(true);
          setErrorMessage('');

          try {
            const response = await fetch(verifyUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            });
            const responseText = await response.text();
            let result;

            try {
              result = responseText ? JSON.parse(responseText) : {};
            } catch {
              throw new Error('Server verifikasi tidak mengirim JSON yang valid.');
            }

            if (!response.ok || !result.success) {
              throw new Error(result.message || 'Verifikasi gagal. Coba lagi.');
            }

            setIsChallengePassed(true);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Verifikasi gagal. Coba lagi.');
            if (widgetIdRef.current) {
              window.turnstile?.reset(widgetIdRef.current);
            }
          } finally {
            setIsChecking(false);
          }
        },
        'error-callback': () => {
          setErrorMessage('Widget verifikasi gagal dimuat. Coba refresh halaman.');
        },
        'expired-callback': () => {
          setErrorMessage('Verifikasi kedaluwarsa. Silakan centang ulang.');
          if (widgetIdRef.current) {
            window.turnstile?.reset(widgetIdRef.current);
          }
        },
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);

    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener('load', renderWidget, { once: true });
    } else {
      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', renderWidget, { once: true });
      script.addEventListener('error', () => {
        setErrorMessage('Script verifikasi gagal dimuat. Periksa koneksi internet lalu refresh halaman.');
      });
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      existingScript?.removeEventListener('load', renderWidget);
    };
  }, [isVerified, siteKey, verifyUrl, widgetSize]);

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container || isVerified) return;

    const measure = () => {
      const width = container.clientWidth;
      setWidgetSize(width > 0 && width < 300 ? 'compact' : 'flexible');
    };

    measure();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => measure());
      ro.observe(container);
      return () => ro.disconnect();
    }
  }, [isVerified]);

  if (isVerified) {
    return <>{children}</>;
  }

  const copy = {
    id: {
      eyebrow: 'Verifikasi Akses',
      title: ['Pastikan kamu', 'bukan robot'],
      description: 'Kata Mr Sumbul / Northmad Sigma, verifikasi terlebih dahulu sebelum masuk ke website Lontara Honey.',
      checking: 'Memeriksa verifikasi...',
      enter: 'Masuk ke Website',
    },
    en: {
      eyebrow: 'Access Verification',
      title: ['Make sure', 'you are not a robot'],
      description: 'Mr Sumbul / Northmad Sigma says, verify first before entering the Lontara Honey website.',
      checking: 'Checking verification...',
      enter: 'Enter Website',
    },
  }[verificationLanguage];

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#5b3208_0%,#1f1307_42%,#070503_100%)] flex items-center justify-center px-4 py-10 notranslate" translate="no">
      <section className="relative w-full max-w-md overflow-hidden rounded-3xl bg-stone-950/85 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700" />
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-yellow-700/10 blur-3xl" />

        <div className="relative">
          <button
            type="button"
            onClick={() => setVerificationLanguage(verificationLanguage === 'en' ? 'id' : 'en')}
            className="absolute right-0 top-0 flex items-center gap-1.5 rounded-full bg-secondary/50 px-2.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-secondary sm:gap-2 sm:px-3 sm:py-2"
          >
            <Globe className="h-4 w-4" />
            {verificationLanguage.toUpperCase()}
          </button>

          <img
            src={logo}
            alt="Lontara Honey"
            className="mx-auto mb-6 h-28 w-28 rounded-full object-contain p-1 shadow-lg shadow-amber-950/60"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">{copy.eyebrow}</p>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <h1 className="mt-4 text-3xl font-bold text-amber-50">
            {copy.title.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < copy.title.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/75">
            {copy.description}
          </p>

          <div className="mt-7 w-full overflow-hidden">
            <div ref={widgetContainerRef} data-verification-widget className="w-full [&>div]:mx-auto [&>div]:w-full" />

          </div>

          {isChallengePassed && (
            <button
              type="button"
              onClick={() => {
                markAsVerified();
                setIsVerified(true);
              }}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-amber-600/80 to-yellow-500/70 px-7 py-3 text-base font-bold text-white shadow-lg shadow-amber-950/40 transition hover:scale-105 hover:from-amber-500/80 hover:to-yellow-400/80 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-stone-950"
            >
              {copy.enter}
            </button>
          )}

          {isChecking && (
            <p className="mt-4 text-sm font-medium text-amber-300">{copy.checking}</p>
          )}

          {errorMessage && (
            <p className="mt-4 rounded-2xl bg-red-950/60 px-4 py-3 text-sm text-red-100">{errorMessage}</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default BotVerificationGate;
