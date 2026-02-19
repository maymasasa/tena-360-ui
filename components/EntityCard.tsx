import React from 'react';
import { Entity } from '../lib/mock-data';

interface EntityCardProps {
    entity: Entity;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
    return (
        <div className="rounded-lg border border-white bg-gradient-to-b from-white to-slate-50 shadow-sm overflow-hidden relative p-4 py-3">
            <div className="flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-0.5">זיהוי מספר צ׳</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter font-mono leading-none">{entity.id}</h2>
            </div>
        </div>
    );
};
