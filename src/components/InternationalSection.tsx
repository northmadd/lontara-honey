import { BadgeCheck, CreditCard, Globe2, RotateCcw, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const InternationalSection = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Truck,
      titleKey: 'international.card1.title',
      textKey: 'international.card1.text',
    },
    {
      icon: CreditCard,
      titleKey: 'international.card2.title',
      textKey: 'international.card2.text',
    },
    {
      icon: BadgeCheck,
      titleKey: 'international.card3.title',
      textKey: 'international.card3.text',
    },
    {
      icon: RotateCcw,
      titleKey: 'international.card4.title',
      textKey: 'international.card4.text',
    },
  ];

  return (
    <section id="international" className="bg-muted py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-honey-gold">
            {t('international.eyebrow')}
          </p>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground">
            {t('international.title')}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-white/80">
            {t('international.description')}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.titleKey}
              className="honey-card p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <card.icon className="h-7 w-7 text-honey-amber" />
              <h3 className="mt-4 font-bold text-honey-gold">{t(card.titleKey)}</h3>
              <div className="mt-2 h-0.5 w-12 bg-honey-gold/60" />
              <p className="mt-3 text-sm text-muted-foreground dark:text-white/80">{t(card.textKey)}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-white/80">
          <Globe2 className="h-4 w-4" />
          {t('international.footer')}
        </div>
      </div>
    </section>
  );
};

export default InternationalSection;
