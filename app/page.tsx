import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VEHICLES } from '../lib/mock-data';
import { Text } from '../components/ui/Text';
import { sleep, cn } from '../lib/utils';
import InputOverlay from '../components/InputOverlay';
import { HistoryList } from '../components/HistoryList';

const HomePage = () => {
    const [searchVal, setSearchVal] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const navigate = useNavigate();

    const performSearch = async (val: string) => {
        if (val.length < 3) return;

        setIsSearching(true);
        setError('');

        // Simulate API call
        await sleep(800);

        // Allow navigation even if vehicle doesn't exist in mock data to show fallback view
        navigate(`/vehicle/${val}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(searchVal);
    };

    return (
        <div className="pb-12 px-6 pt-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Text variant="h2" className="text-teal-900 mb-1 text-xs font-bold uppercase tracking-widest opacity-60">חיפוש כלי</Text>

                {/* Search Bar - Pillow Effect */}
                <form onSubmit={handleSearch} className="relative mb-4 group">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={searchVal}
                        maxLength={6}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSearchVal(val);
                            if (error) setError('');
                            if (val.length === 6) {
                                performSearch(val);
                            }
                        }}
                        onFocus={() => setIsOverlayOpen(true)}
                        placeholder="הכנס מספר צ׳"
                        className={cn(
                            "w-full h-16 pl-4 pr-14 rounded-lg border border-white text-lg font-mono font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/10",
                            "bg-gradient-to-b from-white to-slate-50 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.04)]",
                            error
                                ? "border-red-300 text-red-900 bg-red-50 focus:ring-red-500/10"
                                : "text-slate-900 placeholder:text-slate-300"
                        )}
                    />
                    <div className="absolute top-0 right-0 h-full w-14 flex items-center justify-center text-slate-300 group-focus-within:text-teal-600 transition-colors">
                        <Search size={22} strokeWidth={2.5} />
                    </div>

                    <AnimatePresence mode="popLayout">
                        {searchVal.length > 0 ? (
                            <motion.button
                                key="submit-btn"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                type="submit"
                                disabled={isSearching}
                                className="absolute top-3 left-3 bottom-3 aspect-square bg-teal-600 rounded-xl text-white flex items-center justify-center shadow-md disabled:bg-slate-300 z-10"
                            >
                                {isSearching ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <ArrowRight size={20} />
                                )}
                            </motion.button>
                        ) : (
                            <motion.button
                                key="scan-btn"
                                type="button"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                onClick={() => console.log('Open Scanner')}
                                className="absolute top-3 left-3 bottom-3 aspect-square bg-slate-100 rounded-xl text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors z-10"
                            >
                                <Scan size={20} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-500 text-sm mt-2 font-medium px-2"
                        >
                            {error}
                        </motion.p>
                    )}
                </form>

                {/* Recent History / Feed */}
                <HistoryList />

                <InputOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
            </motion.div>
        </div>
    );
};

export default HomePage;