import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loading = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const interval = setInterval(() => {
        setProgress(old => {
            if (old >= 100) {
                clearInterval(interval);
                return 100;
            }
            // Non-linear progress simulation
            const increment = Math.random() * 15;
            return Math.min(old + increment, 100);
        });
    }, 200);

    // Completion timeout
    const timeout = setTimeout(() => {
        onComplete();
    }, 2500);

    return () => {
        clearInterval(interval);
        clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-teal-900 z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <div className="w-24 h-24 bg-teal-800 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl border border-teal-700/50">
            <svg className="w-12 h-12 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
        </div>
        <h1 className="text-4xl font-black text-white tracking-wide mb-2">טנ״א 360</h1>
        <p className="text-teal-400/80 text-sm font-light tracking-widest uppercase">Military Asset Hub</p>
      </motion.div>

      <div className="absolute bottom-12 w-48">
         <div className="h-1 bg-teal-950 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-gradient-to-r from-teal-400 to-teal-200"
                style={{ width: `${progress}%` }}
            />
         </div>
      </div>
    </div>
  );
};

export default Loading;