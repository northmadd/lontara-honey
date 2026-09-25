import { useState } from 'react';
import { BadgeCheck, CreditCard, Globe2, RotateCcw, Truck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import InternationalDetailModal, { InternationalItem } from '@/components/InternationalDetailModal';

interface CardData {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  textKey: string;
  items: InternationalItem[];
}

const InternationalSection = () => {
  const { t } = useLanguage();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards: CardData[] = [
    {
      icon: Truck,
      titleKey: 'international.card1.title',
      textKey: 'international.card1.text',
      items: [
        {
          name: { id: 'DHL', en: 'DHL' },
          description: {
            id: 'Jasa kurir ekspres internasional yang mengirim paket dengan cepat ke hampir seluruh negara di dunia.',
            en: 'International express courier that delivers packages quickly to nearly every country in the world.',
          },
        },
        {
          name: { id: 'FedEx', en: 'FedEx' },
          description: {
            id: 'Perusahaan kurir global yang dikenal dengan pengiriman udara dan darat yang cepat.',
            en: 'Global courier company known for fast air and ground delivery.',
          },
        },
        {
          name: { id: 'Attaba Express', en: 'Attaba Express' },
          description: {
            id: 'Mitra pengiriman yang membantu mengirimkan paket ke dalam dan ke luar Indonesia.',
            en: 'Delivery partner that helps route packages within and outside Indonesia.',
          },
        },
        {
          name: { id: 'Forwarder SBL', en: 'Forwarder SBL' },
          description: {
            id: 'Freight forwarder yang mengatur pengiriman internasional, bea cukai, dan dokumen untuk pesanan besar.',
            en: 'Freight forwarder that arranges international shipping, customs clearance, and documentation for larger orders.',
          },
        },
        {
          name: { id: 'ALFI Logistik', en: 'ALFI Logistik' },
          description: {
            id: 'Perusahaan logistik Indonesia yang mendukung pergerakan kargo darat, laut, dan udara untuk domestik maupun ekspor.',
            en: 'Indonesian logistics company supporting land, sea, and air cargo movement for domestic and export shipments.',
          },
        },
      ],
    },
    {
      icon: CreditCard,
      titleKey: 'international.card2.title',
      textKey: 'international.card2.text',
      items: [
        {
          name: { id: 'Transfer Bank', en: 'Bank Transfer' },
          description: {
            id: 'Pembayaran ditransfer langsung ke rekening Bank Mandiri Lontara Honey, lalu konfirmasi pesanan ke tim kami.',
            en: 'Payments are transferred directly to Lontara Honey\'s Bank Mandiri account, then confirm your order with our team.',
          },
        },
        {
          name: { id: 'PayPal', en: 'PayPal' },
          description: {
            id: 'Layanan pembayaran online global yang memudahkan transaksi lintas negara. Segera hadir.',
            en: 'Global online payment service that makes cross-border transactions easy. Coming soon.',
          },
        },
      ],
    },
    {
      icon: BadgeCheck,
      titleKey: 'international.card3.title',
      textKey: 'international.card3.text',
      items: [
        {
          name: { id: 'Halal', en: 'Halal' },
          description: {
            id: 'Sertifikat yang menjamin produk dan proses pengolahannya memenuhi ketentuan syariat Islam.',
            en: 'Certification that the product and its processing comply with Islamic law (sharia).',
          },
        },
        {
          name: { id: 'NKV', en: 'NKV (Veterinary Control Number)' },
          description: {
            id: 'Nomor Kontrol Veteriner — nomor resmi yang menjamin higienitas pengolahan produk asal hewan di Indonesia.',
            en: 'Nomor Kontrol Veteriner — the official number guaranteeing hygienic processing of animal-derived products in Indonesia.',
          },
        },
        {
          name: { id: 'HACCP', en: 'HACCP' },
          description: {
            id: 'Hazard Analysis and Critical Control Points — sistem manajemen keamanan pangan yang diakui internasional.',
            en: 'Hazard Analysis and Critical Control Points — an internationally recognized food safety management system.',
          },
        },
        {
          name: { id: 'Uji Lab', en: 'Lab Test' },
          description: {
            id: 'Hasil analisis laboratorium yang memastikan kualitas, kemurnian, dan keamanan madu.',
            en: 'Laboratory analysis results confirming the quality, purity, and safety of the honey.',
          },
        },
      ],
    },
    {
      icon: RotateCcw,
      titleKey: 'international.card4.title',
      textKey: 'international.card4.text',
      items: [
        {
          name: { id: 'Jangka Waktu 7 Hari', en: '7-Day Window' },
          description: {
            id: 'Laporkan kiriman rusak atau salah dalam 7 hari setelah paket diterima.',
            en: 'Report damaged or incorrect shipments within 7 days after the package is received.',
          },
        },
        {
          name: { id: 'Video Unboxing', en: 'Unboxing Video' },
          description: {
            id: 'Sertakan video unboxing yang jelas, foto produk, dan detail pesanan sebagai bukti.',
            en: 'Include a clear unboxing video, product photos, and order details as proof.',
          },
        },
        {
          name: { id: 'Penyelesaian Klaim', en: 'Claim Resolution' },
          description: {
            id: 'Klaim ditinjau bersama eksportir dan mitra logistik. Penyelesaian dapat berupa penggantian, pengembalian sebagian, atau refund sesuai kesepakatan tertulis.',
            en: 'Claims are reviewed with the exporter and logistics partner. Resolution may include replacement, partial refund, or refund as agreed in writing.',
          },
        },
      ],
    },
  ];

  return (
    <section id="international" className="bg-muted py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-honey-gold">
            {t('international.eyebrow')}
          </p>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground">
            {t('international.title')}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-white/80">
            {t('international.description')}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.titleKey}
              className="honey-card p-6 relative group cursor-pointer flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCard(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCard(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${t(card.titleKey)} - ${t('international.details.view')}`}
            >
              <card.icon className="h-7 w-7 text-honey-amber transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-4 font-bold text-honey-gold">{t(card.titleKey)}</h3>
              <div className="mt-2 h-0.5 w-12 bg-honey-gold/60 transition-all duration-300 group-hover:w-20" />
              <p className="mt-3 flex-1 text-sm text-muted-foreground dark:text-white/80">{t(card.textKey)}</p>
              <div className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-honey-gold opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                {t('international.details.view')}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-white/80">
          <Globe2 className="h-4 w-4" />
          {t('international.footer')}
        </div>
      </div>

      {selectedCard !== null && (
        <InternationalDetailModal
          title={t(cards[selectedCard].titleKey)}
          icon={cards[selectedCard].icon}
          items={cards[selectedCard].items}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </section>
  );
};

export default InternationalSection;