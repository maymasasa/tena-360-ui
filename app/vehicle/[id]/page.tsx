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
            color: 'teal',
            path: '/ammo',
            comingSoon: false,
            disclaimer: 'רק קצינים רשאים למלא טופס הצהרת תחמושת'
        },
        {
            id: 'hatchim',
            label: 'חט״כים',
            icon: 'Engine',
            color: 'cyan',
            path: '',
            comingSoon: true
        },
        {
            id: 'matafim',
            label: 'מטפים',
            icon: 'FireExtinguisher',
            color: 'indigo',
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
        teal: 'bg-teal-600 text-white shadow-lg shadow-teal-600/25',
        cyan: 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25',
        indigo: 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25',
        emerald: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25',
        blue: 'bg-blue-500 text-white shadow-lg shadow-blue-500/25',
        orange: 'bg-orange-500 text-white shadow-lg shadow-orange-500/25',
        amber: 'bg-amber-500 text-white shadow-lg shadow-amber-500/25',
        slate: 'bg-slate-500 text-white shadow-lg shadow-slate-500/25',
    }

    return (
        <div className="pb-12 pt-2 px-6">
            {/* Breadcrumb / Back */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-teal-700 mb-2 hover:text-teal-900 transition-colors font-bold"
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

            {/* Divider */}
            <div className="my-4 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-teal-700 to-transparent" />
                <span className="text-[14px] font-bold uppercase tracking-widest text-teal-700">פעולות זמינות</span>
                <div className="flex-1 h-px bg-gradient-to-l from-teal-700 to-transparent" />
            </div>

            {/* Actions Grid */}
            <div>

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
                                        aspect-square flex flex-col items-center justify-start gap-2 text-center transition-all duration-300 group
                                        ${action.comingSoon ? 'opacity-80 select-none' : 'active:scale-90'}
                                    `}
                                >
                                    {/* Icon Container - The "App Icon" */}
                                    <div className={cn(
                                        "w-16 h-16 rounded-[1.4rem] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] relative z-10 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1",
                                        colorMap[action.color as keyof typeof colorMap]
                                    )}>
                                        {/* Subtle Inner Highlight */}
                                        <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
                                        {LucideComponent && <LucideComponent size={28} strokeWidth={2.2} className="text-white relative z-10" />}

                                        {/* "Coming Soon" Badge - Top Left Floating */}
                                        {action.comingSoon && (
                                            <div className="absolute -top-1 -left-1 z-20">
                                                <span className="text-[8px] px-1.5 py-0.5 rounded-md font-black bg-white text-slate-900 shadow-md border border-slate-100 uppercase">
                                                    בקרוב
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Label - Centered Below */}
                                    <div className="relative z-10 px-1 mt-1">
                                        <span className={`font-black text-[12px] leading-tight block text-slate-700`}>
                                            {action.label}
                                        </span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="mt-0 mb-0.5 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-teal-700 to-transparent" />
                <span className="text-[14px] font-bold uppercase tracking-widest text-teal-700">פעילות אחרונה</span>
                <div className="flex-1 h-px bg-gradient-to-l from-teal-700 to-transparent" />
            </div>

            {/* History Section */}
            <div>
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