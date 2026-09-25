import React, { useState } from 'react';
import { UserData, Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, User, Calendar, Navigation, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Step1Props {
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
  onProceed: () => void;
  language: Language;
}

export const Step1UserInfo: React.FC<Step1Props> = ({
  userData,
  onUpdateUserData,
  onProceed,
  language
}) => {
  const t = translations[language];
  const [isLocating, setIsLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locStatus, setLocStatus] = useState<string | null>(
    userData.lat ? (language === 'bn' ? 'জিপিএস লোকেশন সংরক্ষিত' : 'GPS location saved') : null
  );

  const handleFetchLocationAndProceed = () => {
    // Validate required fields
    if (!userData.name.trim() || !userData.phone.trim() || !userData.age.trim()) {
      setErrorMessage(t.validationError);
      return;
    }

    setErrorMessage('');
    setIsLocating(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const mapLink = `https://maps.google.com/?q=${lat},${lon}`;
          
          onUpdateUserData({
            lat,
            lon,
            mapLink
          });

          setLocStatus(t.gpsSuccess);
          setIsLocating(false);
          // Advance to search step
          onProceed();
        },
        (error) => {
          console.warn('Geolocation warning/error:', error.message);
          // Graceful fallback coordinates (e.g. Kolkata / Region Central) so user flow never gets stuck
          const defaultLat = 22.5726;
          const defaultLon = 88.3639;
          const mapLink = `https://maps.google.com/?q=${defaultLat},${defaultLon}`;
          
          onUpdateUserData({
            lat: defaultLat,
            lon: defaultLon,
            mapLink: userData.mapLink || mapLink
          });

          setLocStatus(t.gpsFailed);
          setIsLocating(false);
          // Advance anyway with fallback so user is never blocked
          onProceed();
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    } else {
      const defaultLat = 22.5726;
      const defaultLon = 88.3639;
      onUpdateUserData({
        lat: defaultLat,
        lon: defaultLon,
        mapLink: `https://maps.google.com/?q=${defaultLat},${defaultLon}`
      });
      setIsLocating(false);
      onProceed();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-7">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.step1Title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.step1Subtitle}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
            {t.fullNameLabel} <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => onUpdateUserData({ name: e.target.value })}
              placeholder={t.fullNamePlaceholder}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
            {t.phoneLabel} <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => onUpdateUserData({ phone: e.target.value })}
              placeholder={t.phonePlaceholder}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
              required
            />
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
            {t.ageLabel} <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="number"
              min="1"
              max="120"
              value={userData.age}
              onChange={(e) => onUpdateUserData({ age: e.target.value })}
              placeholder={t.agePlaceholder}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
              required
            />
          </div>
        </div>

        {/* Area / Landmark (Optional) */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
            {t.addressLabel}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={userData.address}
              onChange={(e) => onUpdateUserData({ address: e.target.value })}
              placeholder={t.addressPlaceholder}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
            />
          </div>
        </div>
      </div>

      {locStatus && (
        <div className="mt-4 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{locStatus}</span>
        </div>
      )}

      {/* Primary Proceed CTA Button */}
      <div className="mt-6">
        <button
          onClick={handleFetchLocationAndProceed}
          disabled={isLocating}
          className="w-full min-h-[48px] px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-70"
        >
          {isLocating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{t.gpsFetching}</span>
            </>
          ) : (
            <>
              <Navigation className="w-5 h-5" />
              <span>{t.gpsBtn}</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-500 text-xs text-center">
        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
        <span>১০ কিমির মধ্যে ইনস্ট্যান্ট লোকেশন ম্যাপিং ও নিরাপদ কানেকশন</span>
      </div>
    </div>
  );
};
