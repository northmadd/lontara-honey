import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import honeyVisual from '@/assets/honey-visual.png';

interface StorySectionProps {
  storyImages: string[];
}

const StorySection: React.FC<StorySectionProps> = ({ storyImages }) => {
  const { t, language } = useLanguage();

  const chapters = [
    { titleKey: 'story.chapter1.title', textKey: 'story.chapter1.text', image: storyImages[0] },
    { titleKey: 'story.chapter2.title', textKey: 'story.chapter2.text', image: storyImages[1] },
    { titleKey: 'story.chapter3.title', textKey: 'story.chapter3.text', image: storyImages[2] },
    { titleKey: 'story.chapter4.title', textKey: 'story.chapter4.text', image: storyImages[3] },
  ];

  return (
    <section className="py-24 bg-gradient-to-tl from-honey-amber/10 via-honey-cream to-honey-light/20 overflow-hidden relative">
      {/* Decorative Honey Visual */}
      <div className="absolute right-10 top-40 opacity-10 pointer-events-none hidden lg:block">
        <img src={honeyVisual} alt="" className="w-72 h-72 object-contain" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            {t('story.title')}
          </span>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 whitespace-pre-line">
            {(() => {
              const subtitle = t('story.subtitle');
              if (language === 'en') {
                const parts = subtitle.split(' to ');
                if (parts.length === 2) {
                  return `${parts[0]}\nto ${parts[1]}`;
                }
                return subtitle;
              }
              const parts = subtitle.split(' ke ');
              if (parts.length === 2) {
                return `${parts[0]}\nke ${parts[1]}`;
              }
              return subtitle;
            })()}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2" />

          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              className={`relative mb-16 lg:mb-24 ${
                index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%]'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Timeline dot */}
              <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2">
                <div className="w-4 h-4 rounded-full honey-gradient honey-glow" />
              </div>

              <div className={`lg:flex gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Image */}
                <motion.div
                  className={`lg:w-1/2 mb-6 lg:mb-0 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={chapter.image}
                      alt={t(chapter.titleKey)}
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-honey-dark/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-honey-gold/90 text-sm font-medium text-honey-dark">
                        Chapter {index + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div
                  className={`lg:w-1/2 ${
                    index % 2 === 0
                      ? 'lg:text-right lg:pr-10'
                      : 'lg:text-left lg:pl-10'
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                    {t(chapter.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(chapter.textKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
