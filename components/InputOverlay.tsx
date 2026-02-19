import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Loader2 } from 'lucide-react';
import Keypad from './ui/Keypad';
import { useNavigate } from 'react-router-dom';
import { sleep, cn } from '../lib/utils'; // Added cn import

interface InputOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const InputOverlay: React.FC<InputOverlayProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setInputVal("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleKeyPress = (key: string) => {
    if (inputVal.length < 9 && !isSubmitting) {
      const newValue = inputVal + key;
      setInputVal(newValue);
    }
  };

  const handleDelete = () => {
    if (!isSubmitting) {
      setInputVal(prev => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (!isSubmitting) {
      setInputVal("");
    }
  };

  const handleSubmit = async () => {
    if (inputVal.length === 0) return;

    setIsSubmitting(true);
    // Simulate brief processing if desired, or just go
    await sleep(300);

    navigate(`/vehicle/${inputVal}`);
    onClose();
  };

  // Physical Keyboard Support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inputVal, isSubmitting]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-teal-950/60 backdrop-blur-sm z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-slate-50 rounded-t-[2.5rem] z-50 h-[65vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Handle Bar */}
            <div className="w-full flex justify-center pt-4 pb-2" onClick={onClose}>
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Header / Close */}
            <div className="px-6 flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">זיהוי כלי</h2>
              <button onClick={onClose} className="p-2 bg-slate-200 rounded-full text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center w-full max-w-md mx-auto relative">

              {/* Input Display Area - Pillow Effect */}
              <div className="w-full px-8 mb-6 relative z-10">
                <div className={cn(
                  "w-full h-24 rounded-3xl border border-white flex items-center justify-center relative overflow-hidden",
                  "text-4xl font-mono font-black tracking-[0.2em] transition-all duration-300",
                  "bg-gradient-to-b from-white to-slate-50 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.02)]",
                  "text-teal-900"
                )}>
                  {/* Subtle Light Effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                  <span className="relative z-10">
                    {inputVal || <span className="text-slate-200">______</span>}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full px-8 h-12 mb-4">
                <AnimatePresence>
                  {inputVal.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full h-full bg-gradient-to-b from-teal-500 to-teal-600 border border-teal-400/50 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <span>המשך</span>
                          <ArrowLeft size={20} strokeWidth={2.5} />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Keypad */}
              <div className="mt-auto w-full pb-6">
                <Keypad
                  onKeyPress={handleKeyPress}
                  onDelete={handleDelete}
                  onClear={handleClear}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InputOverlay;