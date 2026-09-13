import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import logoLontara from '@/assets/logo-lontara.webp';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'products', label: t('nav.products') },
    { key: 'about', label: t('nav.about') },
    { key: 'story', label: t('nav.story') },
    { key: 'international', label: t('nav.international') },
    { key: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-md shadow-[0_8px_30px_hsl(24_32%_12%/0.06)]'
            : 'bg-transparent'
        }`}
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <img
                src={logoLontara}
                alt="Lontara Honey logo"
                decoding="async"
                className="w-10 h-10 object-contain"
              />

              <span className="font-serif max-[379px]:text-lg text-xl font-bold text-foreground block max-[379px]:leading-tight leading-tight text-left min-[380px]:whitespace-nowrap">
                LONTARA
                <br className="min-[380px]:hidden" />{' '}
                <span className="text-honey-gold">HONEY</span>
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden min-[1080px]:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`nav-link text-sm font-medium uppercase tracking-wider ${
                    activeSection === item.key
                      ? 'text-primary nav-link-active'
                      : ''
                  }`}
                >
                  <span className="nav-link-label">{item.label}</span>
                  <span className="nav-link-line" aria-hidden="true" />
                </button>
              ))}
            </div>

            {/* Language Toggle, Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* Language Toggle */}
              <button
                onClick={() =>
                  setLanguage(language === 'en' ? 'id' : 'en')
                }
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>

              {/* Desktop Theme Toggle */}
              <button
                onClick={() =>
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }
                className="hidden min-[1080px]:inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="min-[1080px]:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                onClick={() =>
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 min-[1080px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Card */}
            <motion.div
              className="absolute top-20 left-4 right-4 bg-card rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                type: 'spring',
                bounce: 0.3,
              }}
            >
              <div className="p-6 space-y-2">

                {/* Navigation Items */}
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      activeSection === item.key
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                    }`}
                    initial={{
                      x: -20,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Dark Mode Toggle for Mobile */}
                <motion.div
                  className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-secondary/50"
                  initial={{
                    x: -20,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: navItems.length * 0.1,
                  }}
                >
                  <span className="text-lg font-medium">
                    {theme === 'dark'
                      ? 'Dark Mode'
                      : 'Light Mode'}
                  </span>

                  {/* Theme Toggle */}
                  <button
                    type="button"
                    onClick={() =>
                      setTheme(
                        theme === 'dark' ? 'light' : 'dark'
                      )
                    }
                    aria-label="Toggle theme"
                    className="relative h-11 w-[132px] shrink-0 rounded-full border border-border/70 bg-secondary/70 overflow-hidden"
                  >
                    {/* Sliding Circle */}
                    {/* Sliding Circle */}
                    <span className="absolute left-[4px] top-1/2 z-0 h-8 w-8 -translate-y-1/2">
                      <motion.span
                        className="block h-full w-full rounded-full bg-background shadow-md"
                        animate={{
                          x: theme === 'dark' ? 88 : 0,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 24,
                          mass: 0.7,
                        }}
                      />
                    </span>

                    {/* Sun Icon */}
                    <span className="absolute inset-y-0 left-[4px] z-10 flex w-8 items-center justify-center pointer-events-none">
                      <Sun
                        className={`h-4 w-4 transition-colors duration-300 ${
                          theme === 'light'
                            ? 'text-amber-500'
                            : 'text-foreground/55'
                        }`}
                      />
                    </span>

                    {/* Moon Icon */}
                    <span className="absolute inset-y-0 right-[4px] z-10 flex w-8 items-center justify-center pointer-events-none">
                      <Moon
                        className={`h-4 w-4 transition-colors duration-300 ${
                          theme === 'dark'
                            ? 'text-primary'
                            : 'text-foreground/55'
                        }`}
                      />
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
