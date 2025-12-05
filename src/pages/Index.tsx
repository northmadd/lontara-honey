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
import plasticSmall from '@/assets/product-plastic-small.png';
import plasticMedium from '@/assets/product-plastic-medium.png';
import plasticLarge from '@/assets/product-plastic-large.png';
import glassSmall from '@/assets/product-glass-small.png';
import glassMedium from '@/assets/product-glass-medium.png';
import glassLarge from '@/assets/product-glass-large.png';

const products: Product[] = [
  { id: '1', nameKey: 'products.plastic.small', price: 45000, weight: '150ml', image: plasticSmall, type: 'plastic' },
  { id: '2', nameKey: 'products.plastic.medium', price: 85000, weight: '300ml', image: plasticMedium, type: 'plastic' },
  { id: '3', nameKey: 'products.plastic.large', price: 150000, weight: '500ml', image: plasticLarge, type: 'plastic' },
  { id: '4', nameKey: 'products.glass.small', price: 65000, weight: '200ml', image: glassSmall, type: 'glass' },
  { id: '5', nameKey: 'products.glass.medium', price: 120000, weight: '350ml', image: glassMedium, type: 'glass' },
  { id: '6', nameKey: 'products.glass.large', price: 200000, weight: '500ml', image: glassLarge, type: 'glass' },
];

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
