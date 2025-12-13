import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import honeyVisual from '@/assets/honey-visual.png';

const WHATSAPP_NUMBER = '6282347905543';

const openWhatsApp = (message: string) => {
  // Use intent for Android, fallback for others
  const encodedMessage = encodeURIComponent(message);
  const webUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
  window.open(webUrl, '_blank');
};

const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [mapError, setMapError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello Lontara Honey!\n\nName: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    openWhatsApp(message);
    toast({
      title: 'Redirecting to WhatsApp',
      description: 'Your message is ready to send!',
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: language === 'en' ? 'Address' : 'Alamat',
      text: t('contact.address'),
    },
    {
      icon: Phone,
      title: 'Phone / WhatsApp',
      text: '+62 823-4790-5543',
    },
    {
      icon: Mail,
      title: 'Email',
      text: 'kaptenahmad01@gmail.com',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-honey-cream/10 to-honey-light/5 dark:from-background dark:via-background dark:to-background relative overflow-hidden">
      {/* Decorative Honey Visual */}
      <div className="absolute left-0 bottom-10 opacity-10 pointer-events-none hidden md:block">
        <img src={honeyVisual} alt="" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="space-y-16">
          {/* Info + Form */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Heading + Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading */}
              <div className="max-w-xl mb-10">
                <span className="text-primary font-medium uppercase tracking-wider text-sm">
                  {t('contact.title')}
                </span>
                <div className="mt-3 h-px w-24 bg-honey-gold/70" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4">
                  {t('contact.subtitle')}
                </h2>
                <p className="mt-4 text-muted-foreground">
                  {language === 'en' ? (
                    <>
                      Reach out to us for product information and wholesale inquiries,
                      <br className="hidden sm:block" />
                      or direct orders of Lontara Honey.
                    </>
                  ) : (
                    'Hubungi kami untuk informasi produk, pemesanan langsung, atau kerja sama distribusi Lontara Honey.'
                  )}
                </p>
              </div>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl honey-gradient flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                size="lg"
                className="honey-gradient text-white border-0 hover:opacity-90"
                onClick={() =>
                  openWhatsApp(
                    language === 'en'
                      ? "Hello Lontara Honey! I would like to place an order or ask about your products."
                      : 'Halo Lontara Honey! Saya ingin memesan atau menanyakan informasi seputar produk.'
                  )
                }
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('contact.whatsapp')}
              </Button>
            </motion.div>

            {/* Contact / Order Form */}
            <motion.div
              className="honey-card p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.name')}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'en' ? 'Your Name..' : 'Nama lengkap..'}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.phone')}
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={language === 'en' ? '+62 812 3456 7890' : '08xx xxxx xxxx'}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === 'en' ? 'Your message...' : 'Pesan Anda...'}
                    rows={5}
                    required
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full honey-gradient text-white border-0 hover:opacity-90"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.send')}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-xl border border-border bg-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {mapError ? (
              <div className="w-full h-72 md:h-96 flex items-center justify-center bg-muted/20">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Map tidak dapat dimuat</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Jl. Pangkabinanga, Pangkabinanga, Pallangga, Gowa, Sulawesi Selatan 92161
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                title="Lontara Honey Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.305487183139!2d119.4524519!3d-5.2146092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee227ff58c4ad%3A0x5ea49915d8676ea5!2sRaja%20Madu%20Sulawesi!5e0!3m2!1sid!2sid!4v1765591742735!5m2!1sid!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-72 md:h-96"
                onError={() => setMapError(true)}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
