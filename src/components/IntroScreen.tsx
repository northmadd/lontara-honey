import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoLontara from '@/assets/logo-lontara.webp';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  // Mulai langsung di phase 2 agar tidak ada frame kosong
  const [phase, setPhase] = useState(2);

  useEffect(() => {
    // Phase timing
    const timers = [
      setTimeout(() => setPhase(3), 2000), // Text appears
      setTimeout(() => setPhase(4), 5500), // Fade out
      setTimeout(() => onComplete(), 6500), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);


  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
          style={{
            background:
              'linear-gradient(180deg, #1a1408 0%, #2d1f0d 50%, #3d2a12 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated honey drips */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 rounded-full"
                style={{
                  background:
                    'linear-gradient(180deg, #d4a056 0%, #c4872e 50%, #a86b24 100%)',
                  left: `${10 + i * 12}%`,
                  height: '200px',
                  top: '-200px',
                  filter: 'blur(1px)',
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, 800, 1200],
                  opacity: [0, 1, 0],
                  scaleX: [1, 1.2, 0.8],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  ease: 'easeIn',
                }}
              />
            ))}
          </div>

          {/* Glowing orb */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,160,86,0.4) 0%, rgba(212,160,86,0.1) 50%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1],
              opacity: [0, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
          />

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Honeycomb pattern */}
            <motion.div
              className="absolute -inset-32 opacity-10"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: 0.1,
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
              >
                <pattern
                  id="honeycomb"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M5 0L10 2.5V7.5L5 10L0 7.5V2.5Z"
                    fill="none"
                    stroke="#d4a056"
                    strokeWidth="0.5"
                  />
                </pattern>

                <rect
                  width="100"
                  height="100"
                  fill="url(#honeycomb)"
                />
              </svg>
            </motion.div>

            {/* Logo */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                type: 'spring',
                bounce: 0.4,
              }}
            >
              <div className="relative inline-block">
                <motion.div
                  className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full flex items-center justify-center overflow-hidden bg-black/40"
                  style={{
                    background:
                      'linear-gradient(135deg, #d4a056 0%, #c4872e 50%, #8b5a1b 100%)',
                    boxShadow:
                      '0 0 60px rgba(212,160,86,0.6), inset 0 0 30px rgba(255,255,255,0.2)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(212,160,86,0.6), inset 0 0 30px rgba(255,255,255,0.2)',
                      '0 0 80px rgba(212,160,86,0.8), inset 0 0 40px rgba(255,255,255,0.3)',
                      '0 0 60px rgba(212,160,86,0.6), inset 0 0 30px rgba(255,255,255,0.2)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <img
                    src={logoLontara}
                    alt="Lontara Honey logo"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Honey drop from logo */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -ml-2 w-4 h-8 rounded-full"
                  style={{
                    background:
                      'linear-gradient(180deg, #d4a056, #8b5a1b)',
                  }}
                  initial={{
                    scaleY: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scaleY: [0, 1, 1.2, 0.8],
                    opacity: [0, 1, 1, 0],
                    y: [0, 0, 20, 60],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4"
              style={{
                color: '#d4a056',
                textShadow:
                  '0 0 40px rgba(212,160,86,0.5), 0 0 80px rgba(212,160,86,0.3)',
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={
                phase >= 3
                  ? { y: 0, opacity: 1 }
                  : {}
              }
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            >
              LONTARA
            </motion.h1>

            {/* Honey */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-[0.3em]"
              style={{
                color: '#e8c88b',
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={
                phase >= 3
                  ? { y: 0, opacity: 1 }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }}
            >
              HONEY
            </motion.h2>

            {/* Tagline */}
            <motion.p
              className="mt-6 text-lg md:text-xl tracking-widest uppercase"
              style={{
                color: '#a08060',
              }}
              initial={{ opacity: 0 }}
              animate={
                phase >= 3
                  ? { opacity: 1 }
                  : {}
              }
              transition={{
                duration: 1,
                delay: 0.5,
              }}
            >
              The Golden Treasure of Sulawesi
            </motion.p>
          </div>

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background:
                'linear-gradient(0deg, rgba(26,20,8,1) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;