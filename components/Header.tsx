import React from 'react';
import { Bell, LogOut, Signal, SignalHigh, WifiOff } from 'lucide-react';
import { Text } from './ui/Text'; // Assuming we might create a Text component, or just use HTML
import { CURRENT_USER } from '../lib/mock-data';

export const Header: React.FC = () => {
    return (
        <header className="bg-teal-900 text-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-xl relative z-50">
            <div className="flex justify-between items-start">
                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={CURRENT_USER.avatarUrl}
                            alt={CURRENT_USER.name}
                            className="w-12 h-12 rounded-full border-2 border-teal-500/50 object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-teal-900 rounded-full" />
                    </div>
                    <div>
                        <div className="text-teal-200 text-xs font-light">בוקר טוב,</div>
                        <div className="text-lg font-bold leading-none">{CURRENT_USER.name}</div>
                    </div>
                </div>

                {/* Actions / Status */}
                <div className="flex items-center gap-3">
                    <button aria-label="Logout" className="p-2 bg-teal-800/50 rounded-full text-teal-100 hover:bg-teal-800 transition-colors">
                        <LogOut size={20} />
                    </button>


                </div>
            </div>
        </header>
    );
};
