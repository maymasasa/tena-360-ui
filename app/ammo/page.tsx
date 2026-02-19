import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, ClipboardList, User, ShieldCheck } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Text } from '../../components/ui/Text';
import { cn } from '../../lib/utils';
import { CURRENT_USER } from '../../lib/mock-data';

const AmmoDeclaration = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialId = searchParams.get('v') || '';

    const [step, setStep] = useState(1);
    const [vehicleId, setVehicleId] = useState(initialId);
    const [isDeclared, setIsDeclared] = useState(false);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const steps = [
        // Step 1: Explanation
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center space-y-8"
        >
            <div className="relative group">
                <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center blur-2xl absolute inset-0 group-hover:bg-emerald-500/20 transition-colors" />
                <div className="w-24 h-24 bg-gradient-to-b from-white to-slate-50 rounded-[2rem] border border-white flex items-center justify-center relative shadow-xl">
                    <ClipboardList size={40} className="text-emerald-600" strokeWidth={2.5} />
                </div>
            </div>

            <div className="space-y-4 max-w-xs">
                <Text variant="h2" className="text-2xl font-black text-slate-800">בקשת הצהרת תחמושת</Text>
                <Text variant="body" className="text-slate-500 leading-relaxed font-medium">
                    זהו טופס הצהרה לפני כניסת כלי לטיפול, המצהיר שבוצעה בדיקה שאין פרטי תחמושת על הכלי, מיועד למילוי ע״י קצין בלבד, תקף ל-24 שעות
                </Text>
            </div>

            <div className="w-full space-y-4 pt-8">
                <Button onClick={handleNext} className="w-full h-14 text-lg font-extrabold bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-400/50 shadow-xl shadow-blue-500/20 rounded-2xl">
                    בואו נתחיל
                </Button>
                <button
                    onClick={() => navigate('/')}
                    className="text-slate-400 font-bold hover:text-slate-600 transition-colors py-2"
                >
                    חזרה לעמוד הבית
                </button>
            </div>
        </motion.div>,

        // Step 2: Declaration
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-8"
        >
            <Text variant="h2" className="text-2xl font-black text-slate-800 text-right">הצהרת תחמושת</Text>

            <label className={cn(
                "p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer flex gap-4 items-start select-none",
                isDeclared
                    ? "bg-gradient-to-br from-emerald-50 to-white border-emerald-200 shadow-lg shadow-emerald-500/5"
                    : "bg-gradient-to-b from-white to-slate-50 border-white shadow-md hover:to-slate-100"
            )}>
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isDeclared}
                    onChange={(e) => setIsDeclared(e.target.checked)}
                />
                <div className={cn(
                    "w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all",
                    isDeclared ? "bg-emerald-500 border-emerald-500" : "border-slate-300 bg-white"
                )}>
                    {isDeclared && <CheckCircle2 size={16} className="text-white" />}
                </div>
                <span className="text-slate-700 font-bold text-lg leading-snug">
                    הנני מצהיר בזאת שברכב זה, אין חומר ברמת סיווג ביטחוני מוגבל ומעלה, תחמושת ופרטי צל״ם
                </span>
            </label>

            <div className="space-y-3">
                <label className="text-slate-500 font-extrabold text-xs block mr-3 uppercase tracking-widest">מספר צ׳ <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="הזן/י מספר צ׳"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="w-full h-16 px-6 rounded-2xl border border-white bg-gradient-to-b from-white to-slate-50 text-xl font-mono font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-lg"
                />
            </div>

            <div className="pt-12">
                <Button
                    onClick={handleNext}
                    disabled={!isDeclared || vehicleId.length < 3}
                    className="w-full h-14 text-lg font-extrabold bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-400/50 shadow-xl shadow-blue-500/20 rounded-2xl disabled:opacity-50 disabled:grayscale"
                >
                    הבא
                </Button>
            </div>
        </motion.div>,

        // Step 3: Summary
        <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col space-y-8"
        >
            <Text variant="h2" className="text-2xl font-black text-slate-800 text-center mb-4">הצהרת תחמושת</Text>

            <div className="space-y-6">
                {/* Personal Info Row - Pillow */}
                <div className="flex items-center gap-6 p-5 rounded-[2rem] border border-white bg-gradient-to-b from-white to-slate-50 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center overflow-hidden shadow-md relative z-10">
                        <User size={32} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col text-right relative z-10">
                        <Text variant="body" className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">ממלא ההצהרה</Text>
                        <Text variant="h4" className="text-slate-900 text-lg font-black leading-tight">
                            {CURRENT_USER.name}
                        </Text>
                        <Text variant="body" className="text-slate-500 font-mono font-bold text-xs uppercase opacity-60 mt-0.5">7286151</Text>
                    </div>
                </div>

                {/* Request Info Row - Pillow */}
                <div className="flex items-center gap-6 p-5 rounded-[2rem] border border-white bg-gradient-to-b from-white to-slate-50 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden shadow-md relative z-10">
                        <ClipboardList size={32} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col text-right relative z-10">
                        <Text variant="body" className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">פרטי הכלי</Text>
                        <Text variant="h4" className="text-slate-900 text-lg font-black leading-tight">
                            מספר צ׳ {vehicleId}
                        </Text>
                    </div>
                </div>
            </div>

            <div className="w-full space-y-4 pt-12">
                <Button
                    onClick={() => {
                        // Normally save logic here
                        navigate('/');
                    }}
                    className="w-full h-14 text-lg font-extrabold bg-gradient-to-b from-blue-600 to-blue-700 border border-blue-500/50 shadow-xl shadow-blue-500/20 rounded-2xl"
                >
                    שמירה וחתימה
                </Button>
                <button
                    onClick={handleBack}
                    className="w-full text-slate-400 font-bold hover:text-slate-600 transition-colors py-2"
                >
                    חזרה
                </button>
            </div>
        </motion.div>
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Custom Header based on Screenshots */}
            <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-100 relative z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="text-sm font-black text-slate-800 tracking-tight">הצהרת תחמושת</span>
                </div>

                <div className="flex items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white scale-75">
                        <ShieldCheck size={20} />
                    </div>
                    <span className="text-xs font-black text-slate-900 leading-none">360<br /><span className="text-teal-600">טנא</span></span>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-6 flex flex-col">
                <AnimatePresence mode="wait">
                    {steps[step - 1]}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AmmoDeclaration;
