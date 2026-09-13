import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Volume2, VolumeX } from 'lucide-react';

const WHATSAPP_NUMBER = '6282347905543';

interface WhatsAppButtonProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ isMuted, onToggleMute }) => {
  const handleClick = () => {
    const message = 'Hello! I\'m interested in Lontara Honey products.';
    const encodedMessage = encodeURIComponent(message);
    const webUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    window.open(webUrl, '_blank');
  };

  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-40 flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute backsound' : 'Mute backsound'}
        className="w-14 h-14 rounded-full bg-card text-foreground border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.85, type: 'spring', bounce: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </motion.button>

      <motion.button
        type="button"
        onClick={handleClick}
        className="relative w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-7 h-7" />

        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;
