import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Wallet, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CountryCodeSelect, { getPhonePlaceholder } from '@/components/CountryCodeSelect';
import { Product } from './ProductsSection';

const WHATSAPP_NUMBER = '6282347905543';
const FORM_COOLDOWN_MS = 15_000;

const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const webUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
  window.open(webUrl, '_blank');
};

interface OrderModalProps {
  product: Product | null;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, onClose }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+62',
    phone: '',
    notes: '',
    payment: 'bank',
    website: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const lastSubmission = useRef(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const paymentMethods = [
    { id: 'bank', label: t('order.bank'), icon: CreditCard },
    { id: 'qris', label: 'QRIS', icon: Wallet, available: false },
    { id: 'cod', label: t('order.cod'), icon: Truck },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) return;

    if (!formData.phone.trim()) {
      setPhoneError(language === 'en' ? 'Phone number is required.' : 'Nomor telepon wajib diisi.');
      return;
    }

    if (Date.now() - lastSubmission.current < FORM_COOLDOWN_MS) return;
    lastSubmission.current = Date.now();
    
    const paymentLabel = paymentMethods.find(p => p.id === formData.payment)?.label || formData.payment;
    
    const message = `🍯 *NEW ORDER - LONTARA HONEY*\n\n` +
      `*Product:* ${language === 'en' ? product.name.en : product.name.id}\n` +
      `*Weight:* ${product.weight}\n` +
      `*Price:* ${formatPrice(product.price)}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.countryCode} ${formData.phone}\n` +
      `Payment: ${paymentLabel}\n` +
      `${formData.notes ? `Notes: ${formData.notes}` : ''}\n\n` +
      `Thank you for ordering Lontara Honey! 🐝`;

    openWhatsApp(message);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-card rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-card p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              {t('order.title')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Summary */}
          <div className="p-6 bg-muted/50">
            <div className="flex gap-4 items-start -mt-2">
              <img
                src={product.image}
                alt={language === 'en' ? product.name.en : product.name.id}
                decoding="async"
                className="w-14 h-14 object-contain bg-background rounded-2xl p-2"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {language === 'en' ? product.name.en : product.name.id}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-white/80">
                  {t('products.weight')}: {product.weight}
                </p>
                <p className="text-xl font-bold text-primary mt-2">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="order-website">Website</label>
              <Input
                id="order-website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('order.name')} *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name.."
                required
                maxLength={80}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('order.phone')} *
              </label>
              <div className="flex gap-2">
                <CountryCodeSelect
                  value={formData.countryCode}
                  onChange={(value) => setFormData({ ...formData, countryCode: value })}
                  ariaLabel={language === 'en' ? 'Country code' : 'Kode negara'}
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
                  aria-describedby={phoneError ? 'order-phone-error' : undefined}
                  minLength={6}
                  maxLength={16}
                  className="flex-1"
                />
              </div>
              {phoneError && (
                <p id="order-phone-error" className="mt-2 text-sm text-destructive">
                  {phoneError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('order.notes')}
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requests..."
                rows={3}
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {t('order.payment')} *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    disabled={method.available === false}
                    onClick={() => setFormData({ ...formData, payment: method.id })}
                    className={`relative p-4 rounded-xl border-2 transition-all text-center ${
                      formData.payment === method.id
                        ? 'border-primary bg-primary/10'
                        : method.available === false
                          ? 'cursor-not-allowed border-border opacity-55'
                          : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <method.icon className={`w-6 h-6 mx-auto mb-2 ${
                      formData.payment === method.id ? 'text-primary' : 'text-muted-foreground dark:text-white/80'
                    }`} />
                    <span className={`text-xs font-medium ${
                      formData.payment === method.id ? 'text-primary' : 'text-muted-foreground dark:text-white/80'
                    }`}>
                      {method.label}
                    </span>
                    {method.available === false && (
                      <span className="mt-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground dark:text-white/80">Coming soon</span>
                    )}
                  </button>
                ))}
              </div>
              {formData.payment === 'bank' && (
                <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                  <p className="font-semibold">Bank Mandiri</p>
                  <p className="mt-1">Account number: <span className="font-medium">152-00-1864520-6</span></p>
                  <p>Account holder: Ariani</p>
                  <p className="mt-2 text-xs text-muted-foreground dark:text-white/80">Please confirm your order with our team before making a transfer.</p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full honey-gradient text-white border-0 hover:opacity-90 py-6 text-lg font-semibold"
            >
              {t('order.submit')}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderModal;
