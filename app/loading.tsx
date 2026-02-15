import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["GENERATION", "BEST THING", "INNOVATION"];

const Loading = ({ onComplete }: { onComplete: () => void }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [showH, setShowH] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Animation Sequence (20% faster)
    // 1. Wait a bit, then show H (800ms -> 640ms)
    const hTimeout = setTimeout(() => setShowH(true), 640);

    // 2. Rotate words (1200ms -> 960ms)
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev === words.length - 1) {
          clearInterval(wordInterval);
          // 3. Mark as finished after the last word (1500ms -> 1200ms)
          setTimeout(() => setIsFinished(true), 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 960);

    return () => {
      clearTimeout(hTimeout);
      clearInterval(wordInterval);
    };
  }, []);

  useEffect(() => {
    if (isFinished) {
      onComplete();
    }
  }, [isFinished, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#020617] z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 text-center">
        {/* Main Logo Text - Forced LTR for English branding */}
        <div dir="ltr" className="flex items-center justify-center text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
          <motion.span layout transition={{ type: "spring", stiffness: 200, damping: 20 }}>
            T
          </motion.span>

          <AnimatePresence>
            {showH && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-teal-400"
              >
                H
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span layout transition={{ type: "spring", stiffness: 200, damping: 20 }}>
            ENEXT
          </motion.span>
        </div>

        {/* Rotating Words */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={words[wordIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-teal-400/80 text-lg font-medium tracking-[0.2em] uppercase"
            >
              {words[wordIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading Bar (Subtle) */}
        <div className="mt-12 w-48 h-[2px] bg-white/5 mx-auto rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.6, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
