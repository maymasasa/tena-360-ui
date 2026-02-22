import React from 'react';
import { LogOut } from 'lucide-react';
import { CURRENT_USER } from '../lib/mock-data';

export const Header: React.FC = () => {
    return (
        <header className="bg-teal-900 text-white px-6 pt-10 pb-5 rounded-b-lg shadow-xl relative z-50">
            <div className="flex justify-between items-center">

                {/* Right: User name + Logout (RTL = right side) */}
                <div className="flex items-center gap-3">
                    <button aria-label="Logout" className="p-2 bg-teal-800/50 rounded-lg text-teal-100 hover:bg-teal-800 transition-colors">
                        <LogOut size={20} />
                    </button>
                    <div>
                        <div className="text-teal-300 text-xs font-light">בוקר טוב,</div>
                        <div className="text-lg font-bold leading-tight">{CURRENT_USER.name}</div>
                    </div>
                </div>

                {/* Top-left: THENEXT Logo - absolutely pinned */}
                <div dir="ltr" className="absolute top-3 left-6 flex flex-col items-start">
                    {/* Logo text */}
                    <div className="flex items-baseline leading-none">
                        <span className="text-white font-black text-2xl tracking-tighter">T</span>
                        <span className="text-teal-400 font-black text-2xl tracking-tighter">H</span>
                        <span className="text-white font-black text-2xl tracking-tighter">ENEXT</span>
                    </div>
                    {/* Subtitle */}
                    <div className="text-teal-400 text-[7px] font-semibold tracking-[0.12em] uppercase mt-0.5 whitespace-nowrap">
                        Generation <span className="opacity-50">|</span> Big Thing <span className="opacity-50">|</span> Innovation
                    </div>
                </div>

            </div>
        </header>
    );
};
