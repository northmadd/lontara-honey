import backsound from '@/assets/wle.mp3';

let backsoundElement: HTMLAudioElement | null = null;

export const getBacksound = (): HTMLAudioElement => {
  if (!backsoundElement) {
    backsoundElement = new Audio(backsound);
    backsoundElement.preload = 'auto';
    backsoundElement.loop = true;
  }
  return backsoundElement;
};

// Dipanggil dari gesture user (tap tombol Enter). Memutar track secara senyap
// (muted) supaya browser menandai elemen ini sudah "diizinkan user". Belum ada
// suara yang terdengar; suara baru dinyalakan setelah intro selesai.
export const primeBacksound = (): void => {
  const audio = getBacksound();
  audio.loop = true;
  audio.muted = true;
  try {
    const result = audio.play();
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        // Diabaikan; akan dicoba lagi setelah intro selesai.
      });
    }
  } catch {
    // Diabaikan; akan dicoba lagi setelah intro selesai.
  }
};
