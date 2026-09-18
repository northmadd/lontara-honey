import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CountryCodeSelect, { getPhonePlaceholder } from '@/components/CountryCodeSelect';
import { toast } from '@/hooks/use-toast';
import honeyVisual from '@/assets/honey-visual.webp';

const WHATSAPP_NUMBER = '6282347905543';
const FORM_COOLDOWN_MS = 15_000;

const openWhatsApp = (message: string) => {
  // Use intent for Android, fallback for others
  const encodedMessage = encodeURIComponent(message);
  const webUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
  window.open(webUrl, '_blank');
};

const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+62',
    phone: '',
    message: '',
    website: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const [mapError, setMapError] = useState(false);
  const lastSubmission = useRef(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) return;

    if (!formData.phone.trim()) {
      setPhoneError(t('contact.phoneRequired'));
      return;
    }

    if (Date.now() - lastSubmission.current < FORM_COOLDOWN_MS) {
      toast({
        title: t('contact.toast.wait.title'),
        description: t('contact.toast.wait.desc'),
      });
      return;
    }

    lastSubmission.current = Date.now();
    
    const message = `Hello Lontara Honey!\n\nName: ${formData.name}\nPhone: ${formData.countryCode} ${formData.phone}\n\nMessage:\n${formData.message}`;
    openWhatsApp(message);
    toast({
      title: t('contact.toast.redirect.title'),
      description: t('contact.toast.redirect.desc'),
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      text: t('contact.address'),
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      text: '+62 823-4790-5543',
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      text: 'lontarajayanusantara@gmail.com',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-honey-cream/10 to-honey-light/5 dark:from-background dark:via-background dark:to-background relative overflow-hidden">
      {/* Decorative Honey Visual */}
      <div className="absolute left-0 bottom-10 opacity-10 pointer-events-none hidden md:block">
        <img src={honeyVisual} alt="" loading="lazy" decoding="async" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="space-y-16">
          {/* Info + Form */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start lg:items-stretch">
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
                <p className="mt-4 text-muted-foreground dark:text-white/80">
                  {t('contact.paragraph1')}
                  <br className="hidden sm:block" />
                  {t('contact.paragraph2')}
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
                  openWhatsApp(t('contact.wa.message'))
                }
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('contact.whatsapp')}
              </Button>
            </motion.div>

            {/* Contact / Order Form */}
            <motion.div
              className="honey-card p-8 h-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <Input
                    id="contact-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.name')}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('contact.namePlaceholder')}
                    required
                    maxLength={80}
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.phone')} *
                  </label>
                  <div className="flex gap-2">
                    <CountryCodeSelect
                      value={formData.countryCode}
                      onChange={(value) => setFormData({ ...formData, countryCode: value })}
                      ariaLabel={t('contact.countryCode.aria')}
                    />
                    <Input
                      type="tel"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder={getPhonePlaceholder(formData.countryCode)}
                      aria-invalid={Boolean(phoneError)}
                      aria-describedby={phoneError ? 'contact-phone-error' : undefined}
                      minLength={6}
                      maxLength={16}
                      className="bg-background flex-1"
                    />
                  </div>
                  {phoneError && (
                    <p id="contact-phone-error" className="mt-2 text-sm text-destructive">
                      {phoneError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={5}
                    required
                    maxLength={1000}
                    className="bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full honey-gradient text-white border-0 hover:opacity-90 mt-auto"
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
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground dark:text-white/80" />
                  <p className="text-foreground">{t('contact.map.error.title')}</p>
                  <p className="text-sm text-muted-foreground dark:text-white/80 mt-2">
                    {t('contact.map.error.address')}
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                title={t('contact.map.title')}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.305487183139!2d119.4524519!3d-5.2146092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee227ff58c4ad%3A0x5ea49915d8676ea5!2sRaja%20Madu%20Sulawesi!5e0!2m3!1sid!2sid&hl=${language}`}
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
