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
    address: '',
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
    { id: 'qris', label: 'QRIS', icon: Wallet },
    { id: 'cod', label: t('order.cod'), icon: Truck },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) return;

    if (!formData.phone.trim()) {
      setPhoneError(t('order.phoneRequired'));
      return;
    }

    if (Date.now() - lastSubmission.current < FORM_COOLDOWN_MS) return;
    lastSubmission.current = Date.now();

    const paymentLabel = paymentMethods.find(p => p.id === formData.payment)?.label || formData.payment;

    const buildMessage = () =>
      `${t('order.wa.title')}` +
      `${t('order.wa.product')} ${language === 'en' ? product.name.en : product.name.id}\n` +
      `${t('order.wa.weight')} ${product.weight}\n` +
      `${t('order.wa.price')} ${formatPrice(product.price)}\n\n` +
      `${t('order.wa.customer')}\n` +
      `${t('order.wa.name')} ${formData.name}\n` +
      `${t('order.wa.phone')} ${formData.countryCode} ${formData.phone}\n` +
      `${formData.address ? `${t('order.wa.address')} ${formData.address}\n` : ''}` +
      `${t('order.wa.payment')} ${paymentLabel}\n` +
      `${formData.payment === 'qris' ? `${t('order.wa.qris.request')}\n` : ''}` +
      `${formData.notes ? `${t('order.wa.notes')} ${formData.notes}\n` : ''}\n` +
      `${t('order.wa.thanks')}`;

    openWhatsApp(buildMessage());
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[94vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.92, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 60 }}
          transition={{ type: "spring", bounce: 0.22, duration: 0.7 }}
          role="dialog"
          aria-modal="true"
          aria-label={t('order.title')}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label={t('product.details.close')}
            className="absolute top-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20 sm:h-10 sm:w-10"
          >
            <X className="h-6 w-6 sm:h-5 sm:w-5" />
          </button>

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-border bg-card p-6 pr-16">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              {t('order.title')}
            </h2>
          </div>

          {/* Scrollable content */}
          <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Product Summary */}
          <div className="p-6 bg-muted/50">
            <div className="flex gap-4 items-start">
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value.replace(/[0-9]/g, '') })
                }
                placeholder={t('order.namePlaceholder')}
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
                  ariaLabel={t('order.countryCode.aria')}
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
                {t('order.address')}
              </label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={t('order.addressPlaceholder')}
                maxLength={160}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('order.notes')}
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t('order.notesPlaceholder')}
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
                    onClick={() => setFormData({ ...formData, payment: method.id })}
                    className={`relative p-4 rounded-xl border-2 transition-all text-center ${
                      formData.payment === method.id
                        ? 'border-primary bg-primary/10'
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
                  </button>
                ))}
              </div>

              {formData.payment === 'bank' && (
                <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                  <p className="font-semibold">{t('order.bank.name')}</p>
                  <p className="mt-1">{t('order.bank.number')} <span className="font-medium">152-00-1864520-6</span></p>
                  <p>{t('order.bank.holder')} Ariani</p>
                  <p className="mt-2 text-xs text-muted-foreground dark:text-white/80">{t('order.bank.confirm')}</p>
                </div>
              )}

              {formData.payment === 'qris' && (
                <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                  {t('order.qris.requestNote')}
                </div>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              honeyHover
              className="w-full py-6 text-lg font-semibold"
            >
              {t('order.submit')}
            </Button>
          </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderModal;