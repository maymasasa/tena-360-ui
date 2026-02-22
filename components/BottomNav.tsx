import React from 'react';
import { Home, User, Search, PlusSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

export const BottomNav: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const tabs = [
        { id: 'home', label: 'ראשי', icon: Home, path: '/' },
        { id: 'info', label: 'מידע אישי', icon: User, path: '/profile' },
        { id: 'search', label: 'חיפוש', icon: Search, path: '/' },
        { id: 'request', label: 'פתיחת פנייה', icon: PlusSquare, path: '/request' },
    ];

    return (
        <nav className="fixed bottom-4 left-6 right-6 z-[60]">
            <div className="bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-[2rem] flex justify-around items-center py-3 px-4">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path && tab.id === 'home'; // Simplified for demo
                    return (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            className="flex flex-col items-center gap-1 group transition-all"
                        >
                            <div className={cn(
                                "flex items-center justify-center p-2 rounded-xl transition-all",
                                isActive ? "text-blue-600 scale-110" : "text-slate-400 group-active:scale-95"
                            )}>
                                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold transition-all",
                                isActive ? "text-blue-600 opacity-100" : "text-slate-400 opacity-80"
                            )}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
