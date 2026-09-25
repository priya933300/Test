/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Step1UserInfo } from './components/Step1UserInfo';
import { Step2RadarSearch } from './components/Step2RadarSearch';
import { Step3ServiceSelect } from './components/Step3ServiceSelect';
import { Step4Payment } from './components/Step4Payment';
import { SettingsModal } from './components/SettingsModal';
import { ReceiptModal } from './components/ReceiptModal';
import { Step, Language, UserData, AppConfig, ServiceItem } from './types';
import { INITIAL_SERVICES, DEFAULT_CONFIG } from './data/services';
import { ShieldCheck, MapPin, Phone, HelpCircle } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [language, setLanguage] = useState<Language>('bn');
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('quickserve_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    age: '',
    address: '',
    lat: null,
    lon: null,
    mapLink: '',
    selectedService: null,
    utrNumber: '',
    paymentConfirmed: false
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleUpdateUserData = (updated: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('quickserve_config', JSON.stringify(newConfig));
  };

  const userLocationText = userData.lat && userData.lon
    ? `${userData.lat.toFixed(2)}°N, ${userData.lon.toFixed(2)}°E`
    : undefined;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar Navigation */}
      <Header
        currentStep={step}
        language={language}
        onLanguageChange={setLanguage}
        onOpenSettings={() => setIsSettingsOpen(true)}
        userLocationText={userLocationText}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {step === 1 && (
          <Step1UserInfo
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
            onProceed={() => setStep(2)}
            language={language}
          />
        )}

        {step === 2 && (
          <Step2RadarSearch
            onComplete={() => setStep(3)}
            language={language}
            lat={userData.lat}
            lon={userData.lon}
          />
        )}

        {step === 3 && (
          <Step3ServiceSelect
            services={services}
            selectedService={userData.selectedService}
            onSelectService={(svc) => handleUpdateUserData({ selectedService: svc })}
            onProceed={() => setStep(4)}
            onBack={() => setStep(1)}
            language={language}
          />
        )}

        {step === 4 && (
          <Step4Payment
            userData={userData}
            config={config}
            onUpdateUserData={handleUpdateUserData}
            onBack={() => setStep(3)}
            onOpenReceipt={() => setIsReceiptOpen(true)}
            language={language}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-4 mt-8">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'bn'
                ? '১০০% নিরাপদ ও ভেরিফাইড লোকাল সার্ভিস'
                : '100% Safe & Verified Doorstep Services'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'মার্চেন্ট কনফিগ' : 'Merchant Config'}
            </button>
            <span aria-hidden="true">·</span>
            <span>UPI & WhatsApp Integration</span>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        language={language}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        userData={userData}
        config={config}
        language={language}
      />
    </div>
  );
}
