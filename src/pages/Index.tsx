import React, { lazy, Suspense, useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import IntroScreen from '@/components/IntroScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import type { Product } from '@/components/ProductsSection';
import backsound from '@/assets/wle.mp3';

const ProductsSection = lazy(() => import('@/components/ProductsSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const StorySection = lazy(() => import('@/components/StorySection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));
const OrderModal = lazy(() => import('@/components/OrderModal'));
const InternationalSection = lazy(() => import('@/components/InternationalSection'));

// Import images
import heroImage from '@/assets/hero-honey.webp';
import aboutImage from '@/assets/about-honey.webp';
import happyPeopleImage from '@/assets/happy-people.webp';
import story1 from '@/assets/story-1.webp';
import story2 from '@/assets/story-2.webp';
import story3 from '@/assets/story-3.webp';
import story4 from '@/assets/story-4.webp';
import acacia140g from '@/assets/acacia honey 140g  50k.webp';
import acacia350g from '@/assets/acacia honey 350g 130k.webp';
import acacia670g from '@/assets/acacia honey 670g 250k.webp';
import forest350g from '@/assets/forest honey 350g 180k.webp';
import forest670g from '@/assets/forest honey 670g 350k.webp';
import stingless350g from '@/assets/stingless be honey 350g 180k.webp';
import stingless670g from '@/assets/stingless be honey 670g 400k.webp';

const products: Product[] = [
  {
    id: 'acacia-140g',
    name: {
      id: 'Madu Akasia 140g',
      en: 'Acacia Honey 140g'
    },
    price: 50000,
    weight: '140g',
    image: acacia140g,
    type: 'plastic' as const,
  },
  {
    id: 'acacia-350g',
    name: {
      id: 'Madu Akasia 350g',
      en: 'Acacia Honey 350g'
    },
    price: 130000,
    weight: '350g',
    image: acacia350g,
    type: 'plastic' as const,
  },
  {
    id: 'forest-350g',
    name: {
      id: 'Madu Hutan 350g',
      en: 'Forest Honey 350g'
    },
    price: 180000,
    weight: '350g',
    image: forest350g,
    type: 'plastic' as const,
  },
  {
    id: 'stingless-350g',
    name: {
      id: 'Madu Lebah Tanpa Sengat 350g',
      en: 'Stingless Bee Honey 350g'
    },
    price: 180000,
    weight: '350g',
    image: stingless350g,
    type: 'plastic' as const,
  },
  {
    id: 'acacia-670g',
    name: {
      id: 'Madu Akasia 670g',
      en: 'Acacia Honey 670g'
    },
    price: 250000,
    weight: '670g',
    image: acacia670g,
    type: 'glass' as const,
  },
  {
    id: 'forest-670g',
    name: {
      id: 'Madu Hutan 670g',
      en: 'Forest Honey 670g'
    },
    price: 350000,
    weight: '670g',
    image: forest670g,
    type: 'glass' as const,
  },
  {
    id: 'stingless-670g',
    name: {
      id: 'Madu Lebah Tanpa Sengat 670g',
      en: 'Stingless Bee Honey 670g'
    },
    price: 400000,
    weight: '670g',
    image: stingless670g,
    type: 'glass' as const,
  },
].sort((a, b) => a.price - b.price);

const storyImages = [story1, story2, story3, story4];

// Intro cukup sekali per sesi SPA (level modul, bukan hook): balik dari quick
// link legal di footer tidak memutar ulang, tapi refresh/reload penuh tetap
// memutar seperti pertama kali masuk.
const introPlayedOnceRef = { current: false };
const IndexContent: React.FC = () => {
  // Intro sekali per sesi SPA: balik dari quick link legal di footer tidak
  // memutar ulang, tapi refresh penuh (reload) tetap memutar seperti dulu.
  const [showIntro, setShowIntro] = useState(() => {
    if (introPlayedOnceRef.current) return false;
    introPlayedOnceRef.current = true;
    return true;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBacksoundMuted, setIsBacksoundMuted] = useState(false);

  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  // Changes when the user switches language (en/id) or theme (light/dark).
  // Remounting the sections makes every JS/Framer animation replay.
  const animationKey = `${language}-${resolvedTheme ?? 'dark'}`;

  const backsoundRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedBacksoundRef = useRef(false);
  const lastScrollPosRef = useRef(0);
  const homeRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const internationalRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = useMemo(() => ({
    home: homeRef,
    products: productsRef,
    about: aboutRef,
    story: storyRef,
    international: internationalRef,
    contact: contactRef,
  }), []);

  const handleNavigate = (section: string) => {
    const ref = sectionRefs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      lastScrollPosRef.current = window.scrollY;
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  // Restore the exact scroll position after the sections remount so
  // toggling language or theme never moves the page.
  useLayoutEffect(() => {
    window.scrollTo(0, lastScrollPosRef.current);
  }, [animationKey]);

  useEffect(() => {
    document.documentElement.classList.toggle('intro-lock', showIntro);

    if (backsoundRef.current) {
      backsoundRef.current.muted = isBacksoundMuted;
    }

    if (showIntro || hasStartedBacksoundRef.current || !backsoundRef.current) {
      return () => {
        document.documentElement.classList.remove('intro-lock');
      };
    }

    const removeStartListeners = () => {
      document.body.removeEventListener('pointerdown', startBacksound);
      document.body.removeEventListener('touchstart', startBacksound);
      document.body.removeEventListener('click', startBacksound);
    };

    const startBacksound = () => {
      if (!backsoundRef.current || hasStartedBacksoundRef.current) return;

      backsoundRef.current.volume = 1;
      backsoundRef.current.loop = true;
      backsoundRef.current
        .play()
        .then(() => {
          hasStartedBacksoundRef.current = true;
          removeStartListeners();
        })
        .catch(() => {
          // Browser autoplay policy may require a user gesture.
        });
    };

    const resumeBacksound = () => {
      if (
        !document.hidden &&
        backsoundRef.current &&
        backsoundRef.current.paused &&
        hasStartedBacksoundRef.current &&
        !backsoundRef.current.muted
      ) {
        backsoundRef.current
          .play()
          .catch(() => {
            // Browser autoplay policy may block resuming; user can tap again.
          });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && backsoundRef.current && !backsoundRef.current.paused) {
        backsoundRef.current.pause();
      } else if (!document.hidden) {
        resumeBacksound();
      }
    };

    startBacksound();

    document.body.addEventListener('pointerdown', startBacksound);
    document.body.addEventListener('touchstart', startBacksound);
    document.body.addEventListener('click', startBacksound);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', resumeBacksound);

    return () => {
      document.documentElement.classList.remove('intro-lock');
      removeStartListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', resumeBacksound);
    };
  }, [showIntro, isBacksoundMuted]);

  return (
    <>
      <audio ref={backsoundRef} preload="auto" src={backsound} loop className="hidden" />
      {showIntro ? (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="min-h-screen bg-background notranslate" translate="no">
          <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

          <div key={animationKey}>
      <div ref={homeRef} id="home">
        <HeroSection onNavigate={handleNavigate} heroImage={heroImage} />
      </div>

      <div ref={productsRef} id="products">
        <Suspense fallback={<div className="min-h-[320px]" />}>
          <ProductsSection
            products={products}
            onOrderProduct={setSelectedProduct}
          />
        </Suspense>
      </div>

      <div ref={aboutRef} id="about">
        <Suspense fallback={<div className="min-h-[320px]" />}>
          <AboutSection aboutImage={aboutImage} />
        </Suspense>
      </div>

      <div ref={storyRef} id="story">
        <Suspense fallback={<div className="min-h-[320px]" />}>
          <StorySection storyImages={storyImages} />
        </Suspense>
      </div>

      <Suspense fallback={<div className="min-h-[320px]" />}>
        <TestimonialsSection happyPeopleImage={happyPeopleImage} />
      </Suspense>
      <div ref={internationalRef} id="international">
        <Suspense fallback={<div className="min-h-[320px]" />}><InternationalSection /></Suspense>
      </div>

      <div ref={contactRef} id="contact">
        <Suspense fallback={<div className="min-h-[320px]" />}><ContactSection /></Suspense>
      </div>

      <Suspense fallback={null}>
        <Footer />
        <WhatsAppButton
          isMuted={isBacksoundMuted}
          onToggleMute={() => {
            const nextMuted = !isBacksoundMuted;
            setIsBacksoundMuted(nextMuted);
            if (backsoundRef.current) {
              backsoundRef.current.muted = nextMuted;
            }
          }}
        />
      </Suspense>

      {selectedProduct && (
        <Suspense fallback={null}>
          <OrderModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Suspense>
      )}
          </div>
    </div>
    )}
    </>
  );
};

const Index: React.FC = () => {
  return <IndexContent />;
};

export default Index;
