import React, { useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, Sparkles, Leaf, Droplets, Archive, ShoppingBag, Beaker, Weight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from './ProductsSection';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onOrder: (product: Product) => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SectionContent {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onOrder }) => {
  const { t, language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'id';
  const name = product.name[lang];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const previousFocus = document.activeElement as HTMLElement | null;
    previousFocus?.blur();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const formatPriceIDR = (price: number) =>
    new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  const formatPriceUSD = (price: number) => {
    const usdRate = 17757.4;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price / usdRate);
  };

  const sections: SectionContent[] = useMemo(() => {
    const d = product.details;
    return [
      {
        icon: Sparkles,
        title: t('product.details.description'),
        body: <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/80">{d.description[lang]}</p>,
      },
      {
        icon: Leaf,
        title: t('product.details.benefits'),
        body: (
          <ul className="space-y-2.5">
            {d.benefits[lang].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-honey-gold/15 text-honey-gold">
                  <Leaf className="h-3 w-3" />
                </span>
                <span className="text-sm text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        ),
      },
      {
        icon: Droplets,
        title: t('product.details.usage'),
        body: (
          <ul className="space-y-2.5">
            {d.usage[lang].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-honey-gold/15 text-honey-gold">
                  <Droplets className="h-3 w-3" />
                </span>
                <span className="text-sm text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        ),
      },
      {
        icon: Archive,
        title: t('product.details.storage'),
        body: <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/80">{d.storage[lang]}</p>,
      },
    ];
  }, [product, lang, t]);

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: EASE },
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[94vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.92, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 60 }}
          transition={{ type: 'spring', bounce: 0.22, duration: 0.7 }}
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label={t('product.details.close')}
            className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Hero image — slowly enlarges on open */}
          <div className="relative shrink-0 h-60 sm:h-72 overflow-hidden honey-gradient-soft">
            <motion.div
              className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-honey-gold/15 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
            <motion.div
              className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-honey-amber/15 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            <motion.img
              src={product.image}
              alt={name}
              decoding="async"
              className="relative h-full w-full object-contain p-8 drop-shadow-lg"
              initial={{ scale: 0.5, opacity: 0.3, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 0.15 }}
            />
          </div>

          {/* Scrollable content */}
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 bg-card">
            {/* Name */}
            <motion.h3
              className="font-serif text-2xl sm:text-3xl font-bold text-foreground"
              variants={fadeUp(0.5)}
              initial="hidden"
              animate="visible"
            >
              {name}
            </motion.h3>

            {/* Price + weight */}
            <motion.div
              className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2"
              variants={fadeUp(0.62)}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-honey-gold/10 px-3 py-1 text-xs font-semibold text-honey-gold">
                <Weight className="h-3.5 w-3.5" />
                {product.weight}
              </span>
              <span className="text-xl font-bold text-honey-gold">{formatPriceIDR(product.price)}</span>
              <span className="text-border font-medium">|</span>
              <span className="text-xl font-bold text-honey-gold">{formatPriceUSD(product.price)}</span>
            </motion.div>

            {/* Info sections */}
            <div className="mt-7 space-y-7">
              {sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  variants={fadeUp(0.74 + index * 0.12)}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-honey-gold/15 text-honey-gold">
                      <section.icon className="h-4 w-4" />
                    </span>
                    <h4 className="font-serif text-base font-semibold text-foreground">{section.title}</h4>
                    <div className="h-px flex-1 bg-honey-gold/30" />
                  </div>
                  {section.body}
                </motion.section>
              ))}
            </div>

            {/* Order button */}
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              variants={fadeUp(1.15)}
              initial="hidden"
              animate="visible"
            >
              <Button
                onClick={() => onOrder(product)}
                variant="honey"
                size="lg"
                className="flex-1"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {t('products.order')}
              </Button>
              <Button onClick={onClose} variant="outline" size="lg" className="flex-1">
                <Info className="h-4 w-4 mr-2" />
                {t('product.details.close')}
              </Button>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 dark:text-white/60"
              variants={fadeUp(1.3)}
              initial="hidden"
              animate="visible"
            >
              <Beaker className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {t('product.details.disclaimer')}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;