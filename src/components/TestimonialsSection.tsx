import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, BadgeCheck, X } from 'lucide-react';
import { reviews, ratingDistribution, EXTRA_REVIEWS, type Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AVATAR_COLORS = [
  'bg-amber-500',
  'bg-orange-600',
  'bg-yellow-600',
  'bg-amber-700',
  'bg-orange-700',
  'bg-amber-600',
  'bg-yellow-700',
  'bg-amber-800',
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 997;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function initials(name: string): string {
  const parts = name.replace(/\./g, ' ').trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

interface ReviewCardProps {
  review: Testimonial;
  index?: number;
  compact?: boolean;
}

const ReviewStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-honey-gold text-honey-gold' : 'fill-muted text-muted'}`}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, compact }: ReviewCardProps) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'id';

  return (
    <article className="honey-card p-5 break-inside-avoid mb-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <div
          className={`${avatarColor(review.name)} flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold`}
        >
          {initials(review.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground truncate">{review.name}</p>
          <p className="text-xs text-muted-foreground dark:text-white/80">
            {review.city[lang]} · {review.date[lang]}
          </p>
        </div>
        <Quote className="w-5 h-5 text-primary/20 shrink-0" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <ReviewStars rating={review.rating} />
        {!compact && (
          <span className="inline-flex items-center gap-1 rounded-full bg-honey-gold/15 px-2 py-0.5 text-[11px] font-semibold text-honey-gold">
            <BadgeCheck className="h-3 w-3" />
            <span className="hidden sm:inline">{language === 'en' ? 'Verified Purchase' : 'Pembelian Terverifikasi'}</span>
            <span className="sm:hidden">{language === 'en' ? 'Verified' : 'Terverifikasi'}</span>
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground dark:text-white/80">
        "{review.text[lang]}"
      </p>
    </article>
  );
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ happyPeopleImage }) => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = reviews.slice(0, 9);

  useEffect(() => {
    if (!showAll) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    const previousFocus = document.activeElement as HTMLElement | null;
    previousFocus?.blur();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAll(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAll]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-honey-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-honey-amber/10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            {t('testimonials.eyebrow')}
          </span>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4">
            {t('testimonials.title')}
          </h2>
          <p className="mt-2 text-muted-foreground dark:text-white/80 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Summary */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 items-stretch">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[260px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={happyPeopleImage}
              alt={t('testimonials.imageAlt')}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-honey-dark/70 via-honey-dark/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-honey-gold text-honey-gold" />
                ))}
              </div>
              <p className="mt-2 font-serif text-2xl md:text-3xl font-bold text-white">
                {t('testimonials.customers')}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-end gap-4">
              <span className="font-serif text-6xl font-bold text-foreground leading-none">4.9</span>
              <div className="pb-1">
                <ReviewStars rating={5} />
                <p className="mt-1 text-sm text-muted-foreground dark:text-white/80">
                  {t('testimonials.ratingFrom')}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {ratingDistribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-medium text-muted-foreground dark:text-white/80 shrink-0 text-right">
                    {row.stars}★
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full honey-gradient"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                    />
                  </div>
                  <span className="w-10 text-xs font-semibold text-foreground shrink-0">{row.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Masonry reviews */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        {/* See all */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-honey-gold/60 px-6 py-3 text-sm font-semibold text-honey-gold transition-all duration-300 hover:bg-honey-gold hover:text-white"
          >
            {t('testimonials.seeAll')}
          </button>
        </div>
      </div>

      {/* All reviews modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
              onClick={() => setShowAll(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.92, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 60 }}
              transition={{ type: 'spring', bounce: 0.22, duration: 0.7 }}
              role="dialog"
              aria-modal="true"
              aria-label={t('testimonials.allTitle')}
            >
              <button
                onClick={() => setShowAll(false)}
                aria-label={t('product.details.close')}
                className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="relative shrink-0 overflow-hidden honey-gradient-soft px-6 pt-8 pb-6 sm:px-10">
                <div className="absolute -top-14 -left-14 h-44 w-44 rounded-full bg-honey-gold/15 blur-3xl" />
                <div className="absolute -bottom-14 -right-10 h-48 w-48 rounded-full bg-honey-amber/15 blur-3xl" />
                <motion.h3
                  className="relative font-serif text-2xl sm:text-3xl font-bold text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                >
                  {t('testimonials.allTitle')}
                </motion.h3>
                <motion.p
                  className="relative mt-2 text-sm text-muted-foreground dark:text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  {t('testimonials.ratingFrom')}
                </motion.p>
              </div>

              {/* Scrollable list */}
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 bg-card">
                <div className="columns-1 sm:columns-2 gap-6">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.name}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.3 + index * 0.03, ease: EASE }}
                    >
                      <ReviewCard review={review} compact />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="text-center text-sm text-muted-foreground dark:text-white/80 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + reviews.length * 0.015 }}
                >
                  {t('testimonials.more').replace('{count}', EXTRA_REVIEWS)}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;