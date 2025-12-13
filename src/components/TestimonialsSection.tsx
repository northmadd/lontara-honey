import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  happyPeopleImage: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ happyPeopleImage }) => {
  const { language } = useLanguage();

  const testimonials = [
    {
      name: 'Ammar Abdullah',
      role: language === 'id' ? 'Desainer Profesional' : 'Professional Designer',
      text: language === 'id' 
        ? 'Madu terbaik yang pernah saya coba! Rasanya autentik dan kualitasnya luar biasa.'
        : 'The best honey I\'ve ever tasted! Authentic flavor and exceptional quality.',
      rating: 5,
    },
    {
      name: 'John Wick',
      role: language === 'id' ? 'Pengusaha Kuliner' : 'Culinary Entrepreneur',
      text: language === 'id'
        ? 'Lontara Honey adalah pilihan utama untuk membuat tubuh saya selalu terjaga manfaatnya WOAW!!'
        : 'Lontara Honey is the main choice to keep my body healthy. WOAW!!',
      rating: 5,
    },
    {
      name: 'Hj. Ariani',
      role: language === 'id' ? 'Pendiri Bisnis' : 'Business Founder',
      text: language === 'id'
        ? 'Keluarga saya sangat menyukai madu ini! Anak-anak sekarang lebih suka madu daripada gula.'
        : 'My family very loves this honey! Kids now prefer honey over sugar.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-honey-gold/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-honey-amber/10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            {language === 'id' ? 'Testimoni' : 'Testimonials'}
          </span>
          <div className="mx-auto mt-3 h-px w-24 bg-honey-gold/70" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4">
            {language === 'id' ? 'Pelanggan Bahagia' : 'Happy Customers'}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {language === 'id' 
              ? 'Bergabung dengan ribuan pelanggan yang telah merasakan keajaiban madu Lontara'
              : 'Join thousands of customers who have experienced the magic of Lontara Honey'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={happyPeopleImage}
              alt="Happy customers enjoying Lontara Honey"
              className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-honey-dark/30 to-transparent" />
          </motion.div>

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="honey-card p-6 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
