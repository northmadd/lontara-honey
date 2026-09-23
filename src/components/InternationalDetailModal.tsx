import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, Phone, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface InternationalItem {
  name: { id: string; en: string };
  description: { id: string; en: string };
}

interface InternationalDetailModalProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: InternationalItem[];
  onClose: () => void;
  showWhatsApp?: boolean;
}

const WHATSAPP_NUMBER = '6282347905543';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const InternationalDetailModal: React.FC<InternationalDetailModalProps> = ({ title, icon: Icon, items, onClose, showWhatsApp = true }) => {
  const { t, language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'id';

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    const previousFocus = document.activeElement as HTMLElement | null;
    previousFocus?.blur();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: EASE },
    },
  });

  const openWhatsApp = () => {
    const message = encodeURIComponent(t('contact.wa.message'));
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.92, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 60 }}
          transition={{ type: 'spring', bounce: 0.22, duration: 0.7 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button
            onClick={onClose}
            aria-label={t('product.details.close')}
            className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="relative shrink-0 overflow-hidden honey-gradient-soft px-6 pt-8 pb-6 sm:px-10">
            <motion.div
              className="absolute -top-14 -left-14 h-44 w-44 rounded-full bg-honey-gold/15 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.4 }}
            />
            <motion.div
              className="absolute -bottom-14 -right-10 h-48 w-48 rounded-full bg-honey-amber/15 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.55 }}
            />
            <motion.div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl honey-gradient text-white shadow-lg honey-glow"
              initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.15 }}
            >
              <Icon className="h-7 w-7" />
            </motion.div>
            <motion.h3
              className="relative mt-4 font-serif text-2xl sm:text-3xl font-bold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              {title}
            </motion.h3>
            <motion.div
              className="relative mt-3 h-px w-16 bg-honey-gold/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            />
            <motion.p
              className="relative mt-3 text-sm font-medium text-honey-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {items.length} {t('international.details.item')}
            </motion.p>
          </div>

          {/* Items */}
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 bg-card">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.name[lang]}
                  className="flex items-start gap-3.5 rounded-2xl border border-border bg-muted/40 p-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.55 + index * 0.12, ease: EASE }}
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-honey-gold/15 text-honey-gold">
                    <BadgeCheck className="shrink-0 text-honey-gold" style={{ width: 18, height: 18 }} />
                  </span>
                  <div>
                    <p className="font-bold text-foreground">{item.name[lang]}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground dark:text-white/80">
                      {item.description[lang]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              variants={fadeUp(0.55 + items.length * 0.12 + 0.1)}
              initial="hidden"
              animate="visible"
            >
              {showWhatsApp && (
                <Button onClick={openWhatsApp} variant="honey" size="lg" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  {t('contact.whatsapp')}
                </Button>
              )}
              <Button onClick={onClose} variant="outline" size="lg" className="flex-1">
                {t('product.details.close')}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InternationalDetailModal;