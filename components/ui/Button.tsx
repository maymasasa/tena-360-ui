import React from 'react';
import { cn } from './Badge'; // Reuse cn logic

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', size = 'md', ...props }) => {
    const variants = {
        primary: 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-900/10 active:bg-teal-800',
        secondary: 'bg-teal-100 text-teal-900 hover:bg-teal-200 active:bg-teal-300',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 active:bg-slate-200',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 active:bg-slate-100',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-12 px-5 py-2.5 text-base', // Larger touch targets
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-2 flex items-center justify-center',
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
