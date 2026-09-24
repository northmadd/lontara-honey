import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, BadgeCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { reviews, type Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const REVIEW_COUNT = reviews.length;
const DURATION = 260;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface ReviewCardProps {
  review: Testimonial;
  featured?: boolean;
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

const ReviewCard: React.FC<ReviewCardProps> = ({ review, featured }) => {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'id';

  return (
    <article
      className={`honey-card p-5 sm:p-6 transition-shadow duration-300 ${
        featured
          ? 'p-6 sm:p-7 ring-2 ring-honey-gold/50 shadow-xl'
          : 'opacity-80 shadow-sm'
      }`}
    >
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

  const idx = (n: number) => ((n % REVIEW_COUNT) + REVIEW_COUNT) % REVIEW_COUNT;
  const top = reviews[idx(center - 1)];
  const mid = reviews[center];
  const bottom = reviews[idx(center + 1)];

  const move = (dir: 'down' | 'up') => {
    if (animatingRef.current) return;
    const el = middleRef.current;
    if (!el) return;
    animatingRef.current = true;

    const bias = dir === 'down' ? 44 : -44;
    const t0 = performance.now();

    const out = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);
      const k = easeInOutCubic(p);
      el.style.opacity = String(1 - k);
      el.style.transform = `translateY(${(-bias * k).toFixed(2)}px)`;
      if (p < 1) {
        requestAnimationFrame(out);
      } else {
        el.style.opacity = '0';
        el.style.transform = `translateY(${(-bias).toFixed(2)}px)`;
        setCenter((prev) => idx(dir === 'down' ? prev + 1 : prev - 1));
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const t1 = performance.now();
            const inn = (now2: number) => {
              const q = Math.min((now2 - t1) / DURATION, 1);
              const k2 = easeInOutCubic(q);
              el.style.opacity = String(k2);
              el.style.transform = `translateY(${(bias * (1 - k2)).toFixed(2)}px)`;
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

        {/* Image + cards equal height */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[340px] lg:h-auto">
            <img
              src={happyPeopleImage}
              alt={t('testimonials.imageAlt')}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-honey-dark/30 to-transparent" />
          </div>

          {/* Focused vertical carousel */}
          <div className="flex flex-col items-center gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => move('up')}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-honey-gold/50 bg-background text-honey-gold transition-colors duration-300 hover:bg-honey-gold hover:text-white active:scale-90"
            >
              <ChevronUp className="h-5 w-5" />
            </button>

            <div className="w-full flex-1 flex flex-col justify-center gap-3 lg:gap-4 min-h-0">
              {/* Top — small */}
              <div className="w-full max-w-md mx-auto scale-[0.96]">
                <ReviewCard review={top} />
              </div>

              {/* Middle — bigger, focus */}
              <div className="w-full max-w-md mx-auto z-10">
                <div ref={middleRef} className="will-change-transform scale-[1.05]">
                  <ReviewCard review={mid} featured />
                </div>
              </div>

              {/* Bottom — small */}
              <div className="w-full max-w-md mx-auto scale-[0.96]">
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