import { BadgeCheck, CreditCard, Globe2, RotateCcw, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const InternationalSection = () => {
  const { language } = useLanguage();
  const isIndonesian = language === 'id';

  const cards = [
    {
      icon: Truck,
      title: isIndonesian ? 'Logistik global' : 'Global logistics',
      text: 'DHL, FedEx, Attaba Express, Forwarder SBL, dan ALFI Logistik.',
    },
    {
      icon: CreditCard,
      title: isIndonesian ? 'Pembayaran aman' : 'Secure payment',
      text: isIndonesian
        ? 'Transfer bank tersedia setelah pesanan dikonfirmasi. PayPal segera hadir.'
        : 'Bank transfer is available after order confirmation. PayPal is coming soon.',
    },
    {
      icon: BadgeCheck,
      title: isIndonesian ? 'Dokumentasi' : 'Documentation',
      text: isIndonesian
        ? 'Dokumen Halal, NKV, HACCP, dan hasil uji lab tersedia berdasarkan permintaan.'
        : 'Halal, NKV, HACCP, and laboratory-test documents are available on request.',
    },
    {
      icon: RotateCcw,
      title: isIndonesian ? 'Dukungan retur' : 'Return support',
      text: isIndonesian
        ? 'Laporkan kiriman rusak dalam 7 hari setelah diterima dengan video unboxing. Penyelesaian ditangani bersama eksportir.'
        : 'Report a damaged shipment within 7 days of delivery with an unboxing video. Resolution is handled with the exporter.',
    },
  ];

  return (
    <section id="international" className="bg-muted py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-honey-gold">
            {isIndonesian ? 'Pesanan Internasional' : 'International orders'}
          </p>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground">
            {isIndonesian ? 'Dari Sulawesi ke tujuan Anda' : 'From Sulawesi to your destination'}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-white/80">
            {isIndonesian
              ? 'Kami melayani pertanyaan ekspor dan pesanan grosir. Pengaturan pengiriman, biaya, bea masuk, dan estimasi waktu dikonfirmasi bersama setiap pembeli berdasarkan negara tujuan.'
              : 'We support export enquiries and wholesale orders. Shipping arrangements, costs, customs duties, and delivery timelines are confirmed with each buyer based on the destination country.'}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              className="honey-card p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <card.icon className="h-7 w-7 text-honey-amber" />
              <h3 className="mt-4 font-bold text-honey-gold">{card.title}</h3>
              <div className="mt-2 h-0.5 w-12 bg-honey-gold/60" />
              <p className="mt-3 text-sm text-muted-foreground dark:text-white/80">{card.text}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground dark:text-white/80">
          <Globe2 className="h-4 w-4" />
          {isIndonesian
            ? 'Hubungi kami untuk penawaran pengiriman sesuai negara tujuan.'
            : 'Contact us for a country-specific shipping quotation.'}
        </div>
      </div>
    </section>
  );
};

export default InternationalSection;
