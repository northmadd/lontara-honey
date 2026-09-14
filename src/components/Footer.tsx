import React from 'react';
import { Instagram, PlayCircle, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import logoLontara from '@/assets/logo-lontara.webp';
import honeyFooter from '@/assets/honey-footer.webp';
import sceneVideoMp4 from '@/assets/scene.mp4';
import sceneVideoWebm from '@/assets/scene.webm';
import { Link } from 'react-router-dom';

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
      href: 'https://www.google.com/maps/search/?api=1&query=South+Sulawesi+Indonesia',
    },
    {
      icon: Phone,
      label: '+62 823 4790 5543',
      href: 'tel:+6282347905543',
    },
    {
      icon: Mail,
      label: 'lontarajayanusantara@',
      href: 'mailto:lontarajayanusantara@gmail.com',
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/maduhutanlontara', label: 'Instagram' },
    { icon: PlayCircle, href: 'https://tiktok.com/@maduhutanlontara', label: 'TikTok' },
    { icon: Youtube, href: 'https://youtube.com/@rajamadusulawesi7380', label: 'YouTube' },
  ];

  return (
    <>
      <style>{`
        .northmad-credit {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 6px;
          line-height: 1;
        }

        .northmad-line {
          position: relative;
          display: block;
          width: fit-content;
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c87f2a;
          isolation: isolate;
        }

        .northmad-name {
          margin-top: 7px;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: 0.24em;
          background: linear-gradient(
            105deg,
            #8b5a1b 0%,
            #d4a056 28%,
            #ffe0a3 46%,
            #d4a056 56%,
            #a86b24 78%,
            #d4a056 100%
          );
          background-size: 320% 100%;
          background-position: 210% center;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 12px rgba(212, 160, 86, 0.3), 0 0 26px rgba(139, 90, 27, 0.24);
          will-change: background-position, filter;
          animation: northmad-shimmer 2.4s ease-in-out infinite, northmad-glow 3s ease-in-out infinite alternate !important;
        }

        .northmad-line::after {
          display: none;
        }

        .northmad-name::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          display: block;
          color: rgba(212, 160, 86, 0.24);
          -webkit-text-fill-color: rgba(212, 160, 86, 0.22);
          opacity: 0.38;
          filter: blur(0.45px);
          animation: northmad-flash 2.4s ease-in-out infinite !important;
          pointer-events: none;
        }

        @keyframes northmad-shimmer {
          0% {
            background-position: 210% center;
          }

          100% {
            background-position: -110% center;
          }
        }

        @keyframes northmad-glow {
          0% {
            filter: drop-shadow(0 0 2px rgba(212, 160, 86, 0.18));
          }

          100% {
            filter: drop-shadow(0 0 12px rgba(212, 160, 86, 0.42));
          }
        }

        @keyframes northmad-flash {
          0%, 100% {
            opacity: 0.18;
          }

          50% {
            opacity: 0.48;
          }
        }

        @keyframes northmad-line-glow {
          0%, 100% {
            opacity: 0.85;
            filter: drop-shadow(0 0 3px rgba(232, 168, 60, 0.5));
          }

          50% {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(232, 168, 60, 0.95));
          }
        }

        @media (max-width: 480px) {
          .northmad-line {
            font-size: 11px;
            letter-spacing: 0.23em;
          }

          .northmad-name {
            font-size: 16px;
            letter-spacing: 0.19em;
          }
        }

        .northmad-video {
          display: block;
          width: 200px;
          height: auto;
          margin: -40px auto -14px;
          background: transparent !important;
          border: 0;
          outline: 0;
        }

        html.dark .northmad-video {
          mix-blend-mode: screen;
          isolation: isolate;
        }

        html:not(.dark) .northmad-video {
          filter: url(#northmad-key);
        }

      `}</style>
      <footer className="bg-background text-foreground border-t border-border dark:from-[#1a120d] dark:bg-gradient-to-br dark:via-[#2a1c0f]/80 dark:to-[#3c2414]/60 dark:text-white pt-8 pb-0 md:pt-16 md:pb-0 relative overflow-hidden">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <filter id="northmad-key" colorInterpolationFilters="sRGB">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0.2126 0.7152 0.0722 0 0"
              result="keyAlpha"
            />
            <feComposite in="SourceGraphic" in2="keyAlpha" operator="in" />
          </filter>
        </defs>
      </svg>
      {/* Large Honey Image — HANYA untuk desktop >=1250px (4 kolom layout, floating kanan bawah) */}
      <div className="absolute bottom-48 right-3 hidden w-full pointer-events-none z-0 min-[1250px]:block">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative h-64 w-64 ml-4">
            <img
              src={honeyFooter}
              alt="Lontara Honey"
              className="w-full h-full object-contain drop-shadow-lg rounded-2xl shadow-amber-200/30"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6">
        {/*
          RESPONSIVE GRID LAYOUT:
          - < 768px      : 1 kolom (semua vertikal)
          - 768-1249px   : 2 kolom seimbang (col1=Brand+Kontak+Sosmed, col2=Nav+QuickLink+Services)
          - >= 1250px    : 4 kolom penuh desktop
        */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 md:items-stretch min-[1250px]:grid-cols-4 min-[1250px]:items-start items-start">
          {/* ===== KOLOM 1: Brand [+ Kontak + Sosmed (hanya untuk 768-1249px)] ===== */}
          <div className="space-y-6 relative z-10 md:flex md:flex-col">
            {/* Brand block */}
            <div className="flex items-start gap-3">
              <img
                src={logoLontara}
                alt="Lontara Honey logo"
                loading="lazy"
                decoding="async"
                className="h-16 w-16 object-contain"
              />
              <div>
                <h3 className="font-serif text-xl font-bold tracking-wide text-foreground">
                  LONTARA <span className="text-honey-gold dark:text-honey-gold">HONEY</span>
                </h3>
                <p className="mt-1 text-sm font-medium text-foreground/90 dark:text-white italic font-serif leading-snug">
                  Pure honey from the heart of<br/>Sulawesi
                </p>
              </div>
            </div>

            {/* Honey Image — SELURUH <1250px: mobile & mid-range, UKURAN RESPONSIF, mobile(<768)=diberi space kiri + auto kanan, 768+=kiri sejajar logo */}
            <div className="block min-[1250px]:hidden relative z-0 ml-6 mr-auto md:mx-0 md:ml-0 -mt-1 md:-mt-2">
              <div className="h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72">
                <img
                  src={honeyFooter}
                  alt="Lontara Honey"
                  className="w-full h-full object-contain drop-shadow-[0_12px_32px_hsl(35_100%_50%/0.25)]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Contact info - HANYA untuk 768-1249px (disembunyikan <768 dan >=1250) */}
            <div className="hidden md:block min-[1250px]:hidden ml-[76px]">
              <div className="flex flex-col gap-4 text-sm text-muted-foreground dark:text-white/80">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-2 transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-honey-gold/10 text-honey-amber dark:bg-yellow-300/15 dark:text-yellow-300/85 dark:border dark:border-yellow-300/50">
                      <item.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="whitespace-nowrap underline-offset-4 group-hover:underline">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social icons - HANYA untuk 768-1249px — md:mt-auto mendorong ke bawah agar SEJAJAR dengan "Support" di kolom kanan */}
            <div className="hidden md:flex min-[1250px]:hidden items-center gap-4 ml-[76px] md:mt-auto md:pt-4">
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

          {/* ===== KOLOM 2-4: Nav + Quick Link + Services ===== */}
          {/* Di 768-1249px: wrapper ini = col 2, isinya vertikal 3 section */}
          {/* Di >=1250px: wrapper hilang (contents), tiap section jadi col 2,3,4 dari grid induk */}
          <div className="grid grid-cols-1 gap-6 min-[1250px]:contents">
            {/* Navigation */}
            <div>
              <div className="mb-4">
                <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold">
                  Navigation
                </h4>
                <div className="mt-2 h-0.5 w-12 bg-honey-gold/60 dark:bg-honey-gold/50" />
              </div>
              <ul className="space-y-2 text-sm md:text-[0.85rem] text-foreground">
                <li onClick={() => scrollToSection('home')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Home</li>
                <li onClick={() => scrollToSection('products')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Products</li>
                <li onClick={() => scrollToSection('about')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">About</li>
                <li onClick={() => scrollToSection('story')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Our Story</li>
                <li onClick={() => scrollToSection('contact')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Contact</li>
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
              <ul className="space-y-2 text-sm md:text-[0.85rem] text-foreground">
                <li><Link to="/legal/faq" className="transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">FAQs</Link></li>
                <li onClick={() => alert('Blog coming soon!')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Blog</li>
                <li onClick={() => openWhatsApp('I would like to book Lontara Honey products')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Booking</li>
                <li><Link to="/legal/privacy" className="transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Privacy Policy</Link></li>
                <li><Link to="/legal/terms" className="transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Terms & Conditions</Link></li>
                <li><Link to="/legal/shipping" className="transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Shipping Policy</Link></li>
                <li><Link to="/legal/refund" className="transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Refund Policy</Link></li>
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
              <ul className="space-y-2 text-sm md:text-[0.85rem] text-foreground">
                <li onClick={() => scrollToSection('products')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Premium Honey Supply</li>
                <li onClick={() => openWhatsApp('I am interested in wholesale Lontara Honey products')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Wholesale</li>
                <li onClick={() => scrollToSection('products')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Retail</li>
                <li onClick={() => scrollToSection('contact')} className="cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]">Support</li>
              </ul>
            </div>
          </div>
        </div>

        {/*
          BAGIAN BAWAH: Contact + Social
          - < 768px      : tampil 1 kolom (mobile)
          - 768-1249px   : DISembunyikan (sudah ada di kolom 1 atas)
          - >= 1250px    : tampil sebagai row terpisah dengan 4-col grid
        */}
        <div className="mt-6 grid gap-6 md:hidden min-[1250px]:grid min-[1250px]:mt-12 min-[1250px]:grid-cols-4 min-[1250px]:items-center min-[1250px]:gap-8 min-[1250px]:pt-4">
          {/* Contact row (untuk mobile & >=1250px desktop) */}
          <div className="flex justify-start min-[1250px]:col-span-2 min-[1250px]:col-start-2 min-[1250px]:justify-center">
            <div className="flex flex-col gap-4 text-sm text-muted-foreground dark:text-white/80 min-[1250px]:flex-row min-[1250px]:items-center min-[1250px]:gap-10">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-honey-gold/10 text-honey-amber dark:bg-yellow-300/15 dark:text-yellow-300/85 dark:border dark:border-yellow-300/50">
                    <item.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="whitespace-nowrap underline-offset-4 group-hover:underline">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social icons (untuk mobile & >=1250px desktop) */}
          <div className="flex items-center gap-4 justify-start mt-2 min-[1250px]:mt-0 min-[1250px]:gap-3">
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
        <div className="mt-4 border-t border-honey-gold/30 pt-2 text-center md:mt-6 md:pt-4 dark:border-yellow-300/30">
          <p className="text-xs md:text-sm text-muted-foreground dark:text-white/80">
            © 2026 Lontara Honey. All Rights Reserved.
          </p>
          <a
            href="https://www.instagram.com/northmadd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Northmad Instagram"
            className="northmad-credit block transition-opacity duration-300 hover:opacity-80"
          >
            <span className="northmad-line" data-text="WEBSITE BY">
              WEBSITE BY
            </span>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="northmad-video select-none pointer-events-none"
              aria-label="Northmad"
            >
              <source src={sceneVideoWebm} type="video/webm" />
              <source src={sceneVideoMp4} type="video/mp4" />
            </video>
          </a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
