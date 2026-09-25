import React, { useEffect, useRef } from 'react';

interface SlowZoomImageProps {
  src: string;
  alt: string;
  imgClassName?: string;
}

const DURATION = 700;
const MAX_SCALE = 1.12;

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
      const t0 = performance.now();

      const apply = (now: number) => {
        const p = Math.min((now - t0) / DURATION, 1);
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