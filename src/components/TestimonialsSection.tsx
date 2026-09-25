import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, BadgeCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { reviews, type Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const SLOT_COUNT = 5;
const REVIEW_COUNT = reviews.length;
const DURATION = 380;
const SPACING = 214;

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
  const [slotReviews, setSlotReviews] = useState<Testimonial[]>(() =>
    [...Array(SLOT_COUNT)].map((_, s) => reviews[idx(s - 2)]),
  );

  const centerIdxRef = useRef(0);
  const slotIdxRef = useRef<number[]>([...Array(SLOT_COUNT)].map((_, s) => idx(s - 2)));
  const baseRef = useRef<number[]>([-1, 0, 1, 2, 3]);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatingRef = useRef(false);

  const applyStyle = (slot: number, off: number) => {
    const el = elRefs.current[slot];
    if (!el) return;
    const d = Math.abs(off - 1);
    const scale = 1.05 - 0.13 * d;
    const opacity = Math.max(0, 1 - 0.55 * d);
    const blur = d * 1.8;
    el.style.transform = `translate(-50%, -50%) translateY(${(off * SPACING).toFixed(2)}px) scale(${scale.toFixed(3)})`;
    el.style.opacity = opacity.toFixed(3);
    el.style.zIndex = String(30 - Math.round(d) * 10);
    el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
  };

  useEffect(() => {
    baseRef.current.forEach((off, s) => applyStyle(s, off));
  }, []);

  const move = (dir: 'down' | 'up') => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const delta = dir === 'down' ? -1 : 1;
    const startBase = baseRef.current.slice();
    const t0 = performance.now();

    const step = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);
      const k = easeInOutCubic(p);
      for (let s = 0; s < SLOT_COUNT; s++) applyStyle(s, startBase[s] + delta * k);
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        finish();
      }
    };

    const finish = () => {
      const next = idx(dir === 'down' ? centerIdxRef.current + 1 : centerIdxRef.current - 1);
      centerIdxRef.current = next;

      if (dir === 'down') {
        slotIdxRef.current = [slotIdxRef.current[1], slotIdxRef.current[2], slotIdxRef.current[3], slotIdxRef.current[4], idx(next + 2)];
      } else {
        slotIdxRef.current = [idx(next - 2), slotIdxRef.current[0], slotIdxRef.current[1], slotIdxRef.current[2], slotIdxRef.current[3]];
      }

      baseRef.current = [-1, 0, 1, 2, 3];
      setSlotReviews(slotIdxRef.current.map((i) => reviews[i]));

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          baseRef.current.forEach((off, s) => applyStyle(s, off));
          animatingRef.current = false;
        }),
      );
    };

    requestAnimationFrame(step);
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

          {/* Wheel: 3 tampil, semua bergerak serempak */}
          <div className="flex flex-col items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => move('up')}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-honey-gold/50 bg-background text-honey-gold transition-colors duration-300 hover:bg-honey-gold hover:text-white active:scale-90"
            >
              <ChevronUp className="h-5 w-5" />
            </button>

            <div
              className="relative w-full overflow-hidden"
              style={{ height: SPACING * 3 + 140 }}
            >
              {slotReviews.map((review, s) => (
                <div
                  key={s}
                  ref={(el) => {
                    elRefs.current[s] = el;
                  }}
                  className="absolute left-1/2 top-1/2 w-full max-w-xl will-change-transform"
                >
                  <div className="mx-auto w-full">
                    <ReviewCard review={review} />
                  </div>
                </div>
              ))}
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