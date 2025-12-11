import React, { useState, useRef, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import IntroScreen from '@/components/IntroScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductsSection, { Product } from '@/components/ProductsSection';
import AboutSection from '@/components/AboutSection';
import StorySection from '@/components/StorySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import OrderModal from '@/components/OrderModal';

// Import images
import heroImage from '@/assets/hero-honey.jpg';
import aboutImage from '@/assets/about-honey.jpg';
import happyPeopleImage from '@/assets/happy-people.jpg';
import story1 from '@/assets/story-1.jpg';
import story2 from '@/assets/story-2.jpg';
import story3 from '@/assets/story-3.jpg';
import story4 from '@/assets/story-4.jpg';
import acacia130g from '@/assets/acacia-400g.jpg';
import acacia250g from '@/assets/acacia-250g.jpg';
import acacia485g from '@/assets/acacia-485g.jpg';
import acacia670g from '@/assets/acacia-670g.jpg';
import forest350g from '@/assets/forest-350g.jpg';
import forest400g from '@/assets/forest-400g.jpg';
import forest485g from '@/assets/forest-485g.jpg';
import forest670g from '@/assets/forest-670g.jpg';
import forest7kg from '@/assets/forest-7kg.png';
import stingless200g from '@/assets/stingless-335g.jpg';
import stingless350g from '@/assets/stingless-400g.jpg';
import stingless500g from '@/assets/stingless-485g.jpg';

const products: Product[] = [
  {
    id: '1',
    name: 'Acacia Honey 250g',
    price: 100000,
    weight: '250g',
    image: acacia250g,
    type: 'glass' as const,
  },
  {
    id: '2',
    name: 'Forest Honey 350g',
    price: 130000,
    weight: '350g',
    image: forest350g,
    type: 'glass' as const,
  },
  {
    id: '3',
    name: 'Stingless Bee Honey 335g',
    price: 200000,
    weight: '335g',
    image: stingless200g,
    type: 'glass' as const,
  },
  {
    id: '4',
    name: 'Acacia Honey 400g',
    price: 200000,
    weight: '400g',
    image: acacia130g,
    type: 'glass' as const,
  },
  {
    id: '5',
    name: 'Acacia Honey 485g',
    price: 180000,
    weight: '485g',
    image: acacia485g,
    type: 'glass' as const,
  },
  {
    id: '6',
    name: 'Acacia Honey 670g',
    price: 250000,
    weight: '670g',
    image: acacia670g,
    type: 'glass' as const,
  },
  {
    id: '7',
    name: 'Forest Honey 400g',
    price: 300000,
    weight: '400g',
    image: forest400g,
    type: 'glass' as const,
  },
  {
    id: '8',
    name: 'Forest Honey 485g',
    price: 300000,
    weight: '485g',
    image: forest485g,
    type: 'glass' as const,
  },
  {
    id: '9',
    name: 'Stingless Bee Honey 400g',
    price: 350000,
    weight: '400g',
    image: stingless350g,
    type: 'glass' as const,
  },
  {
    id: '10',
    name: 'Forest Honey 670g',
    price: 350000,
    weight: '670g',
    image: forest670g,
    type: 'glass' as const,
  },
  {
    id: '11',
    name: 'Stingless Bee Honey 485g',
    price: 350000,
    weight: '485g',
    image: stingless500g,
    type: 'glass' as const,
  },
  {
    id: '12',
    name: 'Forest Honey 7kg',
    price: 2000000,
    weight: '7kg',
    image: forest7kg,
    type: 'glass' as const,
  },
].sort((a, b) => a.price - b.price);

const storyImages = [story1, story2, story3, story4];

const IndexContent: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const homeRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    home: homeRef,
    products: productsRef,
    about: aboutRef,
    story: storyRef,
    contact: contactRef,
  };

  const handleNavigate = (section: string) => {
    const ref = sectionRefs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      
      <div ref={homeRef}>
        <HeroSection onNavigate={handleNavigate} heroImage={heroImage} />
      </div>
      
      <div ref={productsRef}>
        <ProductsSection 
          products={products} 
          onOrderProduct={setSelectedProduct}
        />
      </div>
      
      <div ref={aboutRef}>
        <AboutSection aboutImage={aboutImage} />
      </div>
      
      <div ref={storyRef}>
        <StorySection storyImages={storyImages} />
      </div>
      
      <TestimonialsSection happyPeopleImage={happyPeopleImage} />
      
      <div ref={contactRef}>
        <ContactSection />
      </div>
      
      <Footer />
      <WhatsAppButton />
      
      {selectedProduct && (
        <OrderModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
