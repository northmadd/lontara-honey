import React from 'react';
import { Instagram, PlayCircle, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import logoLontara from '@/assets/logo-lontara.png';
import honeyFooter from '@/assets/honey-footer.png';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = (message: string) => {
    const phoneNumber = '6282347905543';
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(webUrl, '_blank');
  };

  const contactItems = [
    {
      icon: MapPin,
      label: 'South Sulawesi, Indonesia',
    },
    {
      icon: Phone,
      label: '+62 823 4790 5543',
    },
    {
      icon: Mail,
      label: 'arianiamin74@gmail',
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/maduhutanlontara', label: 'Instagram' },
    { icon: PlayCircle, href: 'https://tiktok.com/@maduhutanlontara', label: 'TikTok' },
    { icon: Youtube, href: 'https://youtube.com/@rajamadusulawesi7380', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/20 text-black dark:from-[#1a120d] dark:via-[#2a1c0f]/80 dark:to-[#3c2414]/60 dark:text-white pt-16 pb-12 relative overflow-hidden">
      {/* Large Honey Image */}
      <div className="absolute bottom-32 right-3 w-full pointer-events-none z-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative h-64 w-64 ml-4">
            <img
              src={honeyFooter}
              alt="Lontara Honey"
              className="w-full h-full object-contain drop-shadow-lg rounded-2xl shadow-amber-200/30"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6">
        {/* Top: logo + three columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 items-start">
          {/* Brand block */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe9c7] shadow-md ring-2 ring-honey-gold/80 dark:bg-honey-dark/60">
              <img
                src={logoLontara}
                alt="Lontara Honey logo"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-serif text-xl font-bold tracking-wide text-black dark:text-white">
                LONTARA <span className="text-honey-gold dark:text-honey-gold">HONEY</span>
              </h3>
              <p className="mt-1 text-sm text-[#5D4037]/90 dark:text-white/80 honey-script">
                Pure honey from the heart of Sulawesi
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="mb-4">
              <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold">
                Navigation
              </h4>
              <div className="mt-2 h-0.5 w-12 bg-honey-gold/60 dark:bg-honey-gold/50" />
            </div>
            <ul className="space-y-2 text-sm md:text-[0.85rem] text-[#2c1810] dark:text-white">
              <li onClick={() => scrollToSection('home')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Home</li>
              <li onClick={() => scrollToSection('products')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Products</li>
              <li onClick={() => scrollToSection('about')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">About</li>
              <li onClick={() => scrollToSection('story')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Our Story</li>
              <li onClick={() => scrollToSection('contact')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Contact</li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <div className="mb-4">
              <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold">
                Quick Link
              </h4>
              <div className="mt-2 h-0.5 w-12 bg-honey-gold/60 dark:bg-honey-gold/50" />
            </div>
            <ul className="space-y-2 text-sm md:text-[0.85rem] text-[#2c1810] dark:text-white">
              <li onClick={() => alert('FAQs coming soon!')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">FAQs</li>
              <li onClick={() => alert('Blog coming soon!')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Blog</li>
              <li onClick={() => openWhatsApp('I would like to book Lontara Honey products')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Booking</li>
              <li onClick={() => alert('Privacy Policy & Terms coming soon!')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Pages</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="mb-4">
              <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold">
                Services
              </h4>
              <div className="mt-2 h-0.5 w-12 bg-honey-gold/60 dark:bg-honey-gold/50" />
            </div>
            <ul className="space-y-2 text-sm md:text-[0.85rem] text-[#2c1810] dark:text-white">
              <li onClick={() => scrollToSection('products')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Premium Honey Supply</li>
              <li onClick={() => openWhatsApp('I am interested in wholesale Lontara Honey products')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Wholesale</li>
              <li onClick={() => scrollToSection('products')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Retail</li>
              <li onClick={() => scrollToSection('contact')} className="cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">Support</li>
            </ul>
          </div>
        </div>

        {/* Middle: contact info + social icons */}
        <div className="mt-12 pt-4 grid gap-8 md:grid-cols-4 md:items-center">
          {/* Contact row with icons: center under Navigation + Quick Link (cols 2-3) */}
          <div className="md:col-span-2 md:col-start-2 flex justify-center">
            <div className="flex flex-col gap-3 text-sm text-[#5D4037]/90 dark:text-white/80 md:flex-row md:items-center md:gap-10">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 cursor-pointer transition-colors hover:text-[#8B0000] dark:hover:text-[#D4A347]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-honey-gold/10 text-[#5D4037] dark:bg-yellow-300/15 dark:text-yellow-300/85 dark:border dark:border-yellow-300/50">
                    <item.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social icons row (under Services column, aligned with its text) */}
          <div className="flex items-center gap-2 md:gap-3 justify-start md:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center border border-honey-gold/40 rounded-full bg-transparent text-honey-gold transition-all hover:bg-honey-gold/10 hover:border-honey-gold/60 dark:border-yellow-300/60 dark:text-yellow-300 dark:hover:bg-yellow-200/20 dark:hover:border-yellow-200/80"
              >
                <social.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: separator + copyright */}
        <div className="mt-12 border-t border-honey-gold/30 pt-8 text-center dark:border-yellow-300/30">
          <p className="text-xs md:text-sm text-[#5D4037]/80 dark:text-white/70">
            © 2025 Lontara Honey. All Rights Reserved.
          </p>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.4em] text-[#d4b15f] dark:text-[#d4b15f]">
            Website by Northmad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
