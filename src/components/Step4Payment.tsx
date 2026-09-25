import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { UserData, AppConfig, Language } from '../types';
import { translations } from '../data/translations';
import {
  QrCode,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Receipt,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  MapPin,
  Sparkles
} from 'lucide-react';

interface Step4Props {
  userData: UserData;
  config: AppConfig;
  onUpdateUserData: (data: Partial<UserData>) => void;
  onBack: () => void;
  onOpenReceipt: () => void;
  language: Language;
}

export const Step4Payment: React.FC<Step4Props> = ({
  userData,
  config,
  onUpdateUserData,
  onBack,
  onOpenReceipt,
  language
}) => {
  const t = translations[language];
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [utrInput, setUtrInput] = useState(userData.utrNumber || '');
  const [isPaidChecked, setIsPaidChecked] = useState(userData.paymentConfirmed || false);

  const service = userData.selectedService;
  const serviceName = service
    ? language === 'bn'
      ? service.nameBn
      : service.nameEn
    : 'Product / Service';
  const price = service ? service.price : 499;

  // Construct UPI deep-link
  const upiIntentUrl = `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(
    config.merchantName
  )}&am=${price}&cu=INR&tn=Order_${service?.id || 'service'}`;

  // Generate QR code dynamically
  useEffect(() => {
    QRCode.toDataURL(upiIntentUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [upiIntentUrl]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(config.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppSend = () => {
    const mapUrl =
      userData.mapLink ||
      (userData.lat && userData.lon
        ? `https://maps.google.com/?q=${userData.lat},${userData.lon}`
        : 'https://maps.google.com');

    // Format text as specified in prompt
    const message =
      `*নতুন কাস্টমার অর্ডার বিবরণ*\n` +
      `------------------\n` +
      `👤 নাম: ${userData.name}\n` +
      `📱 ফোন: ${userData.phone}\n` +
      `📌 বয়স: ${userData.age}\n` +
      `🛍️ প্রোডাক্ট: ${serviceName}\n` +
      `💰 মূল্য: ₹${price}\n` +
      `📍 লোকেশন ম্যাপ: ${mapUrl}\n` +
      (utrInput ? `🔖 ট্রানজ্যাকশন আইডি (UTR): ${utrInput}\n` : '') +
      (userData.address ? `🏠 ঠিকানা: ${userData.address}\n` : '') +
      `✅ স্ট্যাটাস: ইউপিআই পেমেন্ট কনফার্মড`;

    const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Update state with utr and confirmation
    onUpdateUserData({
      utrNumber: utrInput,
      paymentConfirmed: true
    });

    window.open(whatsappUrl, '_blank');
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
          নিরাপদ UPI পেমেন্ট
        </span>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t.paymentTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.paymentSubtitle}
        </p>
      </div>

      {/* Order Summary Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 mb-6 text-xs sm:text-sm">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <span className="text-slate-500 font-medium">{t.selectedItem}</span>
          <span className="font-bold text-slate-900 text-right max-w-[65%] truncate">
            {serviceName}
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <span className="text-slate-500 font-medium">{t.customerName}</span>
          <span className="font-semibold text-slate-800">
            {userData.name} ({userData.phone})
          </span>
        </div>

        {userData.mapLink && (
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {t.locationStatus}
            </span>
            <a
              href={userData.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{t.viewOnMaps}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        <div className="flex justify-between items-center pt-1">
          <span className="text-sm font-bold text-slate-800">{t.totalAmount}</span>
          <span className="text-xl font-bold text-emerald-700 tabular-nums">
            ₹{price}
          </span>
        </div>
      </div>

      {/* QR Code Container */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 text-center mb-6">
        <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center justify-center gap-1.5">
          <QrCode className="w-4 h-4 text-emerald-600" />
          <span>{t.scanQrNotice}</span>
        </div>

        <div className="inline-block p-3 bg-white rounded-xl shadow-sm border border-slate-200/80 mb-3">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="UPI QR Code"
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-slate-100 rounded-lg">
              <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Merchant UPI ID & Quick Copy */}
        <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
          <span className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 truncate">
            {config.upiId}
          </span>
          <button
            onClick={handleCopyUpi}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
            title={t.copyUpi}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyUpi}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Direct UPI App Trigger (Mobile intent) */}
      <div className="mb-6 space-y-2">
        <a
          id="upi-pay-btn"
          href={upiIntentUrl}
          className="w-full min-h-[46px] px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-colors text-center cursor-pointer block"
        >
          <CreditCard className="w-4 h-4 shrink-0" />
          <span>{t.directPayBtn}</span>
        </a>

        {/* UPI Apps pill list */}
        <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-500 font-medium">
          <span>GPay</span>
          <span>·</span>
          <span>PhonePe</span>
          <span>·</span>
          <span>Paytm</span>
          <span>·</span>
          <span>BHIM UPI</span>
        </div>
      </div>

      {/* Transaction ID & Confirmation */}
      <div className="space-y-4 mb-6 pt-4 border-t border-slate-100">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
            {t.utrLabel}
          </label>
          <input
            type="text"
            value={utrInput}
            onChange={(e) => {
              setUtrInput(e.target.value);
              onUpdateUserData({ utrNumber: e.target.value });
            }}
            placeholder={t.utrPlaceholder}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700">
          <input
            type="checkbox"
            checked={isPaidChecked}
            onChange={(e) => {
              setIsPaidChecked(e.target.checked);
              onUpdateUserData({ paymentConfirmed: e.target.checked });
            }}
            className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
          />
          <span>{t.confirmCheckbox}</span>
        </label>
      </div>

      {/* Main WhatsApp Submission Button */}
      <div className="space-y-3">
        <button
          onClick={handleWhatsAppSend}
          className="w-full min-h-[50px] px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-700/10 transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
          <span>{t.whatsappBtn}</span>
        </button>

        <p className="text-center text-[11px] text-slate-500">
          {t.whatsappTooltip}
        </p>
      </div>

      {/* Receipt View Button */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
        <button
          onClick={onOpenReceipt}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
        >
          <Receipt className="w-4 h-4 text-emerald-600" />
          <span>{t.receipt}</span>
        </button>
      </div>
    </div>
  );
};
