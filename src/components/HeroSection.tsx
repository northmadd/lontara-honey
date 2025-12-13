import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  heroImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, heroImage }) => {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Honey background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(var(--honey-gold)) 0%, transparent 70%)' }}
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 md:w-48 md:h-48 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, hsl(var(--honey-amber)) 0%, transparent 70%)' }}
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            className="mt-4 md:mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="honey-script">{t('hero.subtitle')}</span>
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === 'id' ? (
              <>
                <span>
                  Harta <span className="honey-text-gradient">Emas</span>
                </span>
                <br />
                <span>dari Alam</span>
              </>
            ) : (
              t('hero.title').split(' ').map((word, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="honey-text-gradient">{word}</span>
                  ) : (
                    word
                  )}{' '}
                </span>
              ))
            )}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === 'en' ? (
              <>
                Pure honey from Sulawesi's wild forests,
                <br className="hidden sm:block" />
                harvested with care by local beekeepers
                <br className="hidden sm:block" />
                and bottled fresh for your table.
              </>
            ) : (
              <>
                Madu murni dari hutan liar Sulawesi,
                <br className="hidden sm:block" />
                dipanen penuh hati oleh peternak lokal
                <br className="hidden sm:block" />
                dan dikemas segar untuk meja Anda.
              </>
            )}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-wrap sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="group honey-gradient text-white border-0 hover:opacity-90 transition-all duration-300 honey-glow"
              onClick={() => onNavigate('products')}
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold border-2 border-primary/30 hover:bg-primary/10"
              onClick={() => onNavigate('story')}
            >
              <Play className="mr-2 w-5 h-5" />
              {t('hero.learn')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: '100%', label: 'Pure Honey' },
              { value: '10+', label: 'Years' },
              { value: '5000+', label: 'Customers' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-serif font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
