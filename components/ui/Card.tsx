import React from 'react';
import { cn } from './Badge';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div
        className={cn(
            "rounded-3xl border border-white/40 bg-white/10 backdrop-blur-[24px] text-slate-950 shadow-2xl relative overflow-hidden",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
            "after:absolute after:inset-0 after:shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] after:pointer-events-none",
            className
        )}
        {...props}
    />
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={cn("p-6 pt-0", className)} {...props} />
);
