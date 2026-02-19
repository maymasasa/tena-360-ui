import React from 'react';
import { motion } from 'framer-motion';
import { Delete, Eraser } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onClear: () => void;
  className?: string;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onDelete, onClear, className }) => {
  return (
    <div className={cn("grid grid-cols-3 gap-4 px-6 pb-8", className)} dir="ltr">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'del'].map((key) => {
        const isDelete = key === 'del';
        const isClear = key === 'clear';

        return (
          <motion.button
            key={key}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (isDelete) return onDelete();
              if (isClear) return onClear();
              return onKeyPress(key);
            }}
            className={cn(
              "h-16 w-16 mx-auto rounded-3xl flex items-center justify-center text-2xl font-bold transition-all duration-200 select-none",
              "shadow-[0_4px_10px_-2px_rgba(0,0,0,0.06),0_2px_4px_-1px_rgba(0,0,0,0.04)] active:scale-95 active:shadow-inner border border-white",
              isDelete
                ? "bg-gradient-to-b from-slate-100 to-slate-200 text-slate-500 hover:from-slate-200"
                : isClear
                  ? "bg-gradient-to-b from-orange-400 to-orange-500 text-white border-transparent text-sm"
                  : "bg-gradient-to-b from-white to-slate-50 text-slate-800 hover:to-slate-100"
            )}
          >
            {isDelete ? <Delete className="w-6 h-6" strokeWidth={2.5} /> : isClear ? "נקה" : key}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Keypad;