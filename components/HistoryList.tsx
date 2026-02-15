import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Filter } from 'lucide-react';
import { USER_HISTORY, HistoryItem, ICONS } from '../lib/mock-data';
import { Card } from './ui/Card';
import { Text } from './ui/Text';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface HistoryListProps {
    vehicleId?: string; // If provided, filter by this vehicle ID
    limit?: number;     // Optional: Limit number of items shown
    showHeader?: boolean;
}

const CATEGORIES = ['הכל', 'תחמושת', 'חט"כים', 'מטפים'] as const;
type Category = typeof CATEGORIES[number];

const categoryIcons: Record<Exclude<Category, 'הכל'>, React.ReactNode> = {
    'תחמושת': <ICONS.Ammo size={32} />,
    'חט"כים': <ICONS.Engine size={32} />,
    'מטפים': <ICONS.FireExtinguisher size={32} />
};

const categoryColors: Record<Exclude<Category, 'הכל'>, string> = {
    'תחמושת': 'bg-amber-500 text-white shadow-lg shadow-amber-500/20',
    'חט"כים': 'bg-blue-500 text-white shadow-lg shadow-blue-500/20',
    'מטפים': 'bg-red-500 text-white shadow-lg shadow-red-500/20'
};

export const HistoryList: React.FC<HistoryListProps> = ({
    vehicleId,
    limit,
    showHeader = true
}) => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<Category>('הכל');

    // Filter history based on vehicleId and selectedCategory
    const historyItems = USER_HISTORY.filter(item => {
        const matchesVehicle = vehicleId ? item.entityId === vehicleId : true;
        const matchesCategory = selectedCategory === 'הכל' ? true : item.category === selectedCategory;
        return matchesVehicle && matchesCategory;
    });

    // We'll limit if requested
    const displayItems = limit ? historyItems.slice(0, limit) : historyItems;

    return (
        <div className="w-full">
            {showHeader && (
                <div className="mb-4 space-y-4">
                    <div className="flex justify-between items-end">
                        <Text variant="h3" className="text-lg">
                            {'פעילות אחרונה'}
                        </Text>
                        {!vehicleId && (
                            <div className="text-xs text-slate-400 flex items-center gap-1">
                                <Filter size={12} />
                                <span>{historyItems.length} פריטים</span>
                            </div>
                        )}
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border-2",
                                    selectedCategory === cat
                                        ? "bg-teal-600/80 border-white/40 text-white shadow-xl scale-105 backdrop-blur-xl"
                                        : "bg-white/10 border-white/20 text-slate-600 hover:bg-white/20 backdrop-blur-lg"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {displayItems.length > 0 ? (
                    displayItems.map((item) => (
                        <Card
                            key={item.id}
                            className="p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md group"
                            onClick={() => navigate(`/vehicle/${item.entityId}`)}
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 shadow-lg",
                                categoryColors[item.category as keyof typeof categoryColors]
                            )}>
                                {categoryIcons[item.category as keyof typeof categoryIcons]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-bold text-slate-800 truncate ml-2">{item.action}</span>
                                    <span className="text-xs text-slate-400 font-mono whitespace-nowrap">{item.timestamp}</span>
                                </div>
                                <div className="text-sm text-slate-500 flex items-center gap-2 truncate">
                                    {!vehicleId && ( // Only show entity name if listing all history
                                        <>
                                            <span className="truncate">{item.entityName}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full flex-shrink-0" />
                                        </>
                                    )}
                                    <span className="font-mono text-xs">{item.entityId}</span>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-400 bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-dashed border-white/20 mt-4 transition-all animate-in fade-in zoom-in duration-300 shadow-inner">
                        <Clock className="mx-auto mb-3 opacity-20" size={48} />
                        <Text variant="body" className="font-medium text-slate-500">אין פעילות בקטגוריה זו</Text>
                        <button
                            onClick={() => setSelectedCategory('הכל')}
                            className="mt-3 text-teal-600 text-sm font-bold hover:underline"
                        >
                            חזור להכל
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
