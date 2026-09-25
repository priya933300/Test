import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Radar, CheckCircle2, MapPin } from 'lucide-react';

interface Step2Props {
  onComplete: () => void;
  language: Language;
  lat: number | null;
  lon: number | null;
}

export const Step2RadarSearch: React.FC<Step2Props> = ({
  onComplete,
  language,
  lat,
  lon
}) => {
  const t = translations[language];
  const [phase, setPhase] = useState<number>(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase(2);
    }, 800);

    const timer2 = setTimeout(() => {
      setPhase(3);
    }, 1800);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 text-center max-w-lg mx-auto">
      {/* Radar Animation Graphic */}
      <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
        {/* Outer pulse circles */}
        <div className="absolute inset-0 rounded-full border border-emerald-200 animate-ping opacity-25" />
        <div className="absolute w-36 h-36 rounded-full border border-emerald-300 animate-pulse bg-emerald-50/40" />
        <div className="absolute w-24 h-24 rounded-full border-2 border-emerald-400 bg-emerald-100/60" />
        
        {/* Radar Sweep Effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="w-full h-full rounded-full origin-center"
            style={{
              background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.4) 0deg, transparent 90deg)',
              animation: 'spin 2s linear infinite'
            }}
          />
        </div>

        {/* Center pin icon */}
        <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
          <MapPin className="w-6 h-6 animate-bounce" />
        </div>

        {/* Floating detected radar pings */}
        <div className="absolute top-6 left-8 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-300/50 animate-pulse" />
        <div className="absolute bottom-8 right-6 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-300/50 animate-pulse" />
        <div className="absolute top-12 right-10 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
        {t.searchingTitle}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
        {t.searchingRange}
      </p>

      {/* Real Coordinates & Progress Steps */}
      <div className="mt-6 space-y-2.5 text-left max-w-xs mx-auto text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.stepConnecting} {lat && lon ? `(${lat.toFixed(4)}, ${lon.toFixed(4)})` : ''}</span>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${phase >= 2 ? 'opacity-100 text-slate-700' : 'opacity-30 text-slate-400'}`}>
          {phase >= 2 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
          )}
          <span>{t.stepScanning}</span>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${phase >= 3 ? 'opacity-100 text-emerald-700 font-semibold' : 'opacity-30 text-slate-400'}`}>
          {phase >= 3 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
          )}
          <span>{t.stepFound}</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onComplete}
          className="text-xs text-slate-500 hover:text-emerald-700 underline underline-offset-4 cursor-pointer"
        >
          {language === 'bn' ? 'অপেক্ষা না করে সরাসরি দেখুন →' : 'Skip & view results →'}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
