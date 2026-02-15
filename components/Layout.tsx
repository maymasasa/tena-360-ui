import React from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
    showGlobalHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showGlobalHeader = true }) => {
    return (
        <div className="min-h-screen bg-slate-50 relative max-w-md mx-auto shadow-2xl overflow-hidden min-h-[100dvh] flex flex-col">
            {/* Background Decorative Elements for Glassmorphism */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-15%] w-[100%] h-[50%] bg-teal-500/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[5%] left-[-25%] w-[90%] h-[60%] bg-emerald-500/15 blur-[130px] rounded-full" />
                <div className="absolute top-[30%] left-[-10%] w-[70%] h-[40%] bg-teal-600/10 blur-[110px] rounded-full opacity-80" />
            </div>

            <div className="relative z-10 flex flex-col flex-1 overflow-y-auto no-scrollbar">
                {showGlobalHeader && <Header />}
                <main className="relative z-10 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};
