import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';
import { reviews, type Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const AUTO_SPEED = 26;

interface ReviewCardProps {
  review: Testimonial;
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

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'id';

  return (
    <article className="honey-card p-5 sm:p-6 relative shrink-0">
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
        <ReviewStars rating={review.rating} />
        <span className="inline-flex items-center gap-1 rounded-full bg-honey-gold/15 px-2 py-0.5 text-[11px] font-semibold text-honey-gold">
          <BadgeCheck className="h-3 w-3" />
          <span className="hidden sm:inline">{language === 'en' ? 'Verified Purchase' : 'Pembelian Terverifikasi'}</span>
          <span className="sm:hidden">{language === 'en' ? 'Verified' : 'Terverifikasi'}</span>
        </span>
      </div>

      <p className="text-foreground italic leading-relaxed">"{review.text[lang]}"</p>

      <div className="mt-4">
        <p className="font-semibold text-foreground">{review.name}</p>
        <p className="text-sm text-muted-foreground dark:text-white/80">
          {review.city[lang]} · {review.date[lang]}
        </p>
      </div>
    </article>
  );
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ happyPeopleImage }) => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const idleTimerRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);

  const pauseAuto = (ms = 2500) => {
    pausedRef.current = true;
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, ms);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    const tick = (time: number) => {
      const dt = Math.min((time - lastFrameRef.current) / 1000, 0.1);
      if (!pausedRef.current) {
        const half = el.scrollHeight / 2;
        el.scrollTop += AUTO_SPEED * dt;
        if (el.scrollTop >= half) el.scrollTop = 0;
        if (el.scrollTop < 0) el.scrollTop = 0;
      }
      lastFrameRef.current = time;
      raf = requestAnimationFrame(tick);
    };
    lastFrameRef.current = performance.now();
    raf = requestAnimationFrame(tick);

    let startY: number | null = null;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      pausedRef.current = true;
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (startY === null) return;
      e.preventDefault();
      const delta = startY - e.touches[0].clientY;
      startY = e.touches[0].clientY;
      el.scrollTop += delta;
      if (el.scrollTop < 0) el.scrollTop = 0;
      if (el.scrollTop > el.scrollHeight - el.clientHeight) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }
    };
    const handleTouchEnd = () => {
      startY = null;
      idleTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, 1500);
    };
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

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

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
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
              className="w-full h-[360px] md:h-[440px] lg:h-[540px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-honey-dark/30 to-transparent" />
          </motion.div>

          {/* Infinite vertical marquee — 3 cards visible */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Edge fade masks */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-10 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-10 bg-gradient-to-t from-background to-transparent" />

            {/* Scroll hint */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-1 text-honey-gold">
              <div className="h-10 w-1 rounded-full bg-honey-gold/30 overflow-hidden">
                <div className="h-1/2 w-full rounded-full bg-honey-gold animate-scroll-dot" />
              </div>
            </div>

            <div
              ref={scrollRef}
              onMouseEnter={() => {
                pausedRef.current = true;
              }}
              onMouseLeave={() => {
                pausedRef.current = false;
              }}
              onWheel={(e) => {
                const el = scrollRef.current;
                if (el) {
                  el.scrollTop += e.deltaY;
                  if (el.scrollTop < 0) el.scrollTop = 0;
                  const max = el.scrollHeight - el.clientHeight;
                  if (el.scrollTop > max) el.scrollTop = max;
                }
                pauseAuto();
              }}
              className="h-[420px] sm:h-[470px] lg:h-[540px] overflow-y-scroll rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              <div className="space-y-6">
                {[...reviews, ...reviews].map((review, index) => (
                  <ReviewCard key={`${review.name}-${index}`} review={review} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;