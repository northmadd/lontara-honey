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
    'story.title': 'Our Story',
    'story.subtitle': 'From Raja Madu Sulawesi to Lontara Honey',
    'story.chapter1.title': 'Humble Beginnings',
    'story.chapter1.text': 'Raja Madu Sulawesi started as a small local honey business with limited reach and only a few opportunities to join events. With simple tools and a strong work ethic, every drop of honey was harvested with care from the forests of Sulawesi.',
    'story.chapter2.title': 'Commitment to Quality',
    'story.chapter2.text': 'Over time, the team focused on improving product quality and strengthening the identity of the business. Better processing, cleaner packaging, and more structured management slowly built trust with customers and partners.',
    'story.chapter3.title': 'Lontara Honey is Born',
    'story.chapter3.text': 'From this journey, Lontara Honey was born  a new brand that represents a more modern, hygienic, and professional standard. Carrying the spirit of the Lontara script, the brand reflects our roots in Sulawesi while embracing today\'s expectations.',
    'story.chapter4.title': 'Growing with a Clear Vision',
    'story.chapter4.text': 'Today the company continues to grow under the name Lontara Honey, bringing quality honey from Sulawesi to consumers across Indonesia. Our vision is to keep expanding responsibly, while honoring nature and the communities that make this journey possible.',
    
    // Contact
    'contact.title': 'Contact & Order',
    'contact.subtitle': 'We are ready to help you with your honey orders',
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
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.story': 'Our Story',
    'nav.contact': 'Contact',
    
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
    'story.chapter1.title': 'Awal yang Sederhana',
    'story.chapter1.text': 'Raja Madu Sulawesi berawal sebagai usaha madu lokal kecil dengan jangkauan yang masih terbatas dan jarang mengikuti berbagai event. Dengan peralatan sederhana dan kerja keras, setiap tetes madu dipanen dengan hati-hati dari hutan Sulawesi.',
    'story.chapter2.title': 'Komitmen pada Kualitas',
    'story.chapter2.text': 'Seiring waktu, fokus perusahaan bergeser pada peningkatan kualitas produk dan penguatan identitas bisnis. Proses pengolahan yang lebih baik, kemasan yang lebih bersih, dan pengelolaan yang lebih rapi perlahan membangun kepercayaan pelanggan dan mitra.',
    'story.chapter3.title': 'Lahirnya Lontara Honey',
    'story.chapter3.text': 'Dari perjalanan tersebut lahirlah Lontara Honey  sebuah brand baru yang merepresentasikan standar yang lebih modern, higienis, dan profesional. Membawa semangat aksara Lontara, brand ini mencerminkan akar kami di Sulawesi sekaligus menjawab harapan masa kini.',
    'story.chapter4.title': 'Tumbuh dengan Visi Jelas',
    'story.chapter4.text': 'Kini perusahaan terus tumbuh dengan nama Lontara Honey, menghadirkan madu berkualitas dari Sulawesi kepada konsumen di seluruh Indonesia. Visi kami adalah berkembang secara bertanggung jawab, sambil menghormati alam dan komunitas yang mendukung perjalanan ini.',
    
    // Contact
    'contact.title': 'Kontak & Pemesanan',
    'contact.subtitle': 'Kami siap membantu kebutuhan madu Anda',
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
