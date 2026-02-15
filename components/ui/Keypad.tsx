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
              "h-16 w-16 mx-auto rounded-full flex items-center justify-center text-2xl font-medium transition-colors",
              isDelete
                ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                : isClear
                  ? "bg-orange-50 text-orange-500 hover:bg-orange-100 text-sm font-bold"
                  : "bg-white text-slate-800 shadow-sm hover:bg-slate-50 border border-slate-100"
            )}
          >
            {isDelete ? <Delete className="w-6 h-6" /> : isClear ? "נקה" : key}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Keypad;