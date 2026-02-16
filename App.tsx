import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Loading from './app/loading';
import HomePage from './app/page';
import AssetHub from './app/vehicle/[id]/page';
import AmmoDeclaration from './app/ammo/page';

// Moved PageTransition definition up to resolve usage before declaration errors
// Using React.PropsWithChildren to ensure children prop is correctly typed and optional to satisfy TS in all contexts
const PageTransition: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full"
    >
        {children}
    </motion.div>
);

// Wrapper to handle route transitions if needed
const AnimatedRoutes = () => {
    const location = useLocation();
    const isAmmoPage = location.pathname === '/ammo';

    return (
        <Layout showGlobalHeader={!isAmmoPage}>
            <AnimatePresence mode="wait">
                {/* @ts-ignore */}
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <PageTransition>
                            <HomePage />
                        </PageTransition>
                    } />
                    <Route path="/vehicle/:id" element={
                        <PageTransition>
                            <AssetHub />
                        </PageTransition>
                    } />
                    <Route path="/ammo" element={
                        <PageTransition>
                            <AmmoDeclaration />
                        </PageTransition>
                    } />
                </Routes>
            </AnimatePresence>
        </Layout>
    );
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="min-h-screen bg-[#020617]">
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loading"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100]"
                    >
                        <Loading onComplete={() => setIsLoading(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {!isLoading && (
                <HashRouter>
                    <AnimatedRoutes />
                </HashRouter>
            )}
        </div>
    );
};

export default App;