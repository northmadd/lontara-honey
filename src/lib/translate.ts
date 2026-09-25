export const translateText = async (text: string, target: 'id' | 'en'): Promise<string | null> => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as unknown;
    const segments = Array.isArray(data) ? data[0] : null;
    if (!Array.isArray(segments)) return null;
    const translated = segments
      .map((seg) => (Array.isArray(seg) ? String(seg[0] ?? '') : ''))
      .join('');
    return translated.length > 0 ? translated : null;
  } catch {
    return null;
  }
};