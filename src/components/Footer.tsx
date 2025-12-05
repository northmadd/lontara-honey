import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import honeyVisual from '@/assets/honey-visual.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/northmadd', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-honey-dark text-white py-16 relative overflow-hidden">
      {/* Decorative Honey Visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <img src={honeyVisual} alt="" className="w-64 h-64 object-contain" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-full honey-gradient flex items-center justify-center">
              <span className="text-2xl">🍯</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">LONTARA HONEY</h3>
              <p className="text-sm text-white/60">{t('footer.tagline')}</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center space-y-2">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Lontara Honey. {t('footer.rights')}.
          </p>
          <p className="text-xs text-white/30">
            Coding by <span className="text-honey-gold">northmad</span> — man of focus, commitment, and sheer will
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
