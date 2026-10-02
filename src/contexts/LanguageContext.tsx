import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<'en', Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.story': 'Our Story',
    'nav.contact': 'Contact',
    'nav.international': 'International Order',

    // Navbar controls
    'nav.theme.toggle': 'Toggle theme',
    'nav.mobileMenu.toggle': 'Toggle mobile menu',
    'nav.mode.dark': 'Dark Mode',
    'nav.mode.light': 'Light Mode',

    // Hero
    'hero.subtitle': 'Pure Sulawesi Honey',
    'hero.title': 'Nature\'s Golden Treasure',
    'hero.description': 'Discover the authentic taste of Sulawesi\'s finest honey, harvested from pristine forests by generations of beekeepers.',
    'hero.cta': 'Explore Products',
    'hero.learn': 'Our Story',
    'hero.title.a': 'Nature\'s',
    'hero.title.b': 'Golden',
    'hero.title.c': 'Treasure',
    'hero.paragraph1': 'Pure honey from Sulawesi\'s wild forests,',
    'hero.paragraph2': 'harvested with care by local beekeepers',
    'hero.paragraph3': 'and bottled fresh for your table.',
    'hero.stats.pure': 'Pure Honey',
    'hero.stats.years': 'Years',
    'hero.stats.customers': 'Customers',
    'hero.imageAlt': 'Honey background',

    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'Premium Honey Collection',
    'products.description': 'Each bottle contains pure, unprocessed honey harvested from the wild forests of Sulawesi.',
    'products.rateNote': 'USD prices follow the live exchange rate',
    'products.plastic.small': 'Plastic Bottle - Small',
    'products.plastic.medium': 'Plastic Bottle - Medium',
    'products.plastic.large': 'Plastic Bottle - Large',
    'products.glass.small': 'Glass Bottle - Small',
    'products.glass.medium': 'Glass Bottle - Medium',
    'products.glass.large': 'Glass Bottle - Large',
    'products.order': 'Order Now',
    'products.weight': 'Weight',
    'products.selection': 'Product Selection',
    'products.packaging.plastic': 'Plastic Bottle',
    'products.packaging.glass': 'Glass Bottle',
    'products.viewDetails': 'View Details',
    'product.details.description': 'Description',
    'product.details.benefits': 'Benefits',
    'product.details.usage': 'How to Use',
    'product.details.storage': 'Storage',
    'product.details.close': 'Close',
    'product.details.packaging': 'Packaging',
    'product.details.packaging.glass.title': 'Glass Bottle',
    'product.details.packaging.glass.text': 'Food-grade glass keeps the honey intact without altering its taste or aroma, is easy to clean and reuse, and looks premium on your shelf.',
    'product.details.packaging.plastic.title': 'Plastic Bottle',
    'product.details.packaging.plastic.text': 'Made of food-grade, BPA-free plastic — lightweight, leak-proof, practical for travel and daily use, while keeping the honey fresh.',
    'product.details.certifications': 'Certifications',
    'product.details.certifications.labtest': 'Lab Test',
    'product.details.certifications.text': 'Halal, NKV, HACCP, and laboratory-test documents are available on request.',
    'product.details.disclaimer': 'This information is for reference only and is not a substitute for medical advice. Consult your doctor if you have specific health conditions.',

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
    'about.imageAlt': 'About Lontara Honey',
    'about.beeAlt': 'Bee',

    // Story
    'story.title': 'Our Story',
    'story.subtitle': 'From Raja Madu Sulawesi to Lontara Honey',
    'story.chapter': 'Chapter',
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
    'contact.phoneRequired': 'Phone number is required.',
    'contact.toast.wait.title': 'Please wait a moment',
    'contact.toast.wait.desc': 'You can send another message in a few seconds.',
    'contact.toast.redirect.title': 'Redirecting to WhatsApp',
    'contact.toast.redirect.desc': 'Your message is ready to send!',
    'contact.wa.message': 'Hello Lontara Honey! I would like to place an order or ask about your products.',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone / WhatsApp',
    'contact.info.email': 'Email',
    'contact.paragraph1': 'Reach out to us for product information and wholesale inquiries,',
    'contact.paragraph2': 'or direct orders of Lontara Honey.',
    'contact.namePlaceholder': 'Your Name..',
    'contact.messagePlaceholder': 'Your message...',
    'contact.countryCode.aria': 'Country code',
    'contact.map.title': 'Lontara Honey Location',
    'contact.map.error.title': 'Unable to load map',
    'contact.map.error.address': 'Jl. Pangkabinanga, Pangkabinanga, Pallangga, Gowa, Sulawesi Selatan 92161',

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
    'order.phoneRequired': 'Phone number is required.',
    'order.namePlaceholder': 'Your Name..',
    'order.notesPlaceholder': 'Any special requests...',
    'order.comingSoon': 'Coming soon',
    'order.countryCode.aria': 'Country code',
    'order.bank.name': 'Bank Mandiri',
    'order.bank.number': 'Account number:',
    'order.bank.holder': 'Account holder:',
    'order.bank.confirm': 'Please confirm your order with our team before making a transfer.',
    'order.address': 'Delivery Address',
    'order.addressPlaceholder': 'Street, district, city, postal code...',
    'order.addressMaps': 'Choose on Map',
    'order.map.title': 'Pick a Location on the Map',
    'order.map.hint': 'Search a place or shop name, then pick from the result list — the selected address is copied and filled in automatically, and the map moves to that exact spot.',
    'order.map.open': 'Open in Google Maps',
    'order.map.copy': 'Copy Address',
    'order.map.copied': 'Address copied!',
    'order.map.search': 'Search address or place...',
    'order.map.searchBtn': 'Search',
    'order.map.resolving': 'Searching... ',
    'order.map.noResult': 'No results found. Try another keyword, or type the street / area name.',
    'order.qris.expires': 'QRIS session expires in',
    'order.qris.scan': 'Scan this QR with your e-wallet or mobile banking app.',
    'order.qris.requestNote': 'QRIS selected. Our team will send the QRIS code via WhatsApp so you can complete the payment there.',
    'order.qris.rules.title': 'Please read before paying',
    'order.qris.rules.intro': 'How to pay with QRIS:',
    'order.qris.rules.rule1': '1. Pay the exact amount with the QR code below.',
    'order.qris.rules.rule2': '2. After paying, upload 1 photo of your transfer proof.',
    'order.qris.rules.rule3': '3. Your order is processed after we check your proof.',
    'order.qris.rules.agree': 'I understand and agree.',
    'order.qris.rules.required': 'Please check "I understand and agree" first to see the QR code.',
    'order.qris.proofReminder': 'IMPORTANT: Upload 1 photo of your transfer proof, then confirm below. Our team verifies the proof manually before the order is processed.',
    'order.qris.proof.label': 'Transfer Proof Photo',
    'order.qris.proof.hint': 'Upload 1 photo of your payment proof (bank transfer / mobile banking / e-wallet receipt). Maximum 1 photo, up to 5 MB.',
    'order.qris.proof.upload': 'Upload Photo',
    'order.qris.proof.replace': 'Replace Photo',
    'order.qris.proof.required': 'Please upload the transfer proof photo before confirming.',
    'order.qris.proof.uploading': 'Uploading proof...',
    'order.qris.proof.uploadFailed': 'Failed to upload the proof. Please try again.',
    'order.qris.proof.noConfig': 'Proof upload service is not configured yet. Please contact the store admin.',
    'order.qris.proof.tooLarge': 'The photo is too large. Maximum size is 5 MB.',
    'order.qris.proof.invalid': 'The file must be an image (photo).',
    'order.qris.confirm': 'I have completed the payment — the transfer proof photo above is the proof I paid.',
    'order.qris.proofRequired': 'Please confirm that you have paid and uploaded the proof.',
    'order.qris.expired.title': 'QRIS session expired',
    'order.qris.expired.desc': 'The 10-minute session has ended and the payment data was reset. Please select QRIS again to start a new session.',
    'order.wa.address': 'Address:',
    'order.wa.qris.note': 'Payment proof:',
    'order.wa.qris.manual': '(attach the transfer proof photo in this chat)',
    'order.wa.qris.request': 'The customer requests QRIS payment — please send the QRIS code.',
    'order.wa.title': '🍯 *NEW ORDER - LONTARA HONEY*\n\n',
    'order.wa.product': '*Product:*',
    'order.wa.weight': '*Weight:*',
    'order.wa.price': '*Price:*',
    'order.wa.customer': '*Customer Details:*',
    'order.wa.name': 'Name:',
    'order.wa.phone': 'Phone:',
    'order.wa.payment': 'Payment:',
    'order.wa.notes': 'Notes:',
    'order.wa.thanks': 'Thank you for ordering Lontara Honey! 🐝',

    // International
    'international.eyebrow': 'International orders',
    'international.title': 'From Sulawesi to your destination',
    'international.description': 'We support export enquiries and wholesale orders. Shipping arrangements, costs, customs duties, and delivery timelines are confirmed with each buyer based on the destination country.',
    'international.card1.title': 'Global logistics',
    'international.card1.text': 'DHL, FedEx, Attaba Express, Forwarder SBL, and ALFI Logistik.',
    'international.card2.title': 'Secure payment',
    'international.card2.text': 'Bank transfer is available after order confirmation. PayPal is coming soon.',
    'international.card3.title': 'Documentation',
    'international.card3.text': 'Halal, NKV, HACCP, and laboratory-test documents are available on request.',
    'international.card4.title': 'Return support',
    'international.card4.text': 'Report a damaged shipment within 7 days of delivery with an unboxing video. Resolution is handled with the exporter.',
    'international.footer': 'Contact us for a country-specific shipping quotation.',
    'international.details.view': 'View Details',
    'international.details.item': 'items',

    // Testimonials
    'testimonials.eyebrow': 'Testimonials',
    'testimonials.title': 'Happy Customers',
    'testimonials.subtitle': 'Join thousands of customers who have experienced the magic of Lontara Honey',
    'testimonials.imageAlt': 'Happy customers enjoying Lontara Honey',
    'testimonials.writeCta': 'Write a Review',
    'testimonials.writeTitle': 'Share Your Experience',
    'testimonials.writeName': 'Your Name',
    'testimonials.writeNamePh': 'e.g. Budi Santoso',
    'testimonials.writeCity': 'City',
    'testimonials.writeCityPh': 'e.g. Makassar',
    'testimonials.writeRating': 'Rating',
    'testimonials.writeComment': 'Your Review',
    'testimonials.writeCommentPh': 'Tell us about your experience with Lontara Honey...',
    'testimonials.writeSubmit': 'Post Review',
    'testimonials.writeCancel': 'Cancel',
    'testimonials.writeRequired': 'Please fill in your name, city, and review.',
    'testimonials.writeCityInvalid': 'City not found. Please make sure the city name is spelled correctly and exists in the world.',
    'testimonials.writeFailed': 'Failed to save your review. Please check your connection and try again.',
    'testimonials.writePosting': 'Posting...',
    'testimonials.writeAria': 'Write a review',

    // Footer
    'footer.tagline': 'Pure honey from the heart of Sulawesi',
    'footer.tagline1': 'Pure honey from the heart of',
    'footer.tagline2': 'Sulawesi',
    'footer.rights': 'All rights reserved',
    'footer.navigation': 'Navigation',
    'footer.quickLink': 'Quick Link',
    'footer.services': 'Services',
    'footer.faqs': 'FAQs',
    'footer.blog': 'Blog',
    'footer.blog.comingSoon': 'Blog coming soon!',
    'footer.booking': 'Booking',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.shipping': 'Shipping Policy',
    'footer.refund': 'Refund Policy',
    'footer.premiumSupply': 'Premium Honey Supply',
    'footer.wholesale': 'Wholesale',
    'footer.retail': 'Retail',
    'footer.support': 'Support',
    'footer.copyright': '© 2026 Lontara Honey. All Rights Reserved.',
    'footer.websiteBy': 'WEBSITE BY',
    'footer.wa.booking': 'I would like to book Lontara Honey products',
    'footer.wa.wholesale': 'I am interested in wholesale Lontara Honey products',
    'footer.logoAlt': 'Lontara Honey logo',
    'footer.honeyAlt': 'Lontara Honey',
    'footer.social.instagram': 'Instagram',
    'footer.social.tiktok': 'TikTok',
    'footer.social.youtube': 'YouTube',
    'footer.northmadAria': 'Northmad Instagram',

    // Intro
    'intro.welcome': 'Welcome to',
    'intro.tagline': 'The Golden Treasure of Sulawesi',

    // WhatsApp button
    'whatsapp.message': 'Hello! I\'m interested in Lontara Honey products.',
    'whatsapp.mute.aria': 'Mute backsound',
    'whatsapp.unmute.aria': 'Unmute backsound',
    'whatsapp.chat.aria': 'Chat on WhatsApp',

    // Verification gate
    'verify.eyebrow': 'Access Verification',
    'verify.title1': 'Make sure',
    'verify.title2': 'you are not a robot',
    'verify.description': 'Mr Sumbul / Northmad Sigma says, verify first before entering the Lontara Honey website.',
    'verify.checking': 'Checking verification...',
    'verify.enter': 'Enter Website',
    'verify.logoAlt': 'Lontara Honey',
    'verify.siteKeyMissing': 'Turnstile site key is not configured.',
    'verify.invalidJson': 'Server verification did not respond with valid JSON.',
    'verify.failed': 'Verification failed. Please try again.',
    'verify.widgetFailed': 'The verification widget failed to load. Please refresh the page.',
    'verify.expired': 'Verification expired. Please check again.',
    'verify.scriptFailed': 'Verification script failed to load. Check your internet connection, then refresh the page.',

    // Admin
    'admin.aria': 'Admin login',
    'admin.title': 'Admin Login',
    'admin.subtitle': 'Sign in to manage comments.',
    'admin.username': 'Username',
    'admin.usernamePh': 'Enter username',
    'admin.password': 'Password',
    'admin.passwordPh': 'Enter password',
    'admin.login': 'Sign In',
    'admin.logout': 'Log Out',
    'admin.invalid': 'Incorrect username or password.',
    'admin.loggedIn': 'Signed in as admin',
    'admin.editTitle': 'Edit Comment',
    'admin.save': 'Save Changes',
    'admin.saving': 'Saving...',
    'admin.deleteConfirm': 'Delete this comment permanently?',
    'admin.deleteFailed': 'Failed to delete the comment.',
    'admin.updateFailed': 'Failed to update the comment.',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.dashboard': 'Admin Dashboard',
    'admin.menuComments': 'Comments',
    'admin.commentsHeading': 'All Comments',
    'admin.totalComments': 'comments',
    'admin.loading': 'Loading comments...',
    'admin.loadFailed': 'Failed to load comments.',
    'admin.empty': 'No comments yet.',
    'admin.open': 'Open dashboard',
    'admin.close': 'Close dashboard',
    'admin.refresh': 'Refresh',

    // Country names
    'country.indonesia': 'Indonesia',
    'country.malaysia': 'Malaysia',
    'country.singapore': 'Singapore',
    'country.thailand': 'Thailand',
    'country.philippines': 'Philippines',
    'country.vietnam': 'Vietnam',
    'country.brunei': 'Brunei',
    'country.cambodia': 'Cambodia',
    'country.laos': 'Laos',
    'country.myanmar': 'Myanmar',
    'country.australia': 'Australia',
    'country.japan': 'Japan',
    'country.southKorea': 'South Korea',
    'country.china': 'China',
    'country.hongKong': 'Hong Kong',
    'country.macau': 'Macau',
    'country.taiwan': 'Taiwan',
    'country.india': 'India',
    'country.pakistan': 'Pakistan',
    'country.bangladesh': 'Bangladesh',
    'country.newZealand': 'New Zealand',
    'country.qatar': 'Qatar',
    'country.saudiArabia': 'Saudi Arabia',
    'country.uae': 'United Arab Emirates',
    'country.germany': 'Germany',
    'country.france': 'France',
    'country.italy': 'Italy',
    'country.netherlands': 'Netherlands',
    'country.uk': 'United Kingdom',
    'country.us': 'United States',

    // Legal
    'legal.back': '← Back to Lontara Honey',
    'legal.lastUpdated': 'Last updated: ',
    'legal.notFound': 'Page not found.',
    'legal.footer': 'Lontara Honey · PT Lontara Jaya Nusantara · South Sulawesi, Indonesia',
    'legal.privacy.title': 'Privacy Policy',
    'legal.privacy.updated': '23 August 2026',
    'legal.privacy.s1.heading': 'Information we collect',
    'legal.privacy.s1.text': 'We collect the name, telephone number, country code, delivery address, and message you submit through our contact and order forms.',
    'legal.privacy.s2.heading': 'How we use it',
    'legal.privacy.s2.text': 'We use this information solely to respond to enquiries, prepare quotations, confirm orders, arrange shipping, and provide customer support.',
    'legal.privacy.s3.heading': 'Third parties',
    'legal.privacy.s3.text': 'Order messages are sent to WhatsApp. The website also uses Google Maps and flag images supplied by FlagCDN. Their privacy practices apply when you use those services.',
    'legal.privacy.s4.heading': 'Contact',
    'legal.privacy.s4.text': 'For privacy questions, contact lontarajayanusantara@gmail.com.',
    'legal.terms.title': 'Terms & Conditions',
    'legal.terms.updated': '23 August 2026',
    'legal.terms.s1.heading': 'Order confirmation',
    'legal.terms.s1.text': 'An order is accepted only after Lontara Honey confirms product availability, price, payment method, and shipping arrangement in writing.',
    'legal.terms.s2.heading': 'Product information',
    'legal.terms.s2.text': 'Product images are illustrative. Natural honey may vary in colour, aroma, and texture between batches.',
    'legal.terms.s3.heading': 'International orders',
    'legal.terms.s3.text': 'Shipping costs, customs duties, taxes, import permissions, and delivery timelines are agreed with the buyer for the destination country before payment.',
    'legal.shipping.title': 'Shipping Policy',
    'legal.shipping.updated': '23 August 2026',
    'legal.shipping.s1.heading': 'Shipping partners',
    'legal.shipping.s1.text': 'Available logistics partners include DHL, FedEx, Attaba Express, Forwarder SBL, and ALFI Logistik.',
    'legal.shipping.s2.heading': 'Quotation',
    'legal.shipping.s2.text': 'Shipping method, charges, transit time, insurance, customs handling, and destination eligibility depend on the buyer agreement and destination country.',
    'legal.shipping.s3.heading': 'Tracking',
    'legal.shipping.s3.text': 'A tracking number or shipment reference is provided when available from the selected logistics partner.',
    'legal.refund.title': 'Refund & Return Policy',
    'legal.refund.updated': '23 August 2026',
    'legal.refund.s1.heading': 'Damaged shipments',
    'legal.refund.s1.text': 'Report damaged or incorrect shipments within 7 days after delivery and include a clear unboxing video, product photos, and order details.',
    'legal.refund.s2.heading': 'Review',
    'legal.refund.s2.text': 'Each eligible claim is reviewed with the exporter and relevant logistics partner. Resolution may include replacement, partial refund, or refund as agreed in writing.',
    'legal.refund.s3.heading': 'Non-returnable items',
    'legal.refund.s3.text': 'Opened, consumed, incorrectly stored, or buyer-damaged products are not eligible for return unless required by applicable law.',
    'legal.faq.title': 'Frequently Asked Questions',
    'legal.faq.updated': '23 August 2026',
    'legal.faq.s1.heading': 'Do you ship internationally?',
    'legal.faq.s1.text': 'Yes. Contact us with your destination and order quantity for a shipping quotation.',
    'legal.faq.s2.heading': 'Which payment methods are available?',
    'legal.faq.s2.text': 'Bank Mandiri transfer and QRIS are currently available. PayPal is coming soon.',
    'legal.faq.s3.heading': 'Are certificates available?',
    'legal.faq.s3.text': 'Halal, NKV, HACCP, and laboratory-test documents are available on request.',
    'legal.faq.s4.heading': 'How do I make a wholesale enquiry?',
    'legal.faq.s4.text': 'Send your required quantity, destination country, and preferred shipping terms through WhatsApp or the contact form.',

    // NotFound
    'notFound.title': 'Oops! Page not found',
    'notFound.back': 'Return to Home',

    // SEO
    'seo.title': 'Lontara Honey | Pure Sulawesi Honey',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => 'en';

// Terjemahan Indonesia dimuat dinamis (code-split) agar tidak menambah bundle
// verifikasi awal. Bahasa default selalu 'en'.
let idTranslations: Record<string, string> | null = null;

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    if (lang === 'en') {
      setLanguageState('en');
      return;
    }
    if (idTranslations) {
      setLanguageState('id');
      return;
    }
    void import('./translations.id').then((m) => {
      idTranslations = m.idTranslations;
      setLanguageState('id');
    });
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
    document.title =
      language === 'id' && idTranslations
        ? idTranslations['seo.title'] || translations.en['seo.title']
        : translations.en['seo.title'];
  }, [language]);

  const t = (key: string): string => {
    if (language === 'id' && idTranslations) {
      return idTranslations[key] || translations.en[key] || key;
    }
    return translations.en[key] || key;
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