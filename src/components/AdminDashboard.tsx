import React, { useEffect, useState } from 'react';
import { Star, Trash2, PenLine, X, LayoutDashboard, MessageSquare, LogOut, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { listComments, deleteComment, updateComment } from '@/lib/comments';
import { translateText } from '@/lib/translate';
import type { Testimonial } from '@/data/testimonials';
import { Button } from '@/components/ui/button';

interface AdminDashboardProps {
  onClose: () => void;
}

const DashStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < rating ? 'fill-honey-gold text-honey-gold' : 'fill-muted text-muted'}`}
      />
    ))}
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { t, language } = useLanguage();
  const { logout } = useAdmin();
  const lang = language === 'en' ? 'en' : 'id';

  const [comments, setComments] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [editName, setEditName] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editError, setEditError] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const list = await listComments();
      setComments(list);
    } catch {
      setLoadError(t('admin.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  const startEdit = (comment: Testimonial) => {
    setEditing(comment);
    setEditName(comment.name);
    setEditCity(comment.city.id);
    setEditRating(comment.rating);
    setEditComment(comment.text.id);
    setEditError('');
  };

  const handleDelete = async (comment: Testimonial) => {
    if (!comment.id || busyId) return;
    if (!window.confirm(t('admin.deleteConfirm'))) return;
    setBusyId(comment.id);
    try {
      await deleteComment(comment.id);
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    } catch {
      window.alert(t('admin.deleteFailed'));
    } finally {
      setBusyId(null);
    }
  };

  const saveEdit = async () => {
    if (!editing?.id || editSaving) return;
    if (!editName.trim() || !editCity.trim() || !editComment.trim()) {
      setEditError(t('testimonials.writeRequired'));
      return;
    }
    setEditSaving(true);
    setEditError('');
    try {
      const rawText = editComment.trim();
      const [translatedEn, translatedId] = await Promise.all([
        translateText(rawText, 'en'),
        translateText(rawText, 'id'),
      ]);
      const commentEn = translatedEn && translatedEn.trim() ? translatedEn.trim() : rawText;
      const commentId = translatedId && translatedId.trim() ? translatedId.trim() : rawText;
      const updated = await updateComment(editing.id, {
        name: editName.trim(),
        city: editCity.trim(),
        rating: editRating,
        comment: rawText,
        commentId,
        commentEn,
      });
      setComments((prev) => prev.map((c) => (c.id === editing.id ? updated : c)));
      setEditing(null);
    } catch {
      setEditError(t('admin.updateFailed'));
    } finally {
      setEditSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex bg-background notranslate" translate="no">
      {/* Sidebar */}
      <aside className="flex w-16 shrink-0 flex-col border-r border-border bg-card/60 py-4 sm:w-60 sm:px-3">
        <div className="mb-6 hidden items-center gap-2 px-3 sm:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-honey-gold text-white">
            <LayoutDashboard className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-bold text-foreground">{t('admin.dashboard')}</span>
        </div>
        <div className="mb-6 flex justify-center sm:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-honey-gold text-white">
            <LayoutDashboard className="h-5 w-5" />
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          <button
            type="button"
            className="flex items-center justify-center gap-3 rounded-lg bg-honey-gold/15 px-3 py-2.5 text-sm font-semibold text-honey-gold sm:justify-start"
          >
            <MessageSquare className="h-5 w-5 shrink-0" />
            <span className="hidden sm:inline">{t('admin.menuComments')}</span>
          </button>
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10 sm:justify-start"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">{t('admin.logout')}</span>
        </button>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-card/40 px-4 py-3 sm:px-8 sm:py-4">
          <div className="min-w-0">
            <h1 className="truncate font-serif text-xl font-bold text-foreground sm:text-2xl">
              {t('admin.commentsHeading')}
            </h1>
            <p className="text-xs text-muted-foreground dark:text-white/70">
              {comments.length} {t('admin.totalComments')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={load}
              disabled={loading}
              aria-label={t('admin.refresh')}
              title={t('admin.refresh')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('admin.close')}
              title={t('admin.close')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {loading && (
            <p className="py-16 text-center text-sm text-muted-foreground dark:text-white/70">
              {t('admin.loading')}
            </p>
          )}

          {!loading && loadError && (
            <div className="mx-auto max-w-md rounded-2xl border border-red-400/40 bg-red-500/5 px-5 py-6 text-center">
              <p className="text-sm font-medium text-red-400">{loadError}</p>
              <Button
                type="button"
                honeyHover
                onClick={load}
                className="mt-4 rounded-full px-5 py-2.5 font-semibold"
              >
                {t('admin.refresh')}
              </Button>
            </div>
          )}

          {!loading && !loadError && comments.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground dark:text-white/70">
              {t('admin.empty')}
            </p>
          )}

          {!loading && !loadError && comments.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {comments.map((comment, index) => (
                <article key={comment.id ?? index} className="honey-card flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">{comment.name}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        {comment.city && comment.city[lang] && (
                          <span className="inline-flex items-center rounded-full bg-honey-dark px-3 py-1 text-xs font-medium text-white">
                            {comment.city[lang]}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground dark:text-white/80">
                          {comment.date[lang]}
                        </span>
                      </div>
                    </div>
                    <DashStars rating={comment.rating} />
                  </div>

                  <p className="mt-3 flex-1 text-sm italic leading-relaxed text-foreground">
                    &ldquo;{comment.text[lang]}&rdquo;
                  </p>

                  <div className="mt-4 flex items-center justify-end gap-2 border-t border-honey-gold/20 pt-3">
                    <button
                      type="button"
                      onClick={() => startEdit(comment)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-honey-gold/50 px-3 py-1.5 text-xs font-semibold text-honey-gold transition-colors hover:bg-honey-gold hover:text-white"
                    >
                      <PenLine className="h-3.5 w-3.5" />
                      {t('admin.edit')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(comment)}
                      disabled={busyId === comment.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-400/50 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t('admin.delete')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditing(null)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-honey-gold/30 bg-background p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setEditing(null)}
              aria-label={t('product.details.close')}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="pr-8 font-serif text-xl font-bold text-foreground">{t('admin.editTitle')}</h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground dark:text-white/80">
                  {t('testimonials.writeName')} *
                </label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-lg border border-honey-gold/30 bg-background px-3 py-2 text-foreground outline-none focus:border-honey-gold"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-muted-foreground dark:text-white/80">
                  {t('testimonials.writeCity')} *
                </label>
                <input
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
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
                      onClick={() => setEditRating(i + 1)}
                      aria-label={`${i + 1}`}
                      className="p-0"
                    >
                      <Star
                        className={`h-7 w-7 ${i < editRating ? 'fill-honey-gold text-honey-gold' : 'fill-muted text-muted'}`}
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
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-honey-gold/30 bg-background px-3 py-2 text-foreground outline-none focus:border-honey-gold"
                />
              </div>

              {editError && <p className="text-sm font-medium text-honey-gold">{editError}</p>}

              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="button"
                  honeyHover
                  onClick={saveEdit}
                  disabled={editSaving}
                  className="flex-1 rounded-full px-4 py-2.5 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editSaving ? t('admin.saving') : t('admin.save')}
                </Button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-full border-2 border-honey-gold/50 px-4 py-2 font-semibold text-muted-foreground transition-colors duration-300 hover:border-honey-gold hover:text-foreground"
                >
                  {t('testimonials.writeCancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
