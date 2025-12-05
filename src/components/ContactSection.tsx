import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = '089520331695';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello Lontara Honey!\n\nName: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/^0/, '62')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast({
      title: 'Redirecting to WhatsApp',
      description: 'Your message is ready to send!',
    });
  };

  const contactInfo = [
    { icon: MapPin, text: t('contact.address') },
    { icon: Phone, text: '+62 ' + WHATSAPP_NUMBER.slice(1) },
    { icon: Mail, text: 'hello@lontarahoney.com' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              {t('contact.title')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-6">
              {t('contact.subtitle')}
            </h2>

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
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="honey-gradient text-foreground border-0 hover:opacity-90"
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/^0/, '62')}`, '_blank')}
            >
              <Phone className="w-5 h-5 mr-2" />
              {t('contact.whatsapp')}
            </Button>
          </motion.div>

          {/* Contact Form */}
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
                  placeholder="John Doe"
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
                  placeholder="+62 812 3456 7890"
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
                  placeholder="Your message..."
                  rows={5}
                  required
                  className="bg-background"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full honey-gradient text-foreground border-0 hover:opacity-90"
              >
                <Send className="w-5 h-5 mr-2" />
                {t('contact.send')}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
