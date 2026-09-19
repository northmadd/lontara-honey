import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Wallet, Truck, MapPin, Clock, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import CountryCodeSelect, { getPhonePlaceholder } from '@/components/CountryCodeSelect';
import { Product } from './ProductsSection';
import qrisImage from '@/assets/qris.webp';

const WHATSAPP_NUMBER = '6282347905543';
const FORM_COOLDOWN_MS = 15_000;
const QRIS_EXPIRY_MS = 10 * 60 * 1000;
const STORE_LAT = -5.2146092;
const STORE_LNG = 119.4524519;
const STORE_ADDRESS = 'Jl. Pangkabinanga, Pangkabinanga, Pallangga, Gowa, Sulawesi Selatan 92161';

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
  const [showMap, setShowMap] = useState(false);
  const [qrisExpired, setQrisExpired] = useState(false);
  const [qrisConfirmed, setQrisConfirmed] = useState(false);
  const [qrisProofError, setQrisProofError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(QRIS_EXPIRY_MS / 1000);
  const [copied, setCopied] = useState(false);
  const lastSubmission = useRef(0);

  // QRIS session: 10 minutes, then reset the payment data.
  useEffect(() => {
    if (formData.payment !== 'qris') return;

    const expiresAt = Date.now() + QRIS_EXPIRY_MS;
    setQrisExpired(false);
    setQrisConfirmed(false);
    setQrisProofError('');
    setSecondsLeft(QRIS_EXPIRY_MS / 1000);

    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(interval);
        setQrisExpired(true);
        setFormData((prev) => ({ ...prev, payment: 'bank' }));
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [formData.payment]);

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

  const formatCountdown = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const paymentMethods = [
    { id: 'bank', label: t('order.bank'), icon: CreditCard },
    { id: 'qris', label: 'QRIS', icon: Wallet },
    { id: 'cod', label: t('order.cod'), icon: Truck },
  ];

  const copyStoreAddress = async () => {
    try {
      await navigator.clipboard.writeText(STORE_ADDRESS);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = STORE_ADDRESS;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${STORE_LAT},${STORE_LNG}`,
      '_blank',
      'noopener',
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) return;

    if (!formData.phone.trim()) {
      setPhoneError(t('order.phoneRequired'));
      return;
    }

    if (formData.payment === 'qris') {
      if (qrisExpired) return;
      if (!qrisConfirmed) {
        setQrisProofError(t('order.qris.proofRequired'));
        return;
      }
    }

    if (Date.now() - lastSubmission.current < FORM_COOLDOWN_MS) return;
    lastSubmission.current = Date.now();

    const paymentLabel = paymentMethods.find(p => p.id === formData.payment)?.label || formData.payment;

    const message =
      `${t('order.wa.title')}` +
      `${t('order.wa.product')} ${language === 'en' ? product.name.en : product.name.id}\n` +
      `${t('order.wa.weight')} ${product.weight}\n` +
      `${t('order.wa.price')} ${formatPrice(product.price)}\n\n` +
      `${t('order.wa.customer')}\n` +
      `${t('order.wa.name')} ${formData.name}\n` +
      `${t('order.wa.phone')} ${formData.countryCode} ${formData.phone}\n` +
      `${formData.address ? `${t('order.wa.address')} ${formData.address}\n` : ''}` +
      `${t('order.wa.payment')} ${paymentLabel}\n` +
      `${formData.payment === 'qris' ? `${t('order.wa.qris.note')}\n` : ''}` +
      `${formData.notes ? `${t('order.wa.notes')} ${formData.notes}\n` : ''}\n` +
      `${t('order.wa.thanks')}`;

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
              <div className="flex gap-2">
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={t('order.addressPlaceholder')}
                  maxLength={160}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setShowMap((prev) => !prev)}
                  title={t('order.addressMaps')}
                  aria-label={t('order.addressMaps')}
                  aria-pressed={showMap}
                  className={showMap ? 'shrink-0 border-primary text-primary' : 'shrink-0'}
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
              {showMap && (
                <div className="mt-3 overflow-hidden rounded-lg border border-border">
                  <iframe
                    title={t('order.map.title')}
                    src={`https://www.google.com/maps?q=${STORE_LAT},${STORE_LNG}&z=16&hl=${language}&output=embed`}
                    className="h-64 w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
              {showMap && (
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyStoreAddress}
                    className="shrink-0 border-primary/40 text-primary hover:bg-primary/10"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? t('order.map.copied') : t('order.map.copy')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={openGoogleMaps}
                    className="shrink-0 border-primary/40 text-primary hover:bg-primary/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('order.map.open')}
                  </Button>
                </div>
              )}
              {showMap && (
                <p className="mt-2 text-xs text-muted-foreground dark:text-white/80">
                  {t('order.map.hint')}
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

              {formData.payment === 'qris' && !qrisExpired && (
                <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{t('order.qris.expires')}</span>
                    <span className="tabular-nums">{formatCountdown(secondsLeft)}</span>
                  </div>

                  <div className="mx-auto w-52 rounded-2xl bg-white p-4">
                    <img
                      src={qrisImage}
                      alt="QRIS"
                      decoding="async"
                      className="w-full h-auto"
                    />
                  </div>

                  <p className="mt-4 text-sm text-foreground">{t('order.qris.scan')}</p>

                  <div className="mt-3 rounded-lg border border-amber-400/40 bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 text-left">
                    {t('order.qris.proofReminder')}
                  </div>

                  <div
                    role="checkbox"
                    aria-checked={qrisConfirmed}
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const next = !qrisConfirmed;
                      setQrisConfirmed(next);
                      if (next) setQrisProofError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        const next = !qrisConfirmed;
                        setQrisConfirmed(next);
                        if (next) setQrisProofError('');
                      }
                    }}
                    className="mt-3 flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-left cursor-pointer select-none"
                  >
                    <Checkbox
                      type="button"
                      checked={qrisConfirmed}
                      onCheckedChange={(checked) => {
                        setQrisConfirmed(Boolean(checked));
                        if (checked) setQrisProofError('');
                      }}
                      className="mt-0.5 pointer-events-none"
                    />
                    <span className="text-xs text-foreground">{t('order.qris.confirm')}</span>
                  </div>
                  {qrisProofError && (
                    <p className="mt-2 text-sm text-destructive">{qrisProofError}</p>
                  )}
                </div>
              )}

              {qrisExpired && (
                <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-foreground">
                  <p className="font-semibold">{t('order.qris.expired.title')}</p>
                  <p className="mt-1 text-xs text-muted-foreground dark:text-white/80">{t('order.qris.expired.desc')}</p>
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