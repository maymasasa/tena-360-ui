import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VEHICLES } from '../lib/mock-data';
import { Text } from '../components/ui/Text';
import { sleep } from '../lib/utils';
import InputOverlay from '../components/InputOverlay';
import { HistoryList } from '../components/HistoryList';

const HomePage = () => {
    const [searchVal, setSearchVal] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (searchVal.length < 3) return;

        setIsSearching(true);
        setError('');

        // Simulate API call
        await sleep(800);

        const vehicle = VEHICLES[searchVal];
        // Allow navigation even if vehicle doesn't exist in mock data to show fallback view
        navigate(`/vehicle/${searchVal}`);
    };

    return (
        <div className="pb-24 px-6 pt-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Text variant="h2" className="text-teal-900 mb-2">חיפוש כלי</Text>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative mb-8">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={searchVal}
                        onChange={(e) => {
                            setSearchVal(e.target.value);
                            if (error) setError('');
                        }}
                        onFocus={() => setIsOverlayOpen(true)}
                        placeholder="הכנס מספר צ׳"
                        className={`
                    w-full h-16 pl-4 pr-14 rounded-2xl border backdrop-blur-[20px] text-lg font-mono font-medium shadow-2xl focus:outline-none transition-all
                    ${error ? 'border-red-400 bg-red-50/20 text-red-900' :
                                searchVal.length >= 3 && VEHICLES[searchVal]
                                    ? 'border-emerald-400 bg-emerald-50/10 text-emerald-900'
                                    : 'border-white/40 bg-white/10'}
                `}
                    />
                    <div className="absolute top-0 right-0 h-full w-14 flex items-center justify-center text-slate-400">
                        <Search size={24} />
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