import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, ChevronLeft } from 'lucide-react';
import { VEHICLES, ACTIONS_CATALOG, ICONS, IconName, CURRENT_USER, Entity } from '../../../lib/mock-data';
import { EntityCard } from '../../../components/EntityCard';
import { Button } from '../../../components/ui/Button';
import { Text } from '../../../components/ui/Text';
import { sleep, cn } from '../../../lib/utils';
import { Layout } from '../../../components/Layout'; // Actually Layout is in App, but maybe we need specific header control?
import { HistoryList } from '../../../components/HistoryList';
// No, layout is global.

const AssetHub = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const vehicle = id ? VEHICLES[id] : null;

    // Simplified fallback for vehicles (only ID matters)
    const displayVehicle: Entity | null = vehicle || (id ? {
        id: id,
        name: id,
        type: 'Tank',
        model: '',
        status: 'Operational',
        lastUpdated: ''
    } as Entity : null);

    // Specific actions for the vehicle page as requested
    const availableActions = [
        {
            id: 'ammo-decl',
            label: 'הצהרת תחמושת',
            icon: 'Ammo',
            color: 'amber',
            path: '/ammo',
            comingSoon: false,
            disclaimer: 'רק קצינים רשאים למלא טופס הצהרת תחמושת'
        },
        {
            id: 'hatchim',
            label: 'חט״כים',
            icon: 'Engine',
            color: 'blue',
            path: '',
            comingSoon: true
        },
        {
            id: 'matafim',
            label: 'מטפים',
            icon: 'FireExtinguisher',
            color: 'red',
            path: '',
            comingSoon: true
        }
    ];

    useEffect(() => {
        // Reset loading on ID change
        const fetchData = async () => {
            setLoading(true);
            await sleep(600);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    if (!displayVehicle && !loading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
                <Text variant="h3" className="text-slate-400 mb-4">מספר צ׳ חסר</Text>
                <Button onClick={() => navigate('/')} variant="outline">חזרה לחיפוש</Button>
            </div>
        )
    }

    // Icon Mapper
    const renderIcon = (iconName: IconName) => {
        const LucideComponent = ICONS[iconName];
        return <LucideComponent size={36} />;
    }

    const colorMap = {
        blue: 'bg-blue-500 text-white shadow-lg shadow-blue-500/30',
        green: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30',
        red: 'bg-red-500 text-white shadow-lg shadow-red-500/30',
        orange: 'bg-orange-500 text-white shadow-lg shadow-orange-500/30',
        amber: 'bg-amber-500 text-white shadow-lg shadow-amber-500/30',
        purple: 'bg-purple-500 text-white shadow-lg shadow-purple-500/30',
        slate: 'bg-slate-500 text-white shadow-lg shadow-slate-500/30',
    }

    return (
        <div className="pb-12 pt-2 px-6">
            {/* Breadcrumb / Back */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-slate-400 mb-2 hover:text-teal-600 transition-colors"
            >
                <ChevronRight size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">חזרה</span>
            </button>

            {/* Entity Card Skeleton */}
            {loading ? (
                <div className="w-full h-[156px] rounded-3xl border border-white/40 bg-white/10 backdrop-blur-md animate-pulse p-6 flex items-center shadow-lg">
                    <div className="space-y-2">
                        <div className="h-4 w-12 bg-teal-500/20 rounded" />
                        <div className="h-12 w-40 bg-slate-200/50 rounded-lg" />
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {displayVehicle && <EntityCard entity={displayVehicle} />}
                </motion.div>
            )}

            {/* Actions Grid Skeleton */}
            <div className="mt-4">
                <Text variant="h3" className="text-sm font-bold uppercase tracking-widest mb-3 text-slate-400">פעולות זמינות</Text>

                {loading ? (
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-square rounded-lg border border-white bg-white/50 animate-pulse shadow-sm" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {availableActions.map((action, index) => {
                            const LucideComponent = ICONS[action.icon as IconName];
                            return (
                                <motion.button
                                    key={action.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    disabled={action.comingSoon}
                                    onClick={() => {
                                        if (!action.comingSoon && action.path) {
                                            const finalPath = action.id === 'ammo-decl' && id
                                                ? `${action.path}?v=${id}`
                                                : action.path;
                                            navigate(finalPath);
                                        }
                                    }}
                                    className={`
                                        aspect-square p-2 rounded-lg border border-white bg-gradient-to-b from-white to-slate-50 relative overflow-hidden group
                                        shadow-[0_2px_6px_-2px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)]
                                        flex flex-col items-center justify-center gap-1.5 text-center transition-all duration-300
                                        ${action.comingSoon ? 'opacity-60 select-none grayscale-[0.2]' : 'active:scale-[0.97] active:shadow-inner hover:shadow-md'}
                                    `}
                                >
                                    {/* Light Highlight Effect */}
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

                                    <div className={cn(
                                        "w-9 h-9 rounded-lg flex items-center justify-center shadow-sm relative z-10",
                                        action.comingSoon ? "bg-slate-300" : colorMap[action.color as keyof typeof colorMap]
                                    )}>
                                        {LucideComponent && <LucideComponent size={18} strokeWidth={2.5} className="text-white" />}
                                    </div>

                                    <div className="relative z-10 px-1">
                                        <span className={`font-bold text-[11px] leading-tight block truncate ${action.comingSoon ? 'text-slate-400' : 'text-slate-900'}`}>
                                            {action.label}
                                        </span>
                                        {action.comingSoon && (
                                            <span className="text-[7px] px-1 py-0.5 rounded-md font-black bg-slate-100 text-slate-400 border border-slate-200 uppercase mt-0.5 inline-block">
                                                בקרוב
                                            </span>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* History Section Skeleton */}
            <div className="mt-4">
                {loading ? (
                    <div className="space-y-4">
                        <div className="h-6 w-32 bg-slate-200/50 rounded animate-pulse" />
                        {[1, 2].map(i => (
                            <div key={i} className="h-24 w-full rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm animate-pulse p-4 flex gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-slate-200/30 flex-shrink-0" />
                                <div className="flex-1 space-y-2 py-2">
                                    <div className="h-4 w-1/2 bg-slate-200/30 rounded" />
                                    <div className="h-3 w-1/3 bg-slate-200/20 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <HistoryList vehicleId={displayVehicle?.id} showHeader={true} />
                )}
            </div>
        </div>
    );
};

export default AssetHub;