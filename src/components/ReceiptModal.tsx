import React from 'react';
import { UserData, AppConfig, Language } from '../types';
import { translations } from '../data/translations';
import { CheckCircle2, X, Printer, MapPin, Phone, User, Calendar, ShieldCheck } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  config: AppConfig;
  language: Language;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  userData,
  config,
  language
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  const service = userData.selectedService;
  const serviceName = service
    ? language === 'bn'
      ? service.nameBn
      : service.nameEn
    : 'Service';
  const price = service ? service.price : 499;

  const handlePrint = () => {
    window.print();
  };

  const receiptId = `QS-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-tight">
              {language === 'bn' ? 'অর্ডার রসিদ ও ইনভয়েস' : 'Order Invoice & Receipt'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 print:p-8" id="printable-receipt">
          <div className="text-center pb-4 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-900">{config.merchantName}</h3>
            <p className="text-xs text-slate-500">{config.businessAddress}</p>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">
              Receipt: {receiptId} · {orderDate}
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.fullNameLabel}:</span>
              <span className="font-semibold text-slate-900">{userData.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.phoneLabel}:</span>
              <span className="font-semibold text-slate-900">{userData.phone || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.ageLabel}:</span>
              <span className="font-semibold text-slate-900">{userData.age || 'N/A'}</span>
            </div>
            {userData.address && (
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.addressLabel}:</span>
                <span className="font-semibold text-slate-900">{userData.address}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.selectedItem}</span>
              <span className="font-semibold text-slate-900 text-right max-w-[60%] truncate">
                {serviceName}
              </span>
            </div>
            {userData.utrNumber && (
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">UTR / Ref:</span>
                <span className="font-mono text-slate-900">{userData.utrNumber}</span>
              </div>
            )}
            <div className="flex justify-between py-2 text-base font-bold text-slate-900 pt-3">
              <span>{t.totalAmount}</span>
              <span className="text-emerald-700">₹{price}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {language === 'bn'
                ? 'হোয়াটসঅ্যাপের মাধ্যমে নিকটবর্তী টেকনিশিয়ানের সাথে কানেক্ট করা হয়েছে।'
                : 'Technician dispatched within 10 km radius.'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.downloadReceipt}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
