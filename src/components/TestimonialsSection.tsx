import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, BadgeCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { reviews, type Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const REVIEW_COUNT = reviews.length;
const DURATION = 300;

const idx = (n: number) => ((n % REVIEW_COUNT) + REVIEW_COUNT) % REVIEW_COUNT;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
    <article className="honey-card p-5 sm:p-6">
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
  const [center, setCenter] = useState(0);
  const middleRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const top = reviews[idx(center - 1)];
  const mid = reviews[center];
  const bottom = reviews[idx(center + 1)];

  const move = (dir: 'down' | 'up') => {
    if (animatingRef.current) return;
    const el = middleRef.current;
    if (!el) return;
    animatingRef.current = true;

    const bias = dir === 'down' ? 40 : -40;
    const t0 = performance.now();

    const out = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);
      const k = easeInOutCubic(p);
      const y = -bias * k;
      const s = 1.06 - 0.1 * k;
      el.style.opacity = String(1 - k);
      el.style.transform = `translateY(${y.toFixed(2)}px) scale(${s.toFixed(3)})`;
      if (p < 1) {
        requestAnimationFrame(out);
      } else {
        el.style.opacity = '0';
        el.style.transform = `translateY(${(-bias).toFixed(2)}px) scale(0.96)`;
        setCenter((prev) => idx(dir === 'down' ? prev + 1 : prev - 1));
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const t1 = performance.now();
            const inn = (now2: number) => {
              const q = Math.min((now2 - t1) / DURATION, 1);
              const k2 = easeInOutCubic(q);
              const y2 = bias * (1 - k2);
              const s2 = 0.96 + 0.1 * k2;
              el.style.opacity = String(k2);
              el.style.transform = `translateY(${y2.toFixed(2)}px) scale(${s2.toFixed(3)})`;
              if (q < 1) {
                requestAnimationFrame(inn);
              } else {
                el.style.opacity = '';
                el.style.transform = '';
                animatingRef.current = false;
              }
            };
            requestAnimationFrame(inn);
          }),
        );
      }
    };

    requestAnimationFrame(out);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-honey-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-honey-amber/10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="text-center mb-14">
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
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image — ukuran seperti semula */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={happyPeopleImage}
              alt={t('testimonials.imageAlt')}
              loading="lazy"
              decoding="async"
              className="w-full h-[420px] md:h-[460px] lg:h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-honey-dark/30 to-transparent" />
          </div>

          {/* 3 komentar: tengah fokus, atas & bawah blur */}
          <div className="flex flex-col items-center gap-4 lg:gap-5">
            <button
              type="button"
              onClick={() => move('up')}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-honey-gold/50 bg-background text-honey-gold transition-colors duration-300 hover:bg-honey-gold hover:text-white active:scale-90"
            >
              <ChevronUp className="h-5 w-5" />
            </button>

            <div className="w-full flex flex-col gap-4">
              {/* Blur atas */}
              <div className="w-full opacity-60 blur-[1.5px] scale-[0.97]">
                <ReviewCard review={top} />
              </div>

              {/* Fokus tengah */}
              <div className="w-full">
                <div ref={middleRef} className="will-change-transform scale-[1.06] shadow-lg">
                  <ReviewCard review={mid} />
                </div>
              </div>

              {/* Blur bawah */}
              <div className="w-full opacity-60 blur-[1.5px] scale-[0.97]">
                <ReviewCard review={bottom} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => move('down')}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-honey-gold/50 bg-background text-honey-gold transition-colors duration-300 hover:bg-honey-gold hover:text-white active:scale-90"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;