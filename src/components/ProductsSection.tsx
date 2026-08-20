import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import honeyVisual from '@/assets/honey-visual.png';

export interface Product {
  id: string;
  name: {
    id: string;
    en: string;
  };
  price: number;
  weight: string;
  image: string;
  type: 'glass';
}

interface ProductsSectionProps {
  products: Product[];
  onOrderProduct: (product: Product) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products, onOrderProduct }) => {
  const { t, language } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-honey-cream via-honey-light/30 to-honey-gold/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-20 opacity-20 pointer-events-none hidden md:block">
        <img src={honeyVisual} alt="" className="w-64 h-64 md:w-80 md:h-80 object-contain -rotate-12" />
      </div>
      <div className="absolute right-0 bottom-20 opacity-15 pointer-events-none hidden lg:block">
        <img src={honeyVisual} alt="" className="w-48 h-48 md:w-64 md:h-64 object-contain rotate-12" />
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
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            {t('products.title')}
          </span>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4">
            {t('products.subtitle')}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
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
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-honey-light to-honey-cream rounded-xl">
                <img
                  src={product.image}
                  alt={language === 'en' ? product.name.en : product.name.id}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 rounded-lg"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-amber-400 text-amber-900`}>
                    Glass
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-serif text-base font-semibold text-foreground mb-1">
                  {language === 'en' ? product.name.en : product.name.id}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                  <span>{t('products.weight')}:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                  <Button
                    onClick={() => onOrderProduct(product)}
                    className="honey-gradient text-white border-0 hover:opacity-90"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {t('products.order')}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
