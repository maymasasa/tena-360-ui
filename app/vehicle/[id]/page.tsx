import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { VEHICLES, ACTIONS_CATALOG, ICONS, IconName, CURRENT_USER } from '../../../lib/mock-data';
import { EntityCard } from '../../../components/EntityCard';
import { Button } from '../../../components/ui/Button';
import { Text } from '../../../components/ui/Text';
import { sleep } from '../../../lib/utils';
import { Layout } from '../../../components/Layout'; // Actually Layout is in App, but maybe we need specific header control?
import { HistoryList } from '../../../components/HistoryList';
// No, layout is global.

const AssetHub = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const vehicle = id ? VEHICLES[id] : null;

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

    if (!vehicle && !loading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
                <Text variant="h3" className="text-slate-400 mb-4">כלי רכב לא נמצא</Text>
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
        <div className="pb-12 pt-6 px-6">
            {/* Breadcrumb / Back */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-slate-500 mb-6 hover:text-teal-600 transition-colors"
            >
                <ChevronRight size={20} />
                <span className="text-sm font-medium">חזרה לחיפוש</span>
            </button>

            {/* Entity Card */}
            {loading ? (
                <div className="w-full h-64 bg-white rounded-3xl animate-pulse shadow-sm" />
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {vehicle && <EntityCard entity={vehicle} />}
                </motion.div>
            )}

            {/* Actions Grid */}
            <div className="mt-8">
                <Text variant="h3" className="text-lg mb-4 text-slate-700">פעולות זמינות</Text>

                {loading ? (
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100/50 rounded-2xl animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {availableActions.map((action, index) => (
                            <motion.button
                                key={action.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileTap={!action.comingSoon ? { scale: 0.98 } : {}}
                                disabled={action.comingSoon}
                                onClick={() => {
                                    if (!action.comingSoon && action.path) {
                                        navigate(action.path);
                                    }
                                }}
                                className={`
                                    p-5 rounded-2xl border border-white/40 bg-white/10 backdrop-blur-[20px] shadow-xl flex flex-col items-start gap-4 text-right hover:shadow-2xl transition-all overflow-hidden relative group
                                    ${action.comingSoon ? 'opacity-60 cursor-not-allowed' : 'active:scale-95 active:bg-white/20'}
                                `}
                            >
                                {/* Glass Shine & Inner Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                                <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] pointer-events-none" />

                                <div className="flex justify-between w-full items-start relative z-10">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorMap[action.color as keyof typeof colorMap]}`}>
                                        {renderIcon(action.icon as IconName)}
                                    </div>

                                    {action.comingSoon && (
                                        <span className="bg-white/20 backdrop-blur-sm text-slate-500 text-[10px] px-2 py-1 rounded-full font-bold border border-white/20">
                                            בקרוב
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col items-start relative z-10">
                                    <span className={`font-bold text-base leading-tight ${action.comingSoon ? 'text-slate-400' : 'text-slate-700'}`}>
                                        {action.label}
                                    </span>
                                    {/* @ts-ignore */}
                                    {action.disclaimer && (
                                        <span className="text-[10px] text-slate-400 mt-1 font-medium leading-tight">
                                            {/* @ts-ignore */}
                                            {action.disclaimer}
                                        </span>
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>

            {/* History Section */}
            <div className="mt-8">
                {loading ? (
                    <div className="space-y-3">
                        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-4" />
                        <div className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
                        <div className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
                    </div>
                ) : (
                    <HistoryList vehicleId={vehicle?.id} showHeader={true} />
                )}
            </div>
        </div>
    );
};

export default AssetHub;