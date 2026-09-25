import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Award, Leaf, MapPin, ArrowRight } from 'lucide-react';
import beeImage from '@/assets/lebah.webp';
import InternationalDetailModal, { InternationalItem } from '@/components/InternationalDetailModal';

interface AboutSectionProps {
  aboutImage: string;
}

interface FeatureData {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descKey: string;
  items: InternationalItem[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutImage }) => {
  const { t } = useLanguage();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features: FeatureData[] = [
    {
      icon: Award,
      titleKey: 'about.quality',
      descKey: 'about.quality.desc',
      items: [
        {
          name: { id: 'Kualitas Premium', en: 'Premium Quality' },
          description: {
            id: 'Madu kami 100% murni tanpa campuran apa pun — dipanen dari hutan, tidak dipanaskan, dan tidak diproses berlebihan agar enzim, vitamin, dan rasa alaminya terjaga utuh sampai ke meja Anda.',
            en: 'Our honey is 100% pure with no additives — harvested from the forest, never heated, and minimally processed so its natural enzymes, vitamins, and flavor stay intact until it reaches your table.',
          },
        },
      ],
    },
    {
      icon: Leaf,
      titleKey: 'about.sustainable',
      descKey: 'about.sustainable.desc',
      items: [
        {
          name: { id: 'Berkelanjutan', en: 'Sustainable' },
          description: {
            id: 'Pemanenan dilakukan dengan cara ramah lingkungan: hanya mengambil madu secukupnya, menjaga koloni lebah tetap sehat, dan melindungi hutan Sulawesi tempat mereka bersarang agar tetap lestari.',
            en: 'Harvesting is done in an eco-friendly way: taking only what is needed, keeping the bee colonies healthy, and protecting the Sulawesi forests they nest in so they stay sustainable for generations.',
          },
        },
      ],
    },
    {
      icon: MapPin,
      titleKey: 'about.authentic',
      descKey: 'about.authentic.desc',
      items: [
        {
          name: { id: 'Autentik', en: 'Authentic' },
          description: {
            id: 'Madu diambil langsung dari sarang lebah liar di hutan Sulawesi tanpa perantara, sehingga keaslian dan kualitasnya terjamin dari hutan langsung ke tangan Anda.',
            en: 'Honey is sourced straight from wild beehives in the forests of Sulawesi with no middlemen, guaranteeing authenticity and quality from the forest directly to your hands.',
          },
        },
      ],
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
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
                alt={t('about.imageAlt')}
                loading="lazy"
                decoding="async"
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
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
              <img
                src={beeImage}
                alt={t('about.beeAlt')}
                loading="lazy"
                decoding="async"
                className="h-24 w-24 object-contain"
              />
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
            
            <div className="space-y-4 text-muted-foreground dark:text-white/80 leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            {/* Features */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="honey-card p-5 cursor-pointer group flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedFeature(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedFeature(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${t(feature.titleKey)} - ${t('international.details.view')}`}
                >
                  <div className="w-12 h-12 rounded-xl honey-gradient flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-white/80">
                    {t(feature.descKey)}
                  </p>
                  <div className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-honey-gold opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    {t('international.details.view')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {selectedFeature !== null && (
        <InternationalDetailModal
          title={t(features[selectedFeature].titleKey)}
          icon={features[selectedFeature].icon}
          items={features[selectedFeature].items}
          onClose={() => setSelectedFeature(null)}
          showWhatsApp={false}
        />
      )}
    </section>
  );
};

export default AboutSection;
