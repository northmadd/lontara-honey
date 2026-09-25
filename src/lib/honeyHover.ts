const DURATION = 1000;
const FRAMES = Math.max(30, Math.round(DURATION / 16.7));

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

const GOLD: RGB = { r: 238, g: 173, b: 43 };

function resolveGold(el: HTMLElement): RGB {
  const parsed = parseHslVar(el, '--honey-gold');
  if (parsed && parsed.r >= parsed.b && parsed.g >= parsed.b) return parsed;
  return GOLD;
}

const clamp = (n: number) => (Number.isFinite(n) ? Math.max(0, Math.min(255, Math.round(n))) : 255);

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const toColor = (r: number, g: number, b: number) => `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;

const toOutline = (g: RGB, p: number) =>
  `rgba(${clamp(g.r)}, ${clamp(g.g)}, ${clamp(g.b)}, ${Number.isFinite(p) ? Math.max(0, Math.min(1, p)) : 0})`;

const rafs = new WeakMap<HTMLElement, number>();
const timers = new WeakMap<HTMLElement, number>();
const settled = new WeakMap<HTMLElement, 'on' | 'off'>();

export function animateHoneyHover(el: HTMLElement, enter: boolean) {
  const handle = rafs.get(el);
  if (handle !== undefined) cancelAnimationFrame(handle);
  const timer = timers.get(el);
  if (timer !== undefined) clearTimeout(timer);

  if (settled.get(el) === (enter ? 'on' : 'off')) return;

  if (enter) el.classList.add('honey-hovered');
  else el.classList.remove('honey-hovered');

  const isReverse = el.classList.contains('honey-js-hover-reverse');
  const gold = resolveGold(el);
  const white: RGB = { r: 255, g: 255, b: 255 };
  let start: number | null = null;
  let frames = 0;

  const frame = (now: number) => {
    if (!el.isConnected) {
      rafs.delete(el);
      return;
    }
    frames += 1;
    if (start === null) start = now;
    const timeRaw = now - start >= 0 ? Math.min(1, (now - start) / DURATION) : -1;
    const frameRaw = Math.min(1, frames / FRAMES);
    const raw = timeRaw >= 0 ? Math.min(timeRaw, frameRaw) : frameRaw;
    const p = easeInOutCubic(raw);

    if (isReverse) {
      el.style.setProperty('--honey-bg-opacity', String(Number.isFinite(p) ? Math.max(0, Math.min(1, p)) : 0));
      el.style.setProperty('--honey-text-color', toColor(mix(gold.r, white.r, p), mix(gold.g, white.g, p), mix(gold.b, white.b, p)));
      el.style.setProperty('--honey-outline-color', toOutline(gold, 1 - p));
    } else {
      el.style.setProperty('--honey-bg-opacity', String(Number.isFinite(p) ? Math.max(0, Math.min(1, 1 - p)) : 1));
      el.style.setProperty('--honey-text-color', toColor(mix(white.r, gold.r, p), mix(white.g, gold.g, p), mix(white.b, gold.b, p)));
      el.style.setProperty('--honey-outline-color', toOutline(gold, p));
    }

    if (raw < 1) {
      rafs.set(el, requestAnimationFrame(frame));
    } else {
      rafs.delete(el);
      settled.set(el, enter ? 'on' : 'off');
    }
  };

  rafs.set(el, requestAnimationFrame(frame));

  timers.set(
    el,
    window.setTimeout(() => {
      const h = rafs.get(el);
      if (h !== undefined) cancelAnimationFrame(h);
      rafs.delete(el);
      settled.set(el, enter ? 'on' : 'off');
    }, DURATION + 400),
  );
}

export function resetHoneyHoverSettle(el: HTMLElement) {
  settled.delete(el);
  const handle = rafs.get(el);
  if (handle !== undefined) cancelAnimationFrame(handle);
  const timer = timers.get(el);
  if (timer !== undefined) clearTimeout(timer);
}