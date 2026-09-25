export interface Testimonial {
  name: string;
  city: { id: string; en: string };
  rating: number;
  date: { id: string; en: string };
  text: { id: string; en: string };
}

export const reviews: Testimonial[] = [
  {
    name: 'Ammar Abdullah',
    city: { id: 'Makassar', en: 'Makassar' },
    rating: 5,
    date: { id: '2 hari lalu', en: '2 days ago' },
    text: {
      id: 'Rasanya khas madu hutan, ada aroma bunga yang lembut. Sudah order 3 kali dan kualitasnya selalu konsisten.',
      en: 'It tastes like true forest honey with a soft floral aroma. Ordered 3 times and the quality is always consistent.',
    },
  },
  {
    name: 'Hj. Sitti Nurhaliza',
    city: { id: 'Gowa', en: 'Gowa' },
    rating: 5,
    date: { id: '1 minggu lalu', en: '1 week ago' },
    text: {
      id: 'Anak-anak saya sangat suka. Manisnya pas, teksturnya kental dan asli. Sangat direkomendasikan untuk keluarga.',
      en: 'My kids absolutely love it. Just the right sweetness, thick and authentic texture. Highly recommended for families.',
    },
  },
  {
    name: 'Andi Pranata',
    city: { id: 'Kendari', en: 'Kendari' },
    rating: 5,
    date: { id: '1 minggu lalu', en: '1 week ago' },
    text: {
      id: 'Pengiriman cepat, packing rapi pakai toples food-grade. Saya pesan untuk hampers kantor, semuanya puas.',
      en: 'Fast delivery and neat packaging in food-grade jars. I ordered it for office hampers and everyone was satisfied.',
    },
  },
  {
    name: 'Dewi Anggraini',
    city: { id: 'Jakarta Selatan', en: 'South Jakarta' },
    rating: 5,
    date: { id: '3 minggu lalu', en: '3 weeks ago' },
    text: {
      id: 'Beda banget sama madu di pasaran, warnanya pekat dan wanginya khas. Dicampur lemon bikin tenggorokan adem.',
      en: 'Totally different from ordinary honey in stores — deep color and distinctive aroma. Mixing it with lemon soothes my throat.',
    },
  },
  {
    name: 'Budi Santoso',
    city: { id: 'Surabaya', en: 'Surabaya' },
    rating: 4,
    date: { id: '3 minggu lalu', en: '3 weeks ago' },
    text: {
      id: 'Kualitasnya bagus, hanya pengiriman sempat tertunda sehari. Madunya sendiri layak dapat 5 bintang.',
      en: 'Good quality — delivery was just delayed by a day. The honey itself deserves 5 stars.',
    },
  },
];