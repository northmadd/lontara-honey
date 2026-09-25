import type { Testimonial } from '@/data/testimonials';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const SUPABASE_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

export interface SupabaseCommentRow {
  id?: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  created_at?: string;
}

const relativeDate = (iso: string): { id: string; en: string } => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return { id: 'Baru saja', en: 'Just now' };
  if (mins < 60) return { id: `${mins} menit lalu`, en: `${mins} minutes ago` };
  const hours = Math.floor(mins / 60);
  if (hours < 24) return { id: `${hours} jam lalu`, en: `${hours} hours ago` };
  const days = Math.floor(hours / 24);
  if (days < 30) return { id: `${days} hari lalu`, en: `${days} days ago` };
  const months = Math.floor(days / 30);
  if (months < 12) return { id: `${months} bulan lalu`, en: `${months} months ago` };
  const years = Math.floor(months / 12);
  return { id: `${years} tahun lalu`, en: `${years} years ago` };
};

const toTestimonial = (row: SupabaseCommentRow): Testimonial => ({
  name: row.name,
  city: { id: row.city, en: row.city },
  rating: row.rating,
  date: row.created_at ? relativeDate(row.created_at) : { id: 'Baru saja', en: 'Just now' },
  text: { id: row.comment, en: row.comment },
});

const authHeaders = (extra?: Record<string, string>) => ({
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  Accept: 'application/json',
  ...extra,
});

export const listComments = async (): Promise<Testimonial[]> => {
  if (!isSupabaseConfigured) throw new Error('supabase-not-configured');
  const url = `${SUPABASE_URL}/rest/v1/testimonials?select=*&order=created_at.desc`;
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) throw new Error(`supabase-list-failed:${res.status}`);
  const rows = (await res.json()) as SupabaseCommentRow[];
  return Array.isArray(rows) ? rows.map(toTestimonial) : [];
};

export const addComment = async (input: {
  name: string;
  city: string;
  rating: number;
  comment: string;
}): Promise<Testimonial> => {
  if (!isSupabaseConfigured) throw new Error('supabase-not-configured');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, {
    method: 'POST',
    headers: authHeaders({
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    }),
    body: JSON.stringify({
      name: input.name,
      city: input.city,
      rating: input.rating,
      comment: input.comment,
    }),
  });
  if (!res.ok) throw new Error(`supabase-post-failed:${res.status}`);
  const rows = (await res.json()) as SupabaseCommentRow[];
  const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  if (!row) throw new Error('supabase-post-empty');
  return toTestimonial(row);
};