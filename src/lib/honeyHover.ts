const DURATION = 1000;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

function parseHslVar(el: HTMLElement, name: string): RGB | null {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map((p) => p.replace('%', '')).filter(Boolean);
  if (parts.length < 3) return null;
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]);
  const l = parseFloat(parts[2]);
  if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(l)) return null;
  return hslToRgb(h, s, l);
}

const mix = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

const rafs = new WeakMap<HTMLElement, number>();

export function animateHoneyHover(el: HTMLElement, enter: boolean) {
  const existing = rafs.get(el);
  if (existing !== undefined) cancelAnimationFrame(existing);

  if (enter) el.classList.add('honey-hovered');
  else el.classList.remove('honey-hovered');

  const isReverse = el.classList.contains('honey-js-hover-reverse');
  const gold = parseHslVar(el, '--honey-gold') ?? { r: 212, g: 160, b: 86 };
  const white: RGB = { r: 255, g: 255, b: 255 };
  const start = performance.now();

  const frame = (now: number) => {
    if (!el.isConnected) return;
    const raw = Math.min(1, (now - start) / DURATION);
    const p = easeInOutCubic(raw);

    if (isReverse) {
      el.style.setProperty('--honey-bg-opacity', String(p));
      el.style.setProperty(
        '--honey-text-color',
        `rgb(${mix(gold.r, white.r, p)}, ${mix(gold.g, white.g, p)}, ${mix(gold.b, white.b, p)})`,
      );
      el.style.setProperty('--honey-outline-color', `rgba(${gold.r}, ${gold.g}, ${gold.b}, ${1 - p})`);
    } else {
      el.style.setProperty('--honey-bg-opacity', String(1 - p));
      el.style.setProperty(
        '--honey-text-color',
        `rgb(${mix(white.r, gold.r, p)}, ${mix(white.g, gold.g, p)}, ${mix(white.b, gold.b, p)})`,
      );
      el.style.setProperty('--honey-outline-color', `rgba(${gold.r}, ${gold.g}, ${gold.b}, ${p})`);
    }

    if (raw < 1) {
      rafs.set(el, requestAnimationFrame(frame));
    }
  };

  rafs.set(el, requestAnimationFrame(frame));
}