import React, { useState } from 'react';
import { ServiceItem, Language } from '../types';
import { translations } from '../data/translations';
import { Check, Star, Clock, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step3Props {
  services: ServiceItem[];
  selectedService: ServiceItem | null;
  onSelectService: (service: ServiceItem) => void;
  onProceed: () => void;
  onBack: () => void;
  language: Language;
}

export const Step3ServiceSelect: React.FC<Step3Props> = ({
  services,
  selectedService,
  onSelectService,
  onProceed,
  onBack,
  language
}) => {
  const t = translations[language];
  const [filter, setFilter] = useState<'all' | 'electrical' | 'health' | 'cleaning' | 'appliance'>('all');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredServices = services.filter((s) => filter === 'all' || s.category === filter);

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-7">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          ১০ কিমি রেঞ্জে সক্রিয়
        </span>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.selectTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.selectSubtitle}
        </p>
      </div>

      {/* Filter Tabs (Functional interactive button controls with single-line labels) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.filterAll}
        </button>
        <button
          onClick={() => setFilter('electrical')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'electrical'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'bn' ? 'ইলেকট্রিক্যাল ও এসি' : 'Electrical & AC'}
        </button>
        <button
          onClick={() => setFilter('health')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'health'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'bn' ? 'স্বাস্থ্য ও ডক্টর' : 'Health & Doctor'}
        </button>
        <button
          onClick={() => setFilter('cleaning')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'cleaning'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'bn' ? 'ডিপ ক্লিনিং' : 'Deep Cleaning'}
        </button>
        <button
          onClick={() => setFilter('appliance')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'appliance'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {language === 'bn' ? 'অ্যাপ্লায়েন্স রিপেয়ার' : 'Appliance Repair'}
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-3.5" id="product-list">
        {filteredServices.map((service) => {
          const isSelected = selectedService?.id === service.id;
          const hasImgError = imgErrors[service.id];

          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`group relative p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-3.5 ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              {/* Product Visual with Zero-Broken-Image fallback */}
              <div className="w-full sm:w-24 h-28 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
                {!hasImgError ? (
                  <img
                    src={service.image}
                    alt={language === 'bn' ? service.nameBn : service.nameEn}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(service.id)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-200 text-slate-700 p-2 text-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-700 mb-1" />
                    <span className="text-[10px] font-semibold leading-tight line-clamp-2">
                      {language === 'bn' ? service.nameBn : service.nameEn}
                    </span>
                  </div>
                )}
                
                {isSelected && (
                  <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {language === 'bn' ? service.nameBn : service.nameEn}
                  </h4>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-bold text-emerald-700 tabular-nums">
                      ₹{service.price}
                    </span>
                    {service.originalPrice && (
                      <span className="block text-xs text-slate-400 line-through tabular-nums">
                        ₹{service.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {language === 'bn' ? service.descriptionBn : service.descriptionEn}
                </p>

                {/* Zero-pill unboxed metadata with subtle typographic separators */}
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1 font-medium text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {service.rating} ({service.reviewCount})
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {language === 'bn' ? `${t.etaPrefix} ${service.etaBn}` : `${t.etaPrefix} ${service.etaEn}`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">
                    {language === 'bn' ? service.featuresBn[0] : service.featuresEn[0]}
                  </span>
                </div>
              </div>

              {/* Radio Check Circle */}
              <div className="hidden sm:flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 transition-colors ml-2 ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-300'
              }">
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Item Summary Callout */}
      {selectedService && (
        <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-500">{t.selectedItem} </span>
            <span className="font-semibold text-slate-900">
              {language === 'bn' ? selectedService.nameBn : selectedService.nameEn}
            </span>
          </div>
          <span className="text-sm font-bold text-emerald-700 tabular-nums">
            ₹{selectedService.price}
          </span>
        </div>
      )}

      {/* Proceed CTA */}
      <div className="mt-6">
        <button
          onClick={() => {
            if (!selectedService) {
              alert(t.pleaseSelectProduct);
              return;
            }
            onProceed();
          }}
          disabled={!selectedService}
          className="w-full min-h-[48px] px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>{t.proceedToPayment}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
