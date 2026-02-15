import React from 'react';
import { cn } from './Badge';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
}

export const Text: React.FC<TextProps> = ({ className, variant = 'body', ...props }) => {
    const variants = {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 text-3xl font-bold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        body: "leading-7 [&:not(:first-child)]:mt-6",
        caption: "text-sm text-slate-500",
        label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    };

    const Component = variant.startsWith('h') ? (variant as keyof React.JSX.IntrinsicElements) : 'p';

    // @ts-ignore
    return React.createElement(Component, {
        className: cn(variants[variant], className),
        ...props
    });
};
