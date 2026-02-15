import React from 'react';
import { Entity } from '../lib/mock-data';
import { Card } from './ui/Card';

interface EntityCardProps {
    entity: Entity;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
    return (
        <Card className="overflow-hidden">
            <div className="p-6 relative bg-gradient-to-br from-teal-50/30 via-white/20 to-transparent backdrop-blur-sm">
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <span className="block text-sm font-bold text-teal-600/80 mb-1 tracking-wide">מספר צ׳</span>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight font-mono leading-none">{entity.id}</h2>
                    </div>

                    <div className="text-left pl-2">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">עודכן לאחרונה</span>
                        <span className="text-lg font-bold text-slate-600 font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 shadow-sm inline-block">{entity.lastUpdated}</span>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-teal-100/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
            </div>
        </Card>
    );
};
