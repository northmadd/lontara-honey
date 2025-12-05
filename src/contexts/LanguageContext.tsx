import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.story': 'Our Story',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.subtitle': 'Pure Sulawesi Honey',
    'hero.title': 'Nature\'s Golden Treasure',
    'hero.description': 'Discover the authentic taste of Sulawesi\'s finest honey, harvested from pristine forests by generations of beekeepers.',
    'hero.cta': 'Explore Products',
    'hero.learn': 'Our Story',
    
    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'Premium Honey Collection',
    'products.description': 'Each bottle contains pure, unprocessed honey harvested from the wild forests of Sulawesi.',
    'products.plastic.small': 'Plastic Bottle - Small',
    'products.plastic.medium': 'Plastic Bottle - Medium',
    'products.plastic.large': 'Plastic Bottle - Large',
    'products.glass.small': 'Glass Bottle - Small',
    'products.glass.medium': 'Glass Bottle - Medium',
    'products.glass.large': 'Glass Bottle - Large',
    'products.order': 'Order Now',
    'products.weight': 'Weight',
    
    // About
    'about.title': 'About Lontara Honey',
    'about.subtitle': 'The King of Sulawesi Honey',
    'about.p1': 'Lontara Honey represents the pinnacle of Sulawesi\'s honey tradition. Born from the pristine forests of South Sulawesi, our honey carries the essence of biodiversity found nowhere else on Earth.',
    'about.p2': 'We work directly with local beekeepers who have perfected their craft over generations, ensuring every drop of honey maintains its natural purity and exceptional quality.',
    'about.p3': 'Our commitment to sustainability means we harvest responsibly, protecting both the bees and their natural habitat for future generations.',
    'about.quality': 'Premium Quality',
    'about.quality.desc': '100% pure, unprocessed honey',
    'about.sustainable': 'Sustainable',
    'about.sustainable.desc': 'Eco-friendly harvesting',
    'about.authentic': 'Authentic',
    'about.authentic.desc': 'Direct from Sulawesi forests',
    
    // Story
    'story.title': 'Our Journey',
    'story.subtitle': 'From Raja Madu Sulawesi to Lontara Honey',
    'story.chapter1.title': 'The Beginning',
    'story.chapter1.text': 'It all started in the heart of South Sulawesi, where a passionate young man discovered his calling among the wild bees of the forest. Known locally as "Raja Madu Sulawesi" (The Honey King of Sulawesi), he began with nothing but determination and deep respect for nature.',
    'story.chapter2.title': 'Growing Roots',
    'story.chapter2.text': 'Word spread about the exceptional quality of his honey. What began as a small operation selling to neighbors grew into a trusted local brand. The Raja Madu built relationships with fellow beekeepers, sharing knowledge and maintaining the highest standards.',
    'story.chapter3.title': 'Lontara Honey is Born',
    'story.chapter3.text': 'Named after the ancient Bugis script "Lontara," symbolizing our deep connection to Sulawesi\'s heritage, Lontara Honey emerged as a premium brand. Today, we proudly share the treasures of our forests with the world, while staying true to our humble beginnings.',
    'story.chapter4.title': 'Our Vision',
    'story.chapter4.text': 'We dream of bringing Sulawesi\'s golden treasure to every table across the globe, while preserving traditions and protecting our precious ecosystems. Every bottle of Lontara Honey carries this promise.',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'d love to hear from you',
    'contact.name': 'Your Name',
    'contact.phone': 'Phone Number',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.address': 'South Sulawesi, Indonesia',
    
    // Order
    'order.title': 'Complete Your Order',
    'order.product': 'Product',
    'order.price': 'Price',
    'order.name': 'Full Name',
    'order.phone': 'Phone Number',
    'order.notes': 'Notes (optional)',
    'order.payment': 'Payment Method',
    'order.submit': 'Place Order via WhatsApp',
    'order.bank': 'Bank Transfer',
    'order.ewallet': 'E-Wallet',
    'order.cod': 'Cash on Delivery',
    
    // Footer
    'footer.tagline': 'Pure honey from the heart of Sulawesi',
    'footer.rights': 'All rights reserved',
    
    // Intro
    'intro.welcome': 'Welcome to',
    'intro.tagline': 'The Golden Treasure of Sulawesi',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.products': 'Produk',
    'nav.about': 'Tentang',
    'nav.story': 'Cerita Kami',
    'nav.contact': 'Kontak',
    
    // Hero
    'hero.subtitle': 'Madu Murni Sulawesi',
    'hero.title': 'Harta Emas dari Alam',
    'hero.description': 'Temukan cita rasa autentik madu terbaik Sulawesi, dipanen dari hutan perawan oleh para peternak lebah turun-temurun.',
    'hero.cta': 'Lihat Produk',
    'hero.learn': 'Cerita Kami',
    
    // Products
    'products.title': 'Produk Kami',
    'products.subtitle': 'Koleksi Madu Premium',
    'products.description': 'Setiap botol berisi madu murni tanpa proses, dipanen dari hutan liar Sulawesi.',
    'products.plastic.small': 'Botol Plastik - Kecil',
    'products.plastic.medium': 'Botol Plastik - Sedang',
    'products.plastic.large': 'Botol Plastik - Besar',
    'products.glass.small': 'Botol Kaca - Kecil',
    'products.glass.medium': 'Botol Kaca - Sedang',
    'products.glass.large': 'Botol Kaca - Besar',
    'products.order': 'Pesan Sekarang',
    'products.weight': 'Berat',
    
    // About
    'about.title': 'Tentang Lontara Honey',
    'about.subtitle': 'Raja Madu Sulawesi',
    'about.p1': 'Lontara Honey merupakan puncak tradisi madu Sulawesi. Lahir dari hutan perawan Sulawesi Selatan, madu kami membawa esensi keanekaragaman hayati yang tidak ditemukan di tempat lain di Bumi.',
    'about.p2': 'Kami bekerja langsung dengan peternak lebah lokal yang telah menyempurnakan keahlian mereka selama beberapa generasi, memastikan setiap tetes madu mempertahankan kemurnian alami dan kualitas luar biasa.',
    'about.p3': 'Komitmen kami terhadap keberlanjutan berarti kami memanen secara bertanggung jawab, melindungi lebah dan habitat alami mereka untuk generasi mendatang.',
    'about.quality': 'Kualitas Premium',
    'about.quality.desc': 'Madu 100% murni tanpa proses',
    'about.sustainable': 'Berkelanjutan',
    'about.sustainable.desc': 'Pemanenan ramah lingkungan',
    'about.authentic': 'Autentik',
    'about.authentic.desc': 'Langsung dari hutan Sulawesi',
    
    // Story
    'story.title': 'Perjalanan Kami',
    'story.subtitle': 'Dari Raja Madu Sulawesi ke Lontara Honey',
    'story.chapter1.title': 'Awal Mula',
    'story.chapter1.text': 'Semua bermula di jantung Sulawesi Selatan, di mana seorang pemuda penuh semangat menemukan panggilannya di antara lebah-lebah liar hutan. Dikenal secara lokal sebagai "Raja Madu Sulawesi", ia memulai tanpa apa pun selain tekad dan rasa hormat yang dalam terhadap alam.',
    'story.chapter2.title': 'Tumbuh Berakar',
    'story.chapter2.text': 'Kabar tersebar tentang kualitas luar biasa madunya. Apa yang dimulai sebagai operasi kecil menjual ke tetangga tumbuh menjadi merek lokal terpercaya. Raja Madu membangun hubungan dengan sesama peternak lebah, berbagi pengetahuan dan mempertahankan standar tertinggi.',
    'story.chapter3.title': 'Lontara Honey Lahir',
    'story.chapter3.text': 'Dinamai dari aksara Bugis kuno "Lontara", melambangkan hubungan mendalam kami dengan warisan Sulawesi, Lontara Honey muncul sebagai merek premium. Hari ini, kami dengan bangga berbagi harta karun hutan kami dengan dunia, sambil tetap setia pada awal yang sederhana.',
    'story.chapter4.title': 'Visi Kami',
    'story.chapter4.text': 'Kami bermimpi membawa harta emas Sulawesi ke setiap meja di seluruh dunia, sambil melestarikan tradisi dan melindungi ekosistem berharga kami. Setiap botol Lontara Honey membawa janji ini.',
    
    // Contact
    'contact.title': 'Hubungi Kami',
    'contact.subtitle': 'Kami senang mendengar dari Anda',
    'contact.name': 'Nama Anda',
    'contact.phone': 'Nomor Telepon',
    'contact.message': 'Pesan',
    'contact.send': 'Kirim Pesan',
    'contact.whatsapp': 'Chat di WhatsApp',
    'contact.address': 'Sulawesi Selatan, Indonesia',
    
    // Order
    'order.title': 'Selesaikan Pesanan Anda',
    'order.product': 'Produk',
    'order.price': 'Harga',
    'order.name': 'Nama Lengkap',
    'order.phone': 'Nomor Telepon',
    'order.notes': 'Catatan (opsional)',
    'order.payment': 'Metode Pembayaran',
    'order.submit': 'Pesan via WhatsApp',
    'order.bank': 'Transfer Bank',
    'order.ewallet': 'E-Wallet',
    'order.cod': 'Bayar di Tempat',
    
    // Footer
    'footer.tagline': 'Madu murni dari jantung Sulawesi',
    'footer.rights': 'Hak cipta dilindungi',
    
    // Intro
    'intro.welcome': 'Selamat datang di',
    'intro.tagline': 'Harta Emas Sulawesi',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
