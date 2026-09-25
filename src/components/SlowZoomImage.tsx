import React, { useEffect, useRef } from 'react';

interface SlowZoomImageProps {
  src: string;
  alt: string;
  imgClassName?: string;
}

const DURATION = 500;
const MAX_SCALE = 1.12;
const MAX_FRAMES = Math.max(30, Math.round((DURATION / 16.7) * 1.5));

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const SlowZoomImage: React.FC<SlowZoomImageProps> = ({ src, alt, imgClassName = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const scaleRef = useRef(1);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startTween = (target: number) => {
      cancelAnimationFrame(rafRef.current);
      const from = scaleRef.current;
      if (from === target) return;
      let t0: number | null = null;
      let frames = 0;

      const apply = (now: number) => {
        if (t0 === null) t0 = now;
        frames += 1;
        const elapsed = now - t0 >= 0 ? (now - t0) / DURATION : -1;
        const timeP = elapsed >= 0 ? Math.min(1, elapsed) : -1;
        const frameP = Math.min(1, frames / MAX_FRAMES);
        const p = timeP >= 0 ? Math.min(timeP, frameP) : frameP;
        const scale = from + (target - from) * easeInOutCubic(p);
        scaleRef.current = scale;
        el.style.transform = `scale(${scale.toFixed(4)})`;
        if (p < 1) rafRef.current = requestAnimationFrame(apply);
      };

      rafRef.current = requestAnimationFrame(apply);
    };

    const onEnter = () => startTween(MAX_SCALE);
    const onLeave = () => startTween(1);

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-full will-change-transform"
      style={{ transformOrigin: 'center', transform: 'scale(1)' }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-contain p-6 ${imgClassName}`}
      />
    </div>
  );
};

export default SlowZoomImage;