import React, { useEffect, useRef } from 'react';

interface SlowZoomImageProps {
  src: string;
  alt: string;
  imgClassName?: string;
}

const DURATION = 12000;
const MIN_SCALE = 1;
const MAX_SCALE = 1.15;

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

const SlowZoomImage: React.FC<SlowZoomImageProps> = ({ src, alt, imgClassName = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = ((now - start) % DURATION) / DURATION;
      const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * easeInOutSine(t);
      el.style.transform = `scale(${scale.toFixed(4)})`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-full will-change-transform"
      style={{ transformOrigin: 'center' }}
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