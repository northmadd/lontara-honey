import { useParams } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

const pages: Record<string, { titleKey: string; sections: { headingKey: string; textKey: string }[] }> = {
  privacy: { titleKey: 'legal.privacy.title', sections: [
    { headingKey: 'legal.privacy.s1.heading', textKey: 'legal.privacy.s1.text' },
    { headingKey: 'legal.privacy.s2.heading', textKey: 'legal.privacy.s2.text' },
    { headingKey: 'legal.privacy.s3.heading', textKey: 'legal.privacy.s3.text' },
    { headingKey: 'legal.privacy.s4.heading', textKey: 'legal.privacy.s4.text' },
  ]},
  terms: { titleKey: 'legal.terms.title', sections: [
    { headingKey: 'legal.terms.s1.heading', textKey: 'legal.terms.s1.text' },
    { headingKey: 'legal.terms.s2.heading', textKey: 'legal.terms.s2.text' },
    { headingKey: 'legal.terms.s3.heading', textKey: 'legal.terms.s3.text' },
  ]},
  shipping: { titleKey: 'legal.shipping.title', sections: [
    { headingKey: 'legal.shipping.s1.heading', textKey: 'legal.shipping.s1.text' },
    { headingKey: 'legal.shipping.s2.heading', textKey: 'legal.shipping.s2.text' },
    { headingKey: 'legal.shipping.s3.heading', textKey: 'legal.shipping.s3.text' },
  ]},
  refund: { titleKey: 'legal.refund.title', sections: [
    { headingKey: 'legal.refund.s1.heading', textKey: 'legal.refund.s1.text' },
    { headingKey: 'legal.refund.s2.heading', textKey: 'legal.refund.s2.text' },
    { headingKey: 'legal.refund.s3.heading', textKey: 'legal.refund.s3.text' },
  ]},
  faq: { titleKey: 'legal.faq.title', sections: [
    { headingKey: 'legal.faq.s1.heading', textKey: 'legal.faq.s1.text' },
    { headingKey: 'legal.faq.s2.heading', textKey: 'legal.faq.s2.text' },
    { headingKey: 'legal.faq.s3.heading', textKey: 'legal.faq.s3.text' },
    { headingKey: 'legal.faq.s4.heading', textKey: 'legal.faq.s4.text' },
  ]},
};

const LegalPage = () => {
  const { page = '' } = useParams();
  const { language, setLanguage, t } = useLanguage();
  const content = pages[page];
  if (!content) return <main className="min-h-screen p-10">{t('legal.notFound')}</main>;
  return <main className="min-h-screen bg-background py-16 text-foreground"><article className="container mx-auto max-w-3xl px-5">
      <div className="flex items-center justify-between">
        {/* Quick link legal dibuka di TAB BARU (target=_blank). Tombol back
            menutup tab ini (window.close — diizinkan browser karena tab ini
            baru & hanya punya 1 halaman), sehingga pengguna kembali ke tab
            utama / tab sebelumnya. Fallback navigasi kalau close gagal. */}
        <button
          type="button"
          onClick={() => {
            window.close();
            // window.close() hanya mengizinkan tab yang dibuka oleh script/user
            // dengan tepat satu halaman (quick link = tab baru target=_blank).
            // Fallback JS jarang dipakai: pindah ke tab utama jika gak tertutup.
            setTimeout(() => { window.location.href = routerBasename; }, 150);
          }}
          className="text-sm text-primary hover:underline"
        >
          <ArrowLeft className="mr-1.5 inline h-4 w-4 align-[-2px]" />
          {t('legal.back')}
        </button>
      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
        className="flex items-center gap-1.5 rounded-full bg-secondary/50 px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-secondary sm:gap-2 sm:px-3 sm:py-2"
      >
        <Globe className="h-4 w-4" />
        {language.toUpperCase()}
      </button>
    </div>
    <h1 className="mt-8 font-serif text-4xl font-bold">{t(content.titleKey)}</h1>
    <p className="mt-2 text-sm text-muted-foreground dark:text-white/80">{t('legal.lastUpdated')}{t(`${content.titleKey.replace('.title', '')}.updated`)}</p>
    <div className="mt-10 space-y-8">{content.sections.map((section) => <section key={section.headingKey}><h2 className="text-xl font-semibold">{t(section.headingKey)}</h2><p className="mt-2 leading-7 text-muted-foreground dark:text-white/80">{t(section.textKey)}</p></section>)}</div>
    <p className="mt-12 text-sm text-muted-foreground dark:text-white/80">{t('legal.footer')}</p>
  </article></main>;
};
export default LegalPage;