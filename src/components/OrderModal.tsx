import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Wallet, Truck, Clock, Copy, Check, ExternalLink, Upload, Trash2, Search } from 'lucide-react';
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
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? '';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? '';
const PROOF_UPLOAD_FOLDER = 'bukti-transfer';
const PROOF_MAX_SIZE_MB = 5;

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
  const [mapQuery, setMapQuery] = useState('');
  const [mapTarget, setMapTarget] = useState('');
  const [qrisExpired, setQrisExpired] = useState(false);
  const [qrisAgreed, setQrisAgreed] = useState(false);
  const [qrisConfirmed, setQrisConfirmed] = useState(false);
  const [qrisProofError, setQrisProofError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(QRIS_EXPIRY_MS / 1000);
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState('');
  const [sending, setSending] = useState(false);
  const proofPreviewRef = useRef('');
  const lastSubmission = useRef(0);

  // QRIS session: 10 minutes after agreeing, then reset the payment data.
  useEffect(() => {
    if (formData.payment !== 'qris' || !qrisAgreed) return;

    const expiresAt = Date.now() + QRIS_EXPIRY_MS;
    setQrisExpired(false);
    setQrisConfirmed(false);
    setQrisProofError('');
    setProofFile(null);
    setProofPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      proofPreviewRef.current = '';
      return '';
    });
    setSecondsLeft(QRIS_EXPIRY_MS / 1000);

    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(interval);
        setQrisExpired(true);
        setQrisAgreed(false);
        setProofFile(null);
        setProofPreview((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          proofPreviewRef.current = '';
          return '';
        });
        setFormData((prev) => ({ ...prev, payment: 'bank' }));
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [formData.payment, qrisAgreed]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (proofPreviewRef.current) {
        URL.revokeObjectURL(proofPreviewRef.current);
        proofPreviewRef.current = '';
      }
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

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapTarget || `${STORE_LAT},${STORE_LNG}`,
  )}&z=16&hl=${language}&output=embed`;

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

  const handleProofSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setQrisProofError(t('order.qris.proof.invalid'));
      return;
    }
    if (file.size > PROOF_MAX_SIZE_MB * 1024 * 1024) {
      setQrisProofError(t('order.qris.proof.tooLarge'));
      return;
    }
    setQrisProofError('');
    setProofFile(file);
    if (proofPreviewRef.current) URL.revokeObjectURL(proofPreviewRef.current);
    proofPreviewRef.current = URL.createObjectURL(file);
    setProofPreview(proofPreviewRef.current);
  };

  const removeProof = () => {
    if (proofPreviewRef.current) URL.revokeObjectURL(proofPreviewRef.current);
    proofPreviewRef.current = '';
    setProofPreview('');
    setProofFile(null);
  };

  const uploadProof = async (): Promise<string> => {
    if (!proofFile) throw new Error('no-file');
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) throw new Error('no-config');
    const body = new FormData();
    body.append('file', proofFile);
    body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    body.append('folder', PROOF_UPLOAD_FOLDER);
    body.append('context', `customer=${formData.name};order=${language === 'en' ? product.name.en : product.name.id}`);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body },
    );
    if (!res.ok) throw new Error('upload-failed');
    const data = (await res.json()) as { secure_url?: string };
    if (!data.secure_url) throw new Error('no-url');
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) return;

    if (!formData.phone.trim()) {
      setPhoneError(t('order.phoneRequired'));
      return;
    }

    if (formData.payment === 'qris') {
      if (qrisExpired) return;
      if (!qrisAgreed) {
        setQrisProofError(t('order.qris.rules.required'));
        return;
      }
      if (!qrisConfirmed) {
        setQrisProofError(t('order.qris.proofRequired'));
        return;
      }
      if (!proofFile) {
        setQrisProofError(t('order.qris.proof.required'));
        return;
      }
    }

    if (Date.now() - lastSubmission.current < FORM_COOLDOWN_MS) return;
    lastSubmission.current = Date.now();

    const paymentLabel = paymentMethods.find(p => p.id === formData.payment)?.label || formData.payment;

    const buildMessage = (proofUrl: string) =>
      `${t('order.wa.title')}` +
      `${t('order.wa.product')} ${language === 'en' ? product.name.en : product.name.id}\n` +
      `${t('order.wa.weight')} ${product.weight}\n` +
      `${t('order.wa.price')} ${formatPrice(product.price)}\n\n` +
      `${t('order.wa.customer')}\n` +
      `${t('order.wa.name')} ${formData.name}\n` +
      `${t('order.wa.phone')} ${formData.countryCode} ${formData.phone}\n` +
      `${formData.address ? `${t('order.wa.address')} ${formData.address}\n` : ''}` +
      `${t('order.wa.payment')} ${paymentLabel}\n` +
      `${formData.payment === 'qris' ? `${t('order.wa.qris.note')} ${proofUrl || t('order.wa.qris.manual')}\n` : ''}` +
      `${formData.notes ? `${t('order.wa.notes')} ${formData.notes}\n` : ''}\n` +
      `${t('order.wa.thanks')}`;

    if (formData.payment === 'qris') {
      setSending(true);
      try {
        let proofUrl = '';
        if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
          proofUrl = await uploadProof();
        }
        openWhatsApp(buildMessage(proofUrl));
        onClose();
      } catch {
        lastSubmission.current = 0;
        setQrisProofError(t('order.qris.proof.uploadFailed'));
      } finally {
        setSending(false);
      }
      return;
    }

    openWhatsApp(buildMessage(''));
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
          className="relative bg-card rounded-3xl shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto"
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
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={t('order.addressPlaceholder')}
                maxLength={160}
              />

              <div className="mt-3 overflow-hidden rounded-lg border border-border">
                <div className="flex gap-2 border-b border-border bg-card p-2">
                  <Input
                    value={mapQuery}
                    onChange={(e) => setMapQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        setMapTarget(mapQuery);
                      }
                    }}
                    placeholder={t('order.map.search')}
                    className="h-9 flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setMapTarget(mapQuery)}
                    className="shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    {t('order.map.searchBtn')}
                  </Button>
                </div>
                <iframe
                  title={t('order.map.title')}
                  src={mapSrc}
                  className="h-64 w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

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

              <p className="mt-2 text-xs text-muted-foreground dark:text-white/80">
                {t('order.map.hint')}
              </p>
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
                  {qrisAgreed ? (
                    <>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
                        <Clock className="w-4 h-4" />
                        <span>{t('order.qris.expires')}</span>
                        <span className="tabular-nums">{formatCountdown(secondsLeft)}</span>
                      </div>

                      <div className="mx-auto w-52 md:w-64 rounded-2xl bg-white p-4">
                        <img
                          src={qrisImage}
                          alt="QRIS"
                          decoding="async"
                          className="w-full h-auto"
                        />
                      </div>

                      <p className="mt-4 text-sm text-foreground">{t('order.qris.scan')}</p>

                      <div className="mt-3 rounded-xl border border-border bg-card p-4 text-left">
                        <p className="text-sm font-semibold text-foreground">{t('order.qris.proof.label')}</p>
                        <p className="mt-1 text-xs text-muted-foreground dark:text-white/80">{t('order.qris.proof.hint')}</p>

                        {proofPreview ? (
                          <div className="mt-3">
                            <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                              <img src={proofPreview} alt="Transfer proof" className="max-h-52 w-full object-contain" />
                            </div>
                            <div className="mt-2 flex gap-2">
                              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
                                <Upload className="h-3.5 w-3.5" />
                                {t('order.qris.proof.replace')}
                                <input type="file" accept="image/*" className="sr-only" onChange={handleProofSelect} />
                              </label>
                              <button
                                type="button"
                                onClick={removeProof}
                                className="inline-flex items-center gap-2 rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                {language === 'en' ? 'Remove' : 'Hapus'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-5 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
                            <Upload className="h-5 w-5" />
                            {t('order.qris.proof.upload')}
                            <input type="file" accept="image/*" className="sr-only" onChange={handleProofSelect} />
                          </label>
                        )}
                      </div>

                      <div className="mt-3 rounded-lg border border-amber-400/40 bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 text-left">
                        {t('order.qris.proofReminder')}
                      </div>

                      <div
                        role="checkbox"
                        aria-checked={qrisConfirmed}
                        aria-disabled={!proofFile}
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!proofFile) {
                            setQrisProofError(t('order.qris.proof.required'));
                            return;
                          }
                          const next = !qrisConfirmed;
                          setQrisConfirmed(next);
                          if (next) setQrisProofError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!proofFile) {
                              setQrisProofError(t('order.qris.proof.required'));
                              return;
                            }
                            const next = !qrisConfirmed;
                            setQrisConfirmed(next);
                            if (next) setQrisProofError('');
                          }
                        }}
                        className={`mt-3 flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-left cursor-pointer select-none ${
                          !proofFile ? 'opacity-70' : ''
                        }`}
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
                        <p className="mt-2 text-sm font-medium text-honey-gold">{qrisProofError}</p>
                      )}
                    </>
                  ) : (
                    <div className="rounded-xl border border-border bg-card p-4 text-left">
                      <p className="text-sm font-semibold text-foreground">{t('order.qris.rules.title')}</p>
                      <p className="mt-1 text-xs text-muted-foreground dark:text-white/80">{t('order.qris.rules.intro')}</p>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{t('order.qris.rules.rule1')}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{t('order.qris.rules.rule2')}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{t('order.qris.rules.rule3')}</span>
                        </li>
                      </ul>
                      <div
                        role="checkbox"
                        aria-checked={qrisAgreed}
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQrisAgreed(true);
                          setQrisProofError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            e.stopPropagation();
                            setQrisAgreed(true);
                            setQrisProofError('');
                          }
                        }}
                        className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-primary/40 bg-background p-3 text-left select-none transition-colors hover:bg-primary/5"
                      >
                        <Checkbox
                          type="button"
                          checked={qrisAgreed}
                          onCheckedChange={() => setQrisAgreed(true)}
                          className="pointer-events-none"
                        />
                        <span className="text-xs font-medium text-foreground">{t('order.qris.rules.agree')}</span>
                      </div>
                    </div>
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
              disabled={sending}
              className="w-full honey-gradient text-white border-0 hover:opacity-90 py-6 text-lg font-semibold"
            >
              {sending ? t('order.qris.proof.uploading') : t('order.submit')}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderModal;