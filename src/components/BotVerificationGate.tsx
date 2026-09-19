import React, { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import logo from '@/assets/logo-lontara.webp';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { language, setLanguage, t } = useLanguage();
  const [isVerified, setIsVerified] = useState(() => isVerificationStillValid());
  const [isChallengePassed, setIsChallengePassed] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);

  useEffect(() => {
    if (!siteKey) {
      setErrorMessage(t('verify.siteKeyMissing'));
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
        size: 'flexible',
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
              throw new Error(t('verify.invalidJson'));
            }

            if (!response.ok || !result.success) {
              throw new Error(result.message || t('verify.failed'));
            }

            setIsChallengePassed(true);
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : t('verify.failed'));
            if (widgetIdRef.current) {
              window.turnstile?.reset(widgetIdRef.current);
            }
          } finally {
            setIsChecking(false);
          }
        },
        'error-callback': () => {
          setErrorMessage(t('verify.widgetFailed'));
        },
        'expired-callback': () => {
          setErrorMessage(t('verify.expired'));
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
        setErrorMessage(t('verify.scriptFailed'));
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
  }, [isVerified, siteKey, verifyUrl, language]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container || isVerified) return;

    const applyScale = () => {
      const wrap = container.firstElementChild as HTMLElement | null;
      if (!wrap) return;

      const width = container.clientWidth;

      if (width > 0 && width < 300) {
        wrap.style.transform = `scale(${width / 300})`;
        wrap.style.transformOrigin = 'top left';
      } else {
        wrap.style.transform = '';
      }
    };

    applyScale();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => applyScale());
      ro.observe(container);
      const mo = new MutationObserver(() => applyScale());
      mo.observe(container, { childList: true });
      return () => {
        ro.disconnect();
        mo.disconnect();
      };
    }

    return;
  }, [isVerified]);

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#5b3208_0%,#1f1307_42%,#070503_100%)] flex items-center justify-center px-4 py-10 notranslate" translate="no">
      <section className="relative w-full max-w-md overflow-hidden rounded-3xl bg-stone-950/85 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700" />
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-yellow-700/10 blur-3xl" />

        <div className="relative">
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            className="absolute right-0 top-0 flex items-center gap-1.5 rounded-full bg-secondary/50 px-2.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-secondary sm:gap-2 sm:px-3 sm:py-2"
          >
            <Globe className="h-4 w-4" />
            {language.toUpperCase()}
          </button>

          <img
            src={logo}
            alt={t('verify.logoAlt')}
            className="mx-auto mb-6 h-28 w-28 rounded-full object-contain p-1 shadow-lg shadow-amber-950/60"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">{t('verify.eyebrow')}</p>
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <h1 className="mt-4 text-3xl font-bold text-amber-50">
            {t('verify.title1')}
            <br />
            {t('verify.title2')}
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/75">
            {t('verify.description')}
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
              {t('verify.enter')}
            </button>
          )}

          {isChecking && (
            <p className="mt-4 text-sm font-medium text-amber-300">{t('verify.checking')}</p>
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
