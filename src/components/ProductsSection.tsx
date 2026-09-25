import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ShoppingBag, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SlowZoomImage from '@/components/SlowZoomImage';
import honeyVisual from '@/assets/honey-visual.webp';

export interface ProductDetail {
  description: { id: string; en: string };
  benefits: { id: string[]; en: string[] };
  usage: { id: string[]; en: string[] };
  storage: { id: string; en: string };
}

export interface Product {
  id: string;
  name: {
    id: string;
    en: string;
  };
  price: number;
  weight: string;
  image: string;
  type: 'glass' | 'plastic';
  details: ProductDetail;
}

interface ProductsSectionProps {
  products: Product[];
  onOrderProduct: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products, onOrderProduct, onViewProduct }) => {
  const { t, language } = useLanguage();
  const productGroups = [
    {
      type: 'plastic' as const,
      titleKey: 'products.packaging.plastic',
      icon: '♻',
      products: products.filter((product) => product.type === 'plastic'),
    },
    {
      type: 'glass' as const,
      titleKey: 'products.packaging.glass',
      icon: '✦',
      products: products.filter((product) => product.type === 'glass'),
    },
  ];

  const formatPriceIDR = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatPriceUSD = (price: number) => {
    const usdRate = 17757.40; // 1 USD = 17,757.40 IDR (as of August 30, 2026)
    const priceInUSD = price / usdRate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(priceInUSD);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-muted via-background to-honey-light relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-20 opacity-20 pointer-events-none hidden md:block">
        <img src={honeyVisual} alt="" loading="lazy" decoding="async" className="w-64 h-64 md:w-80 md:h-80 object-contain -rotate-12" />
      </div>
      <div className="absolute right-0 bottom-20 opacity-15 pointer-events-none hidden lg:block">
        <img src={honeyVisual} alt="" loading="lazy" decoding="async" className="w-48 h-48 md:w-64 md:h-64 object-contain rotate-12" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-honey-gold font-medium uppercase tracking-wider text-sm">
            {t('products.title')}
          </span>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4">
            {t('products.subtitle')}
          </h2>
          <p className="mt-2 text-muted-foreground dark:text-white/80 max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </motion.div>

        {/* Products grouped by packaging */}
        <div className="space-y-14">
          {productGroups.map((group) => (
            <div key={group.type}>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-lg text-amber-900">
                  {group.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-honey-gold">{t('products.selection')}</p>
                  <h3 className="font-serif text-2xl font-bold text-foreground">{t(group.titleKey)}</h3>
                </div>
                <div className="h-px flex-1 bg-honey-gold/40" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {group.products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="honey-card overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Product Image */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onViewProduct(product)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onViewProduct(product);
                        }
                      }}
                      className="relative h-80 overflow-hidden bg-muted/70 rounded-xl cursor-pointer group/image"
                      aria-label={`${language === 'en' ? product.name.en : product.name.id} - ${t('products.viewDetails')}`}
                    >
                      <SlowZoomImage
                        src={product.image}
                        alt={language === 'en' ? product.name.en : product.name.id}
                        imgClassName="rounded-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-400 text-amber-900">
                          {t(`products.packaging.${product.type}`)}
                        </span>
                      </div>

                      {/* Tap to view details hint */}
                      <div className="absolute inset-x-0 bottom-4 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/70 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-background opacity-80 transition-all duration-300 group-hover/image:bg-honey-gold group-hover/image:text-white group-hover/image:opacity-100">
                          <ZoomIn className="w-3.5 h-3.5" />
                          {t('products.viewDetails')}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3">
                      <h3 className="font-sans text-base font-bold text-foreground mb-1" style={{ fontFamily: "'Fira Sans', sans-serif" }}>
                        {language === 'en' ? product.name.en : product.name.id}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground dark:text-white/80 text-xs mb-2">
                        <span>{t('products.weight')}:</span>
                        <span className="font-medium">{product.weight}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-lg font-bold text-honey-gold">
                          {formatPriceIDR(product.price)}
                        </span>
                        <span className="text-border font-medium">|</span>
                        <span className="text-lg font-bold text-honey-gold">
                          {formatPriceUSD(product.price)}
                        </span>
                      </div>
                      <Button
                        onClick={() => onOrderProduct(product)}
                        className="honey-gradient text-white border-2 border-transparent hover:bg-none hover:text-honey-gold hover:border-honey-gold mt-3"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {t('products.order')}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
