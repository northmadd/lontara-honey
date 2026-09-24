import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, BadgeCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { reviews, type Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const PER_PAGE = 3;
const REVIEW_COUNT = reviews.length;
const DURATION = 260;

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
  const [start, setStart] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const visible = [0, 1, 2].map((i) => reviews[(start + i) % REVIEW_COUNT]);
  const end = Math.min(start + PER_PAGE, REVIEW_COUNT);

  const changePage = (dir: 'down' | 'up') => {
    if (animatingRef.current) return;
    const el = wrapperRef.current;
    if (!el) return;
    animatingRef.current = true;

    const out = (time: number, startTime: number, bias: number) => {
      const p = Math.min((time - startTime) / DURATION, 1);
      const k = easeInOutCubic(p);
      el.style.opacity = String(1 - k);
      el.style.transform = `translateY(${(-bias * k).toFixed(2)}px)`;
      if (p < 1) {
        requestAnimationFrame((t) => out(t, startTime, bias));
      } else {
        setStart((prev) => (dir === 'down' ? (prev + PER_PAGE) % REVIEW_COUNT : (prev - PER_PAGE + REVIEW_COUNT) % REVIEW_COUNT));
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const t2 = performance.now();
          const stepIn = (time: number, startTime: number) => {
            const q = Math.min((time - startTime) / DURATION, 1);
            const k2 = easeInOutCubic(q);
            el.style.opacity = String(k2);
            el.style.transform = `translateY(${(bias * (1 - k2)).toFixed(2)}px)`;
            if (q < 1) {
              requestAnimationFrame((tt) => stepIn(tt, startTime));
            } else {
              el.style.opacity = '';
              el.style.transform = '';
              animatingRef.current = false;
            }
          };
          requestAnimationFrame((tt) => stepIn(tt, t2));
        }));
      }
    };

    requestAnimationFrame((t) => out(t, performance.now(), dir === 'down' ? 36 : -36));
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
          {/* Image */}
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

          {/* Paged testimonials — 3 per view, JS-driven smooth animation */}
          <div className="relative flex items-center gap-4">
            <div className="flex-1">
              <div ref={wrapperRef} className="space-y-6 will-change-transform">
                {visible.map((review) => (
                  <ReviewCard key={review.name} review={review} />
                ))}
              </div>

              {/* Pager */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => changePage('up')}
                  aria-label="Previous testimonials"
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-honey-gold/50 text-honey-gold transition-colors duration-300 hover:bg-honey-gold hover:text-white active:scale-90"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <span className="min-w-[6.5rem] text-center text-sm font-semibold text-muted-foreground dark:text-white/80">
                  {start + 1}–{end} / {REVIEW_COUNT}
                </span>
                <button
                  type="button"
                  onClick={() => changePage('down')}
                  aria-label="Next testimonials"
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-honey-gold/50 text-honey-gold transition-colors duration-300 hover:bg-honey-gold hover:text-white active:scale-90"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;