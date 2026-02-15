import React from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
    showGlobalHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showGlobalHeader = true }) => {
    return (
        <div className="min-h-screen bg-slate-50 relative max-w-md mx-auto shadow-2xl overflow-hidden min-h-[100dvh]">
            {showGlobalHeader && <Header />}
            <main className="relative z-0">
                {children}
            </main>
        </div>
    );
};
