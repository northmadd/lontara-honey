import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, BadgeCheck, ChevronUp, ChevronDown, PenLine, X } from 'lucide-react';
import { reviews, type Testimonial } from '@/data/testimonials';
import { listComments, addComment } from '@/lib/comments';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const SLOT_COUNT = 5;
const DURATION = 380;
const SPACING = 214;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface ReviewCardProps {
  review: Testimonial;
}

const ReviewStars = ({ rating, size = 'w-4 h-4' }: { rating: number; size?: string }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${size} ${i < rating ? 'fill-honey-gold text-honey-gold' : 'fill-muted text-muted'}`}
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
          {review.city && review.city[lang] ? `${review.city[lang]} · ` : ''}
          {review.date[lang]}
        </p>
      </div>
    </article>
  );
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ happyPeopleImage }) => {
  const { t } = useLanguage();
  const [items, setItems] = useState<Testimonial[]>(reviews);
  const [slotReviews, setSlotReviews] = useState<Testimonial[]>(() =>
    [...Array(SLOT_COUNT)].map((_, s) => reviews[((s - 2) % reviews.length + reviews.length) % reviews.length]),
  );
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const itemsRef = useRef(items);
  const centerIdxRef = useRef(0);
  const slotIdxRef = useRef<number[]>([...Array(SLOT_COUNT)].map((_, s) => ((s - 2) % reviews.length + reviews.length) % reviews.length));
  const offsetsRef = useRef<number[]>([-1, 0, 1, 2, 3]);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatingRef = useRef(false);
  const animTokenRef = useRef(0);
  const userCommentsRef = useRef<Testimonial[]>([]);

  const mod = (n: number) => ((n % itemsRef.current.length) + itemsRef.current.length) % itemsRef.current.length;

  const applyStyle = (slot: number, off: number) => {
    const el = elRefs.current[slot];
    if (!el) return;
    const d = Math.abs(off - 1);
    const scale = 1.05 - 0.13 * d;
    const opacity = Math.max(0, 1 - 0.55 * d);
    const blur = d * 1.8;
    el.style.transform = `translate(-50%, -50%) translateY(${((off - 1) * SPACING).toFixed(2)}px) scale(${scale.toFixed(3)})`;
    el.style.opacity = opacity.toFixed(3);
    el.style.zIndex = String(30 - Math.round(d) * 10);
    el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
  };

  useEffect(() => {
    offsetsRef.current.forEach((off, s) => applyStyle(s, off));
  }, []);

  // Scroll lock saat form terbuka
  useEffect(() => {
    if (!showForm) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    };
  }, [showForm]);

  const move = (dir: 'down' | 'up') => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const myToken = ++animTokenRef.current;
    const delta = dir === 'down' ? -1 : 1;
    const startOffsets = offsetsRef.current.slice();
    const t0 = performance.now();

    const step = (now: number) => {
      if (animTokenRef.current !== myToken) return;
      const p = Math.min((now - t0) / DURATION, 1);
      const k = easeInOutCubic(p);
      for (let s = 0; s < SLOT_COUNT; s++) applyStyle(s, startOffsets[s] + delta * k);
      if (p < 1) requestAnimationFrame(step);
      else finish();
    };

    const finish = () => {
      if (animTokenRef.current !== myToken) return;
      const next = mod(dir === 'down' ? centerIdxRef.current + 1 : centerIdxRef.current - 1);
      centerIdxRef.current = next;

      const newOffsets = startOffsets.map((off) => off + delta);

      const exitOffset = dir === 'down' ? -2 : 4;
      const exitIndex = newOffsets.indexOf(exitOffset);
      newOffsets[exitIndex] = dir === 'down' ? 3 : -1;
      slotIdxRef.current[exitIndex] = dir === 'down' ? mod(next + 2) : mod(next - 2);

      offsetsRef.current = newOffsets;
      setSlotReviews(slotIdxRef.current.map((i) => itemsRef.current[i]));

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (animTokenRef.current !== myToken) return;
          newOffsets.forEach((off, s) => applyStyle(s, off));
          animatingRef.current = false;
        }),
      );
    };

    requestAnimationFrame(step);
  };

  const setWheelFrom = (list: Testimonial[]) => {
    animTokenRef.current += 1;
    animatingRef.current = false;

    const N = list.length;
    const nidx = (n: number) => ((n % N) + N) % N;
    centerIdxRef.current = 0;
    slotIdxRef.current = [nidx(-2), nidx(-1), 0, 1, 2];
    offsetsRef.current = [-1, 0, 1, 2, 3];
    setSlotReviews(slotIdxRef.current.map((i) => list[i]));

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        offsetsRef.current.forEach((off, s) => applyStyle(s, off));
      }),
    );
  };

  // Ambil komentar pengguna yang sudah tersimpan di Supabase (tampil selamanya)
  useEffect(() => {
    (async () => {
      try {
        const list = await listComments();
        if (list.length > 0) {
          userCommentsRef.current = list;
          const merged = [...list, ...reviews];
          itemsRef.current = merged;
          setItems(merged);
          setWheelFrom(merged);
        }
      } catch {
        // Abaikan — cukup testimonial statis bawaan
        return;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validasi: apakah nama kota benar-benar ada di dunia (OpenStreetMap/Nominatim)
  const verifyCity = async (city: string): Promise<boolean> => {
    try {
      const params = new URLSearchParams({ format: 'jsonv2', q: city, limit: '1', 'accept-language': 'id' });
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return false;
      const data = (await res.json()) as Array<unknown>;
      return Array.isArray(data) && data.length > 0;
    } catch {
      // Gagal terhubung layanan verifikasi — jangan blokir pengguna
      return true;
    }
  };

  const submit = async () => {
    if (submitting) return;
    if (!formName.trim() || !formCity.trim() || !formComment.trim()) {
      setFormError(t('testimonials.writeRequired'));
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      const cityExists = await verifyCity(formCity.trim());
      if (!cityExists) {
        setFormError(t('testimonials.writeCityInvalid'));
        return;
      }
      const added = await addComment({
        name: formName.trim(),
        city: formCity.trim(),
        rating: formRating,
        comment: formComment.trim(),
      });
      const userList = [added, ...userCommentsRef.current];
      userCommentsRef.current = userList;
      const merged = [...userList, ...reviews];
      itemsRef.current = merged;
      setItems(merged);
      setWheelFrom(merged);
      setFormName('');
      setFormCity('');
      setFormRating(5);
      setFormComment('');
      setShowForm(false);
    } catch {
      setFormError(t('testimonials.writeFailed'));
    } finally {
      setSubmitting(false);
    }
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

          {/* Whee; tombol geser di kanan, tombol tulis komen di bawah */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
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

              {/* Tombol geser — kanan, berdekatan */}
              <div className="flex flex-col justify-center items-center gap-2">
                <button
                  type="button"
                  onClick={() => move('up')}
                  aria-label="Previous testimonials"
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-honey-gold/50 bg-background text-honey-gold transition-colors duration-300 hover:bg-honey-gold hover:text-white active:scale-90"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
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

            {/* Tombol tulis komentar — di bawah komentar */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                aria-label={t('testimonials.writeAria')}
                className="inline-flex items-center gap-2 rounded-full border-2 border-honey-gold bg-honey-gold px-5 py-2.5 font-semibold text-white transition-colors duration-300 hover:bg-transparent hover:text-honey-gold"
              >
                <PenLine className="h-4 w-4" />
                {t('testimonials.writeCta')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card form komentar */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl border border-honey-gold/30">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label={t('product.details.close')}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-xl font-serif font-bold text-foreground pr-8">{t('testimonials.writeTitle')}</h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground dark:text-white/80">
                  {t('testimonials.writeName')} *
                </label>
                <input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={t('testimonials.writeNamePh')}
                  className="w-full rounded-lg border border-honey-gold/30 bg-background px-3 py-2 text-foreground outline-none focus:border-honey-gold"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground dark:text-white/80">
                  {t('testimonials.writeCity')} *
                </label>
                <input
                  value={formCity}
                  onChange={(e) => setFormCity(e.target.value)}
                  placeholder={t('testimonials.writeCityPh')}
                  className="w-full rounded-lg border border-honey-gold/30 bg-background px-3 py-2 text-foreground outline-none focus:border-honey-gold"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground dark:text-white/80">
                  {t('testimonials.writeRating')}
                </label>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormRating(i + 1)}
                      aria-label={`${i + 1}`}
                      className="p-0"
                    >
                      <Star
                        className={`h-7 w-7 ${i < formRating ? 'fill-honey-gold text-honey-gold' : 'fill-muted text-muted'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground dark:text-white/80">
                  {t('testimonials.writeComment')} *
                </label>
                <textarea
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder={t('testimonials.writeCommentPh')}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-honey-gold/30 bg-background px-3 py-2 text-foreground outline-none focus:border-honey-gold"
                />
              </div>

              {formError && <p className="text-sm font-medium text-honey-gold">{formError}</p>}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="flex-1 rounded-full bg-honey-gold px-4 py-2.5 font-semibold text-white transition-colors duration-300 hover:bg-transparent hover:text-honey-gold border-2 border-honey-gold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t('testimonials.writePosting') : t('testimonials.writeSubmit')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full border-2 border-honey-gold/50 px-4 py-2 font-semibold text-muted-foreground transition-colors duration-300 hover:border-honey-gold hover:text-foreground"
                >
                  {t('testimonials.writeCancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;