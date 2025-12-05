import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Wallet, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Product } from './ProductsSection';

const WHATSAPP_NUMBER = '6289520331695';

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
    phone: '',
    notes: '',
    payment: 'bank',
  });

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
    { id: 'ewallet', label: t('order.ewallet'), icon: Wallet },
    { id: 'cod', label: t('order.cod'), icon: Truck },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentLabel = paymentMethods.find(p => p.id === formData.payment)?.label || formData.payment;
    
    const message = `🍯 *NEW ORDER - LONTARA HONEY*\n\n` +
      `*Product:* ${t(product.nameKey)}\n` +
      `*Weight:* ${product.weight}\n` +
      `*Price:* ${formatPrice(product.price)}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
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
          className="relative bg-card rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card p-6 border-b border-border flex items-center justify-between">
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
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={t(product.nameKey)}
                className="w-24 h-24 object-contain bg-background rounded-xl p-2"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {t(product.nameKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
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
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('order.name')} *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('order.phone')} *
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+62 812 3456 7890"
                required
              />
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
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      formData.payment === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <method.icon className={`w-6 h-6 mx-auto mb-2 ${
                      formData.payment === method.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-xs font-medium ${
                      formData.payment === method.id ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full honey-gradient text-foreground border-0 hover:opacity-90 py-6 text-lg font-semibold"
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
