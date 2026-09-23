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
  {
    name: 'Rina Wahyuni',
    city: { id: 'Bandung', en: 'Bandung' },
    rating: 5,
    date: { id: '1 bulan lalu', en: '1 month ago' },
    text: {
      id: 'Pagi-pagi anak saya minum madu ini, lebih semangat dan jarang sakit. Terima kasih Lontara Honey!',
      en: 'My child drinks this honey every morning, more energetic and rarely getting sick. Thank you, Lontara Honey!',
    },
  },
  {
    name: 'Muhammad Rizky',
    city: { id: 'Yogyakarta', en: 'Yogyakarta' },
    rating: 5,
    date: { id: '1 bulan lalu', en: '1 month ago' },
    text: {
      id: 'Harga sebanding dengan kualitas. Madu hutan asli dengan rasa yang dalam. Pasti repeat order.',
      en: 'Price matches the quality. Authentic forest honey with a rich, deep flavor. Will definitely order again.',
    },
  },
  {
    name: 'Fitri Handayani',
    city: { id: 'Medan', en: 'Medan' },
    rating: 5,
    date: { id: '1 bulan lalu', en: '1 month ago' },
    text: {
      id: 'Kemasannya elegan, cocok banget buat kado. Baru dibuka tutupnya baunya sudah menggoda.',
      en: 'Elegant packaging, perfect as a gift. The aroma is tempting even before opening it.',
    },
  },
  {
    name: 'Agus Wijaya',
    city: { id: 'Semarang', en: 'Semarang' },
    rating: 4,
    date: { id: '2 bulan lalu', en: '2 months ago' },
    text: {
      id: 'Madunya enak dan kental, cuma sayang ukuran 140g cepat habis. Langsung order yang besar.',
      en: 'Delicious and thick, too bad the 140g size runs out quickly. Straight to the bigger size.',
    },
  },
  {
    name: 'Sinta Permata',
    city: { id: 'Palembang', en: 'Palembang' },
    rating: 5,
    date: { id: '2 bulan lalu', en: '2 months ago' },
    text: {
      id: 'Sehari cukup sesendok, badan terasa lebih fit. Sudah terbukti dari pengalaman 3 bulan memakai.',
      en: 'One spoonful a day keeps me feeling fit. Proven over 3 months of use.',
    },
  },
  {
    name: 'Hendra Gunawan',
    city: { id: 'Balikpapan', en: 'Balikpapan' },
    rating: 5,
    date: { id: '2 bulan lalu', en: '2 months ago' },
    text: {
      id: 'Sudah coba beberapa merek, paling puas di sini. 100% murni, bedanya langsung terasa.',
      en: 'Tried several brands and this is the most satisfying. 100% pure, the difference is immediately noticeable.',
    },
  },
  {
    name: 'Nurhayati',
    city: { id: 'Makassar', en: 'Makassar' },
    rating: 4,
    date: { id: '2 bulan lalu', en: '2 months ago' },
    text: {
      id: 'Rasanya autentik. Sempat bingung karena lama-lama mengkristal, ternyata itu hal normal dan kualitasnya tetap.',
      en: 'The taste is authentic. I was confused when it crystallized over time, but it turns out that is normal and quality stays.',
    },
  },
  {
    name: 'Yuliana Putri',
    city: { id: 'Denpasar', en: 'Denpasar' },
    rating: 5,
    date: { id: '3 bulan lalu', en: '3 months ago' },
    text: {
      id: 'Dikirim sampai Bali dengan aman, paket tidak bocor. Pas untuk campuran teh hangat.',
      en: 'Shipped safely all the way to Bali, no leaks. Perfect in warm tea.',
    },
  },
  {
    name: 'Dimas Aditya',
    city: { id: 'Bogor', en: 'Bogor' },
    rating: 5,
    date: { id: '3 bulan lalu', en: '3 months ago' },
    text: {
      id: 'Warna madunya cantik, sedikit gelap — bukti asli dari hutan liar. Anak balita saya pun doyan.',
      en: 'Beautiful deep color — proof of wild forest origin. Even my toddler loves it.',
    },
  },
  {
    name: 'Sri Rahayu',
    city: { id: 'Solo', en: 'Solo' },
    rating: 5,
    date: { id: '3 bulan lalu', en: '3 months ago' },
    text: {
      id: 'Pakai untuk katering pengantin, para tamu sampai bertanya madunya dari mana. Terbaik di kelasnya.',
      en: 'Used it for a wedding catering and guests kept asking where the honey was from. Best in its class.',
    },
  },
  {
    name: 'Fajar Ramadhan',
    city: { id: 'Mataram', en: 'Mataram' },
    rating: 5,
    date: { id: '4 bulan lalu', en: '4 months ago' },
    text: {
      id: 'Layanan WhatsApp-nya cepat dan ramah, dibantu pilih produk sesuai kebutuhan. Recommended seller!',
      en: 'Fast and friendly WhatsApp service, they helped me pick the right product. Recommended seller!',
    },
  },
  {
    name: 'Lestari Indah',
    city: { id: 'Pontianak', en: 'Pontianak' },
    rating: 5,
    date: { id: '4 bulan lalu', en: '4 months ago' },
    text: {
      id: 'Madu kelulut jadi favorit saya, asam-manis khas dan menyegarkan. Sudah langganan tiap bulan.',
      en: 'Stingless bee honey is my favorite — characteristically sweet-sour and refreshing. A monthly subscription now.',
    },
  },
  {
    name: 'Andika Pratama',
    city: { id: 'Padang', en: 'Padang' },
    rating: 4,
    date: { id: '4 bulan lalu', en: '4 months ago' },
    text: {
      id: 'Bagus, hanya pengiriman ke Padang agak lama. Untung ada info tracking, jadi tetap tenang.',
      en: 'Great honey, shipping to Padang was just a bit slow. Luckily there is tracking, so it was reassuring.',
    },
  },
  {
    name: 'Ratna Sari',
    city: { id: 'Banjarmasin', en: 'Banjarmasin' },
    rating: 5,
    date: { id: '5 bulan lalu', en: '5 months ago' },
    text: {
      id: 'Bersih, tidak ada ampas. Prosesnya higienis, terbukti dari kemasan berlabel lengkap.',
      en: 'Clean with no debris. The process is hygienic, evident from fully labeled packaging.',
    },
  },
  {
    name: 'Bayu Pangestu',
    city: { id: 'Pekanbaru', en: 'Pekanbaru' },
    rating: 5,
    date: { id: '5 bulan lalu', en: '5 months ago' },
    text: {
      id: 'Setelah 2 minggu rutin, stamina terasa lebih baik. Madu asli memang beda.',
      en: 'After 2 weeks of daily use I feel more energetic. Real honey really is different.',
    },
  },
  {
    name: 'Melati Kusuma',
    city: { id: 'Malang', en: 'Malang' },
    rating: 5,
    date: { id: '5 bulan lalu', en: '5 months ago' },
    text: {
      id: 'Kemasan aman sampai tangan, ada segelnya. Sudah jadi langganan stok keluarga di rumah.',
      en: 'Safe packaging that arrives sealed. Has become our family\'s regular stock at home.',
    },
  },
  {
    name: 'Syahrul Alamsyah',
    city: { id: 'Palu', en: 'Palu' },
    rating: 4,
    date: { id: '6 bulan lalu', en: '6 months ago' },
    text: {
      id: 'Produknya top. Sempat bingung karena mengkristal, tapi info dari tim bilang itu wajar.',
      en: 'Top-notch product. Was confused by crystallization, but the team explained it\'s perfectly normal.',
    },
  },
  {
    name: 'Tessa Anggriani',
    city: { id: 'Kupang', en: 'Kupang' },
    rating: 5,
    date: { id: '6 bulan lalu', en: '6 months ago' },
    text: {
      id: 'Harga terjangkau untuk kualitas premium. Bisa kirim sampai NTT saja, luar biasa.',
      en: 'Affordable price for premium quality. They even ship to NTT — amazing.',
    },
  },
  {
    name: 'Ilham Maulana',
    city: { id: 'Makassar', en: 'Makassar' },
    rating: 5,
    date: { id: '7 bulan lalu', en: '7 months ago' },
    text: {
      id: 'Yang bikin percaya: ada nomor uji lab dan sertifikat. Transparan dan profesional. Sukses selalu, Lontara!',
      en: 'What earns trust: lab test numbers and certificates. Transparent and professional. Best of luck, Lontara!',
    },
  },
];