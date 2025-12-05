import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import honeyVisual from '@/assets/honey-visual.png';

export interface Product {
  id: string;
  nameKey: string;
  price: number;
  weight: string;
  image: string;
  type: 'plastic' | 'glass';
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
      <div className="absolute left-0 top-20 opacity-20 pointer-events-none">
        <img src={honeyVisual} alt="" className="w-80 h-80 object-contain -rotate-12" />
      </div>
      <div className="absolute right-0 bottom-20 opacity-15 pointer-events-none">
        <img src={honeyVisual} alt="" className="w-64 h-64 object-contain rotate-12" />
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-4">
            {t('products.subtitle')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-honey-light to-honey-cream">
                <img
                  src={product.image}
                  alt={t(product.nameKey)}
                  className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.type === 'glass' 
                      ? 'bg-honey-amber/20 text-honey-dark' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {product.type === 'glass' ? 'Glass' : 'Plastic'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {t(product.nameKey)}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <span>{t('products.weight')}:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    onClick={() => onOrderProduct(product)}
                    className="honey-gradient text-foreground border-0 hover:opacity-90"
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
