import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Award, Leaf, MapPin } from 'lucide-react';

interface AboutSectionProps {
  aboutImage: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutImage }) => {
  const { t } = useLanguage();

  const features = [
    { icon: Award, titleKey: 'about.quality', descKey: 'about.quality.desc' },
    { icon: Leaf, titleKey: 'about.sustainable', descKey: 'about.sustainable.desc' },
    { icon: MapPin, titleKey: 'about.authentic', descKey: 'about.authentic.desc' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={aboutImage}
                alt="About Lontara Honey"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-honey-gold/20 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-honey-amber/20 blur-3xl" />
            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 honey-gradient rounded-2xl flex items-center justify-center shadow-xl z-20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span className="text-5xl">🐝</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              {t('about.title')}
            </span>
            <div className="mt-3 h-px w-24 bg-honey-gold/70" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6">
              {t('about.subtitle')}
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            {/* Features */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="honey-card p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl honey-gradient flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(feature.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
