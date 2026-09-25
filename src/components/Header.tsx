import React from 'react';
import { Language, Step } from '../types';
import { translations } from '../data/translations';
import { Settings, ShieldCheck, MapPin } from 'lucide-react';

interface HeaderProps {
  currentStep: Step;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSettings: () => void;
  userLocationText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  language,
  onLanguageChange,
  onOpenSettings,
  userLocationText
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            QS
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900 block leading-tight">
              {t.brand}
            </span>
            {userLocationText && (
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 leading-none">
                <MapPin className="w-3 h-3 text-emerald-600 inline" />
                {userLocationText}
              </span>
            )}
          </div>
        </div>

        {/* Zone 2: Step tracker */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className={currentStep === 1 ? 'text-emerald-700 font-bold' : ''}>
            1. {language === 'bn' ? 'তথ্য' : 'Info'}
          </span>
          <span>·</span>
          <span className={currentStep === 2 ? 'text-emerald-700 font-bold' : ''}>
            2. {language === 'bn' ? 'অনুসন্ধান' : 'Search'}
          </span>
          <span>·</span>
          <span className={currentStep === 3 ? 'text-emerald-700 font-bold' : ''}>
            3. {language === 'bn' ? 'সার্ভিস' : 'Select'}
          </span>
          <span>·</span>
          <span className={currentStep === 4 ? 'text-emerald-700 font-bold' : ''}>
            4. {language === 'bn' ? 'পেমেন্ট' : 'Payment'}
          </span>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(language === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="Switch Language"
          >
            {language === 'bn' ? 'English' : 'বাংলা'}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title={t.settings}
            aria-label={t.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
