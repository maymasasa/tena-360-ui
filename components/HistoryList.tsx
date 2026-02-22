import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft } from 'lucide-react';
import { USER_HISTORY, ICONS } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { Text } from './ui/Text';

interface HistoryListProps {
    vehicleId?: string; // If provided, filter by this vehicle ID
    limit?: number;     // Optional: Limit number of items shown
    showHeader?: boolean;
}

const CATEGORIES = ['הכל', 'תחמושת', 'חט"כים', 'מטפים'] as const;
type Category = typeof CATEGORIES[number];

// Icons matching the "Menu/Settings" style: White icon on solid colored background
const categoryIcons: Record<Exclude<Category, 'הכל'>, React.ReactNode> = {
    'תחמושת': <ICONS.Ammo size={18} className="text-white" strokeWidth={2.5} />,
    'חט"כים': <ICONS.Engine size={18} className="text-white" strokeWidth={2.5} />,
    'מטפים': <ICONS.FireExtinguisher size={18} className="text-white" strokeWidth={2.5} />
};

// Muted Professional Colors (Matching AssetHub)
const categoryColors: Record<Exclude<Category, 'הכל'>, { bg: string, strip: string }> = {
    'תחמושת': { bg: 'bg-teal-600', strip: 'bg-teal-600' },
    'חט"כים': { bg: 'bg-cyan-600', strip: 'bg-cyan-600' },
    'מטפים': { bg: 'bg-indigo-600', strip: 'bg-indigo-600' }
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

    const displayItems = limit ? historyItems.slice(0, limit) : historyItems;
    const isTotallyEmpty = historyItems.length === 0;

    return (
        <div className="w-full text-right" dir="rtl">
            {showHeader && (
                <div className="mb-4 space-y-4 px-1">
                    {/* Filter Chips - Pillow Effect Styling */}
                    <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar px-1">
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            const colors = cat !== 'הכל' ? categoryColors[cat] : { bg: 'bg-slate-900' };

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-[13px] font-bold transition-all duration-300 whitespace-nowrap border select-none",
                                        "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.04)] active:scale-95 active:shadow-inner",
                                        isSelected
                                            ? cat === 'הכל'
                                                ? "bg-gradient-to-b from-slate-800 to-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200"
                                                : `bg-gradient-to-b ${colors.bg.replace('bg-', 'from-').replace('600', '500')} ${colors.bg.replace('bg-', 'to-')} border-transparent text-white shadow-lg shadow-slate-200`
                                            : "bg-gradient-to-b from-white to-slate-50 border-white text-slate-500 hover:text-slate-700 hover:to-slate-100"
                                    )}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* iOS Style Grouped List */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                {displayItems.length > 0 ? (
                    <div className="flex flex-col">
                        {displayItems.map((item, index) => {
                            const colors = categoryColors[item.category as keyof typeof categoryColors];
                            return (
                                <div key={item.id} className="relative group active:bg-slate-100 transition-colors cursor-pointer" onClick={() => navigate(`/vehicle/${item.entityId}`)}>

                                    {/* The "Beautiful" Side Strip */}
                                    <div className={cn("absolute right-0 top-2 bottom-2 w-[3px] rounded-l-full", colors.strip)} />

                                    <div className="flex items-center p-3.5 pr-5">
                                        {/* iOS Icon Style: White on Solid Background */}
                                        <div className={cn(
                                            "w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ml-3.5 shadow-sm",
                                            colors.bg
                                        )}>
                                            {categoryIcons[item.category as keyof typeof categoryIcons]}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h3 className="font-bold text-[15px] text-slate-900 truncate ml-2">
                                                    {item.action}
                                                </h3>
                                                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                                                    {item.timestamp}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-[12px] text-slate-500">
                                                <span className="truncate">מספר צ׳ {item.entityId} • {item.entityName}</span>
                                            </div>
                                        </div>

                                        <ChevronLeft size={16} className="text-slate-300 mr-2" />
                                    </div>

                                    {/* Thin Divider */}
                                    {index < displayItems.length - 1 && (
                                        <div className="mr-16 ml-4 h-px bg-slate-100" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
                            <Clock size={32} className="text-slate-200" />
                        </div>
                        <Text variant="h3" className="text-slate-400 font-bold mb-1">אין פעילות להצגה</Text>
                        <Text variant="body" className="text-slate-300 text-sm">המתינו לדיווח מהשטח</Text>
                    </div>
                )}
            </div>
        </div>
    );
};
