import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Phone, Search, MapPin, Calendar, Clock, User, Building2, Send, Bug, MessageSquare, ExternalLink, Shield, Smartphone, FileText, Copy, Check, CreditCard, X, Info, Map } from 'lucide-react';
import { ScreenView } from '../types';
import { InheritanceCalculatorView } from './InheritanceCalculator/InheritanceCalculatorView';
import { Religion } from './InheritanceCalculator/types';
import { PrivacyPolicy } from './PrivacyPolicy';

interface ServiceViewsProps {
  currentView: ScreenView;
  onBack: () => void;
  onNavigate: (view: ScreenView) => void;
  initialReligion?: Religion;
}

interface BkashPaymentSectionProps {
  idPrefix: string;
  trxId: string;
  onTrxIdChange: (val: string) => void;
  feeText?: string;
  instructionText?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  bkashCopied: boolean;
  onCopyBkash: () => void;
}

const BkashPaymentSection: React.FC<BkashPaymentSectionProps> = ({
  idPrefix,
  trxId,
  onTrxIdChange,
  feeText,
  instructionText = 'এই নম্বরে Send Money করুন, তারপর Transaction ID উপরের বক্সে লিখে আবেদন বাটনে ক্লিক করুন।',
  isOpen,
  onToggle,
  onClose,
  bkashCopied,
  onCopyBkash,
}) => {
  return (
    <div className="space-y-2 pt-1">
      {/* ট্রানজেকশন আইডি ফিল্ড (ঐচ্ছিক) */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-bold text-gray-800">
            ট্রানজেকশন আইডি <span className="text-gray-400 font-normal text-[11px]">(ঐচ্ছিক / Optional)</span>
          </label>
          {feeText && (
            <span className="text-[11px] text-pink-700 font-semibold">
              {feeText}
            </span>
          )}
        </div>
        <input
          type="text"
          autoComplete="off"
          id={`${idPrefix}-trxid-input`}
          placeholder="bKash TrxID লিখুন (যদি পেমেন্ট করে থাকেন - ঐচ্ছিক)"
          value={trxId}
          onChange={(e) => onTrxIdChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono uppercase tracking-wider"
        />
        <p className="text-[10px] text-gray-500 mt-1">
          পেমেন্ট সম্পন্ন করে থাকলে TrxID দিন। এটি বাধ্যতামূলক নয়, খালি রেখেও আবেদন পাঠাতে পারেন।
        </p>
      </div>

      {/* পেমেন্ট করুন বাটন */}
      <div>
        <button
          type="button"
          onClick={onToggle}
          id={`btn-${idPrefix}-payment-open`}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-50 to-pink-100/70 hover:from-pink-100 hover:to-pink-200/80 text-[#D12053] border border-pink-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
        >
          <CreditCard size={16} className="text-[#E2136E]" />
          <span>পেমেন্ট করুন (bKash: 01635700386)</span>
        </button>
      </div>

      {/* বিকাশ পেমেন্ট বিবরণ বক্স */}
      {isOpen && (
        <div className="p-4 bg-white border-2 border-[#E2136E]/40 rounded-2xl shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-pink-100">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#E2136E] text-white text-[11px] font-bold">
                bKash
              </span>
              <span className="text-xs font-bold text-gray-900">
                বিকাশ পেমেন্ট বিবরণ
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              title="বন্ধ করুন"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between bg-pink-50/70 p-2.5 rounded-xl border border-pink-200">
              <div>
                <span className="text-[11px] text-gray-500 block">bKash নম্বর (Personal)</span>
                <span className="text-sm font-mono font-bold text-[#E2136E] tracking-wider">
                  01635700386
                </span>
              </div>
              <button
                type="button"
                onClick={onCopyBkash}
                className="px-2.5 py-1.5 bg-white hover:bg-pink-100 text-xs font-bold text-[#E2136E] border border-pink-300 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                {bkashCopied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-600">কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-gray-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
              <p className="font-semibold text-amber-950 mb-0.5">নির্দেশনা:</p>
              <p>{instructionText}</p>
            </div>

            <div className="flex items-center justify-between text-xs px-1 text-gray-600">
              {feeText ? (
                <span>ফি: <strong className="text-gray-900 font-medium">{feeText.replace(/^ফি:\s*/, '')}</strong></span>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const el = document.getElementById(`${idPrefix}-trxid-input`);
                  if (el) el.focus();
                }}
                className="text-[11px] font-bold text-[#0A2540] hover:underline cursor-pointer"
              >
                বুঝেছি, TrxID লিখুন →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ServiceViews: React.FC<ServiceViewsProps> = ({
  currentView,
  onBack,
  onNavigate,
  initialReligion,
}) => {
  if (currentView === 'inheritance_calculator') {
    return <InheritanceCalculatorView onBack={onBack} initialReligion={initialReligion} />;
  }

  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('OB-003');
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');
  const [generatedMessageText, setGeneratedMessageText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bkashCopied, setBkashCopied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    district: '',
    upazila: '',
    mouza: '',
    jlNo: '',
    sheetNo: '',
    mapType: '',
    halDaag: '',
    sabekDaag: '',
    reportNo: '',
    deedNo: '',
    deedDate: '',
    dataName: '',
    grohitaName: '',
    landAmount: '',
    registryOffice: '',
    khatianType: '',
    khatianNo: '',
    daagNo: '',
    issueDesc: '',
    trxId: '',
  });

  const BUSINESS_WHATSAPP = '8801873434500';

  const constructWhatsAppMessage = (view: ScreenView, id?: string): string => {
    switch (view) {
      case 'land_survey': {
        const lines = [
          '*নতুন ভূমি পরিমাপ আবেদন*',
          'সার্ভিস: ভূমি পরিমাপ',
          `নাম: ${formData.name || 'উল্লেখ নেই'}`,
          `ফোন: ${formData.phone || 'উল্লেখ নেই'}`,
          `ঠিকানা: ${formData.address || 'উল্লেখ নেই'}`,
          `তারিখ: ${formData.date || 'উল্লেখ নেই'}`,
          formData.trxId ? `ট্রানজেকশন আইডি: ${formData.trxId}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'pantagraph': {
        const lines = [
          '*নতুন প্যান্টাগ্রাফ আবেদন*',
          'সার্ভিস: প্যান্টাগ্রাফ তৈরি',
          `নাম: ${formData.name || 'উল্লেখ নেই'}`,
          `ফোন / WhatsApp: ${formData.phone || 'উল্লেখ নেই'}`,
          `জেলা: ${formData.district || 'উল্লেখ নেই'}`,
          `উপজেলা: ${formData.upazila || 'উল্লেখ নেই'}`,
          `মৌজা: ${formData.mouza || 'উল্লেখ নেই'}`,
          formData.jlNo ? `জে.এল নং: ${formData.jlNo}` : null,
          `সাবেক দাগ: ${formData.sabekDaag || 'উল্লেখ নেই'}`,
          `হাল দাগ: ${formData.halDaag || 'উল্লেখ নেই'}`,
          formData.trxId ? `ট্রানজেকশন আইডি: ${formData.trxId}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'report_search': {
        const lines = [
          '*রিপোর্ট অনুসন্ধান আবেদন*',
          `নাম: ${formData.name || 'উল্লেখ নেই'}`,
          `মৌজা: ${formData.mouza || 'উল্লেখ নেই'}`,
          `রিপোর্ট নম্বর: ${formData.reportNo || 'উল্লেখ নেই'}`,
          `WhatsApp নম্বর: ${formData.phone || 'উল্লেখ নেই'}`,
          `ট্রানজেকশন আইডি: ${formData.trxId ? formData.trxId : 'প্রযোজ্য নয় (ঐচ্ছিক)'}`,
        ];
        return lines.join('\n');
      }

      case 'deed_search': {
        const lines = [
          '*নতুন দলিল উত্তোলন আবেদন*',
          'সার্ভিস: দলিল উত্তোলন',
          `রেজিস্ট্রেশন তারিখ: ${formData.deedDate || 'উল্লেখ নেই'}`,
          formData.deedNo ? `দলিল নম্বর: ${formData.deedNo}` : null,
          `দাতা: ${formData.dataName || 'উল্লেখ নেই'}`,
          `গ্রহিতা: ${formData.grohitaName || 'উল্লেখ নেই'}`,
          `জমির পরিমাণ: ${formData.landAmount || 'উল্লেখ নেই'}`,
          `রেজিস্ট্রি অফিস: ${formData.registryOffice || 'উল্লেখ নেই'}`,
          formData.phone ? `WhatsApp নম্বর: ${formData.phone}` : null,
          formData.trxId ? `ট্রানজেকশন আইডি: ${formData.trxId}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'khatian_search': {
        const lines = [
          '*নতুন খতিয়ান উত্তোলন আবেদন*',
          'সার্ভিস: খতিয়ান উত্তোলন',
          `জেলা: ${formData.district || 'উল্লেখ নেই'}`,
          `উপজেলা: ${formData.upazila || 'উল্লেখ নেই'}`,
          `মৌজা: ${formData.mouza || 'উল্লেখ নেই'}`,
          `জে. এল নং: ${formData.jlNo || 'উল্লেখ নেই'}`,
          `খতিয়ান ধরন: ${formData.khatianType || 'উল্লেখ নেই'}`,
          `খতিয়ান নাম্বার: ${formData.khatianNo || 'উল্লেখ নেই'}`,
          formData.daagNo ? `দাগ নাম্বার: ${formData.daagNo}` : null,
          `WhatsApp নম্বর: ${formData.phone || 'উল্লেখ নেই'}`,
          formData.trxId ? `ট্রানজেকশন আইডি: ${formData.trxId}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'open_booking': {
        const lines = [
          '*ওপেন বুকিং অনুরোধ*',
          `সার্ভিস: ওপেন বুকিং (${id || 'OB-003'})`,
          `নাম: ${formData.name || 'উল্লেখ নেই'}`,
          `ঠিকানা: ${formData.address || 'উল্লেখ নেই'}`,
          `WhatsApp নম্বর: ${formData.phone || 'উল্লেখ নেই'}`,
          `সমস্যার বিবরণ: ${formData.issueDesc || 'উল্লেখ নেই'}`,
          formData.trxId ? `ট্রানজেকশন আইডি: ${formData.trxId}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'mouza_map': {
        const lines = [
          '*মৌজা ম্যাপ উত্তোলন আবেদন*',
          `নাম: ${formData.name || 'উল্লেখ নেই'}`,
          `জেলা: ${formData.district || 'উল্লেখ নেই'}`,
          `উপজেলা: ${formData.upazila || 'উল্লেখ নেই'}`,
          `মৌজা: ${formData.mouza || 'উল্লেখ নেই'}`,
          `জে.এল নং: ${formData.jlNo || 'উল্লেখ নেই'}`,
          `সিট নম্বর: ${formData.sheetNo || 'উল্লেখ নেই'}`,
          `নকশা ধরন: ${formData.mapType || 'উল্লেখ নেই'}`,
          `ট্রানজেকশন আইডি: ${formData.trxId ? formData.trxId : 'প্রযোজ্য নয় (ঐচ্ছিক)'}`,
        ];
        return lines.join('\n');
      }

      default: {
        const lines = [
          '*সার্ভিস আবেদন*',
          `সার্ভিস: ${view}`,
          formData.name ? `নাম: ${formData.name}` : null,
          formData.phone ? `WhatsApp: ${formData.phone}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent, customId?: string) => {
    e.preventDefault();
    const newId = customId || 'REQ-' + Math.floor(100 + Math.random() * 900);
    setSubmittedId(newId);

    // 1. Build formatted text message
    const message = constructWhatsAppMessage(currentView, newId);
    setGeneratedMessageText(message);

    // 2. Build WhatsApp Click-to-Chat URL
    const waUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
    setGeneratedWhatsAppUrl(waUrl);

    setSubmitted(true);

    // 3. Open WhatsApp in a new tab/app
    try {
      const newTab = window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (!newTab) {
        const a = document.createElement('a');
        a.href = waUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('WhatsApp link redirect notice:', err);
    }
  };

  const copyToClipboard = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(generatedMessageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const copyBkashNumber = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('01635700386');
      setBkashCopied(true);
      setTimeout(() => setBkashCopied(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setCopied(false);
    setShowPaymentModal(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-3 pb-24 animate-in fade-in duration-200">
      {/* Top Bar with Back Arrow */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
        <button
          onClick={onBack}
          id="service-view-back-btn"
          className="flex items-center gap-2 text-[#0A2540] font-bold text-sm hover:text-amber-800 transition-colors cursor-pointer py-1"
        >
          <ArrowLeft size={18} />
          <span>ফিরে যান (হোম)</span>
        </button>

        <span className="text-xs font-semibold text-gray-500 font-cinzel">
          Ahmed Survey
        </span>
      </div>

      {submitted ? (
        <div className="bg-white border border-emerald-200 rounded-2xl p-5 shadow-sm">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2.5">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-base font-bold text-gray-900 text-center mb-0.5">
            আবেদন প্রস্তুত হয়েছে!
          </h3>
          <p className="text-xs text-gray-600 text-center mb-3.5">
            সরাসরি আমাদের WhatsApp নম্বরে মেসেজ পাঠাতে নিচের বাটনে চাপুন।
          </p>

          {/* Direct WhatsApp Click-to-Chat Button */}
          <a
            href={generatedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="wa-send-direct-btn"
            className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all mb-3 text-center"
          >
            <MessageSquare size={18} className="fill-current" />
            <span>WhatsApp-এ মেসেজ পাঠান</span>
          </a>

          <p className="text-[11px] text-gray-600 text-center mb-4">
            WhatsApp ওপেন হলে মেসেজটি pre-filled থাকবে, কেবল <span className="font-bold text-gray-800">Send</span> বাটনে ট্যাপ করুন।
          </p>

          {/* Formatted Message Preview Card */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 mb-4">
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-gray-200">
              <span className="text-[11px] font-bold text-gray-600">মেসেজ প্রিভিউ (WhatsApp Text):</span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-[11px] font-bold text-[#0A2540] hover:text-emerald-700 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-600">কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-gray-800 whitespace-pre-wrap font-sans leading-relaxed text-left max-h-48 overflow-y-auto">
              {generatedMessageText}
            </pre>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={resetForm}
              className="w-full py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              নতুন আবেদন করুন
            </button>
            <button
              onClick={onBack}
              className="w-full py-2 text-xs font-bold text-[#0A2540] hover:underline cursor-pointer"
            >
              হোম স্ক্রিনে ফিরে যান
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* SCREEN 2: ভূমি পরিমাপ ফর্ম */}
          {currentView === 'land_survey' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <MapPin size={26} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">ভূমি পরিমাপ</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  জমির সঠিক পরিমাপ ও মানচিত্র তৈরি করার জন্য আমাদের সাথে বুকিং করুন।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 mt-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="আপনার ঠিকানা লিখুন"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    WhatsApp নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    পছন্দের তারিখ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] focus:ring-1 focus:ring-[#0A2540] outline-none"
                  />
                </div>

                {/* bKash Payment & TrxID */}
                <BkashPaymentSection
                  idPrefix="land-survey"
                  trxId={formData.trxId}
                  onTrxIdChange={(val) => setFormData({ ...formData, trxId: val })}
                  feeText="ফি: আলোচনা সাপেক্ষে"
                  instructionText="এই নম্বরে Send Money করুন, তারপর Transaction ID উপরের বক্সে লিখে আবেদন করুন বাটনে ক্লিক করুন।"
                  isOpen={showPaymentModal}
                  onToggle={() => setShowPaymentModal(!showPaymentModal)}
                  onClose={() => setShowPaymentModal(false)}
                  bkashCopied={bkashCopied}
                  onCopyBkash={copyBkashNumber}
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4"
                >
                  আবেদন করুন
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 3: প্যান্টাগ্রাফ ফর্ম */}
          {currentView === 'pantagraph' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" className="stroke-[#0A2540]" />
                    <path d="M3 9h18" className="stroke-[#AA771C]" />
                    <path d="M9 21V9" className="stroke-[#AA771C]" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">প্যান্টাগ্রাফ তৈরি</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  জমির নকশা ও প্যান্টাগ্রাফ তৈরি করার জন্য বুকিং করুন।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 mt-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    ফোন নম্বর / WhatsApp নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    জেলা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="জেলার নাম লিখুন"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    উপজেলা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="উপজেলার নাম লিখুন"
                    value={formData.upazila}
                    onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    মৌজা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="মৌজার নাম লিখুন"
                    value={formData.mouza}
                    onChange={(e) => setFormData({ ...formData, mouza: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    জে.এল নং
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="জে.এল নম্বর লিখুন"
                    value={formData.jlNo}
                    onChange={(e) => setFormData({ ...formData, jlNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    সাবেক দাগ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="সাবেক দাগ নম্বর লিখুন"
                    value={formData.sabekDaag}
                    onChange={(e) => setFormData({ ...formData, sabekDaag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    হাল দাগ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="হাল দাগ নম্বর লিখুন"
                    value={formData.halDaag}
                    onChange={(e) => setFormData({ ...formData, halDaag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* bKash Payment & TrxID */}
                <BkashPaymentSection
                  idPrefix="pantagraph"
                  trxId={formData.trxId}
                  onTrxIdChange={(val) => setFormData({ ...formData, trxId: val })}
                  feeText="ফি: প্রযোজ্য অনুযায়ী"
                  instructionText="এই নম্বরে Send Money করুন, তারপর Transaction ID উপরের বক্সে লিখে বুকিং করুন বাটনে ক্লিক করুন।"
                  isOpen={showPaymentModal}
                  onToggle={() => setShowPaymentModal(!showPaymentModal)}
                  onClose={() => setShowPaymentModal(false)}
                  bkashCopied={bkashCopied}
                  onCopyBkash={copyBkashNumber}
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4"
                >
                  বুকিং করুন
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 4: রিপোর্ট অনুসন্ধান ফর্ম */}
          {currentView === 'report_search' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <Search size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">রিপোর্ট অনুসন্ধান</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  মৌজা ও রিপোর্ট নম্বর দিয়ে রিপোর্ট অনুসন্ধান করুন।
                </p>
              </div>

              {/* Fee notice banner */}
              <div className="p-3 bg-amber-50/90 border border-amber-300/80 rounded-xl text-xs font-semibold text-amber-900 flex items-center gap-2 mb-2 shadow-2xs">
                <Info size={16} className="text-amber-700 shrink-0" />
                <span>*পুনঃ রিপোর্ট উত্তোলন ১০০০/- টাকা প্রযোজ্য</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 mt-3" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    মৌজা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="মৌজার নাম লিখুন"
                    value={formData.mouza}
                    onChange={(e) => setFormData({ ...formData, mouza: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    রিপোর্ট নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="রিপোর্ট নম্বর লিখুন"
                    value={formData.reportNo}
                    onChange={(e) => setFormData({ ...formData, reportNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    WhatsApp নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono"
                  />
                </div>

                {/* ট্রানজেকশন আইডি ফিল্ড (ঐচ্ছিক) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-gray-800">
                      ট্রানজেকশন আইডি <span className="text-gray-400 font-normal text-[11px]">(ঐচ্ছিক / Optional)</span>
                    </label>
                    <span className="text-[11px] text-pink-700 font-semibold">
                      ফি: ১০০০/- টাকা
                    </span>
                  </div>
                  <input
                    type="text"
                    autoComplete="off"
                    id="report-search-trxid-input"
                    placeholder="bKash TrxID লিখুন (যদি পেমেন্ট করে থাকেন - ঐচ্ছিক)"
                    value={formData.trxId}
                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono uppercase tracking-wider"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    পেমেন্ট সম্পন্ন করে থাকলে TrxID দিন। এটি বাধ্যতামূলক নয়, খালি রেখেও আবেদন পাঠাতে পারেন।
                  </p>
                </div>

                {/* পেমেন্ট স্টেপ (অনুসন্ধান বাটনের আগে) */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    id="btn-report-payment-open"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-50 to-pink-100/70 hover:from-pink-100 hover:to-pink-200/80 text-[#D12053] border border-pink-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
                  >
                    <CreditCard size={16} className="text-[#E2136E]" />
                    <span>পেমেন্ট করুন (bKash: 01635700386)</span>
                  </button>
                </div>

                {/* Payment Modal / Box */}
                {showPaymentModal && (
                  <div className="p-4 bg-white border-2 border-[#E2136E]/40 rounded-2xl shadow-sm animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-pink-100">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-[#E2136E] text-white text-[11px] font-bold">
                          bKash
                        </span>
                        <span className="text-xs font-bold text-gray-900">
                          বিকাশ পেমেন্ট বিবরণ
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPaymentModal(false)}
                        className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                        title="বন্ধ করুন"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between bg-pink-50/70 p-2.5 rounded-xl border border-pink-200">
                        <div>
                          <span className="text-[11px] text-gray-500 block">bKash নম্বর (Personal)</span>
                          <span className="text-sm font-mono font-bold text-[#E2136E] tracking-wider">
                            01635700386
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={copyBkashNumber}
                          className="px-2.5 py-1.5 bg-white hover:bg-pink-100 text-xs font-bold text-[#E2136E] border border-pink-300 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        >
                          {bkashCopied ? (
                            <>
                              <Check size={13} className="text-emerald-600" />
                              <span className="text-emerald-600">কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>কপি করুন</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-gray-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
                        <p className="font-semibold text-amber-950 mb-0.5">নির্দেশনা:</p>
                        <p>
                          এই নম্বরে Send Money করুন, তারপর Transaction ID উপরের বক্সে লিখে অনুসন্ধান বাটনে ক্লিক করুন
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs px-1 text-gray-600">
                        <span>ফি: <strong className="text-gray-900 font-mono">৳ ১০০০/-</strong></span>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPaymentModal(false);
                            const el = document.getElementById('report-search-trxid-input');
                            if (el) el.focus();
                          }}
                          className="text-[11px] font-bold text-[#0A2540] hover:underline cursor-pointer"
                        >
                          বুঝেছি, TrxID লিখুন →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  id="btn-report-search-submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4 flex items-center justify-center gap-2"
                >
                  <Search size={16} />
                  <span>অনুসন্ধান</span>
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 5: দলিল উত্তোলন ফর্ম */}
          {currentView === 'deed_search' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <CheckCircle2 size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">দলিল উত্তোলন</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  জমির মূল দলিল বা সহিহ মহুরি নকল উত্তোলনের জন্য আবেদন করুন।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 mt-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    দলিল রেজিস্ট্রেশন তারিখ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.deedDate}
                    onChange={(e) => setFormData({ ...formData, deedDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    দলিল নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="দলিল নম্বর লিখুন"
                    value={formData.deedNo}
                    onChange={(e) => setFormData({ ...formData, deedNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    দাতা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="দাতার নাম লিখুন"
                    value={formData.dataName}
                    onChange={(e) => setFormData({ ...formData, dataName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    গ্রহিতা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="গ্রহীতার নাম লিখুন"
                    value={formData.grohitaName}
                    onChange={(e) => setFormData({ ...formData, grohitaName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    জমির পরিমাণ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="যেমন: ৫ শতক / ১০ কাঠা"
                    value={formData.landAmount}
                    onChange={(e) => setFormData({ ...formData, landAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    রেজিস্ট্রি অফিসের নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="সাব-রেজিস্ট্রি অফিসের নাম লিখুন"
                    value={formData.registryOffice}
                    onChange={(e) => setFormData({ ...formData, registryOffice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    WhatsApp নম্বর
                  </label>
                  <input
                    type="tel"
                    autoComplete="off"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono"
                  />
                </div>

                {/* bKash Payment & TrxID */}
                <BkashPaymentSection
                  idPrefix="deed-search"
                  trxId={formData.trxId}
                  onTrxIdChange={(val) => setFormData({ ...formData, trxId: val })}
                  feeText="ফি: প্রযোজ্য অনুযায়ী"
                  instructionText="এই নম্বরে Send Money করুন, তারপর Transaction ID উপরের বক্সে লিখে উত্তোলন আবেদন করুন বাটনে ক্লিক করুন।"
                  isOpen={showPaymentModal}
                  onToggle={() => setShowPaymentModal(!showPaymentModal)}
                  onClose={() => setShowPaymentModal(false)}
                  bkashCopied={bkashCopied}
                  onCopyBkash={copyBkashNumber}
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4"
                >
                  উত্তোলন আবেদন করুন
                </button>
              </form>
            </div>
          )}

          {/* SCREEN: খতিয়ান উত্তোলন ফর্ম */}
          {currentView === 'khatian_search' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <FileText size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">খতিয়ান উত্তোলন</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  অনলাইন পর্চা ও সহিহ মহুরি খতিয়ান উত্তোলনের জন্য প্রয়োজনীয় তথ্য পূরণ করুন।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 mt-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    জেলা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="জেলার নাম লিখুন"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    উপজেলা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="উপজেলার নাম লিখুন"
                    value={formData.upazila}
                    onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    মৌজা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="মৌজার নাম লিখুন"
                    value={formData.mouza}
                    onChange={(e) => setFormData({ ...formData, mouza: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    জে. এল নং <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="জে. এল নম্বর লিখুন"
                    value={formData.jlNo}
                    onChange={(e) => setFormData({ ...formData, jlNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    খতিয়ান ধরন <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="যেমন: CS / SA / RS / BS / নামজারি"
                    value={formData.khatianType}
                    onChange={(e) => setFormData({ ...formData, khatianType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    খতিয়ান নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="খতিয়ান নম্বর লিখুন"
                    value={formData.khatianNo}
                    onChange={(e) => setFormData({ ...formData, khatianNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    দাগ নাম্বার <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="দাগ নম্বর লিখুন (ঐচ্ছিক)"
                    value={formData.daagNo}
                    onChange={(e) => setFormData({ ...formData, daagNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    WhatsApp নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono"
                  />
                </div>

                {/* bKash Payment & TrxID */}
                <BkashPaymentSection
                  idPrefix="khatian-search"
                  trxId={formData.trxId}
                  onTrxIdChange={(val) => setFormData({ ...formData, trxId: val })}
                  feeText="ফি: প্রযোজ্য অনুযায়ী"
                  instructionText="এই নম্বরে Send Money করুন, তারপর Transaction ID উপরের বক্সে লিখে উত্তোলন আবেদন করুন বাটনে ক্লিক করুন।"
                  isOpen={showPaymentModal}
                  onToggle={() => setShowPaymentModal(!showPaymentModal)}
                  onClose={() => setShowPaymentModal(false)}
                  bkashCopied={bkashCopied}
                  onCopyBkash={copyBkashNumber}
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4"
                >
                  উত্তোলন আবেদন করুন
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 6: ওপেন বুকিং ফর্ম */}
          {currentView === 'open_booking' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" className="stroke-[#0A2540]" />
                    <circle cx="8" cy="10" r="1" fill="#AA771C" />
                    <circle cx="12" cy="10" r="1" fill="#AA771C" />
                    <circle cx="16" cy="10" r="1" fill="#AA771C" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">ওপেন বুকিং</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  যে কোনো সার্ভে বিষয়ক পরামর্শের জন্য এখানে বুকিং করুন।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 mt-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="আপনার ঠিকানা লিখুন"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    WhatsApp নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    সমস্যার বিবরণ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="সমস্যার বিবরণ লিখুন"
                    value={formData.issueDesc}
                    onChange={(e) => setFormData({ ...formData, issueDesc: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    ট্রানজেকশন আইডি <span className="text-gray-400 font-normal text-[11px]">(ঐচ্ছিক / Optional)</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="open-booking-trxid-input"
                    placeholder="bKash TrxID লিখুন (যদি পেমেন্ট করে থাকেন - ঐচ্ছিক)"
                    value={formData.trxId}
                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono uppercase tracking-wider"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    পরামর্শ ফি বিকাশ করে থাকলে TrxID লিখুন, নতুবা ফাঁকা রেখেও সাবমিট করতে পারেন।
                  </p>
                </div>

                <button
                  type="submit"
                  id="btn-open-booking-submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4"
                >
                  আবেদন জমা দিন
                </button>
              </form>

              {/* পরামর্শ ফি প্রদান করতে হবে অপশন */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-center shadow-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm mb-2">
                  <Info size={15} className="text-[#AA771C]" />
                  <span>পরামর্শ ফি প্রদান করতে হবে</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed max-w-xs mx-auto mb-3">
                  সার্ভে বিষয়ক বিস্তারিত ও তাৎক্ষণিক পরামর্শের জন্য নির্ধারিত ফি প্রযোজ্য।
                </p>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  id="btn-open-booking-payment"
                  className="w-full py-2.5 px-4 bg-white hover:bg-pink-50 text-[#D12053] border border-pink-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
                >
                  <CreditCard size={15} className="text-[#E2136E]" />
                  <span>পেমেন্ট করুন (bKash: 01635700386)</span>
                </button>
              </div>

              {/* বিকাশ পেমেন্ট মডাল */}
              {showPaymentModal && (
                <div className="mt-3 p-4 bg-white border-2 border-[#E2136E]/40 rounded-2xl shadow-sm animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-pink-100">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#E2136E] text-white text-[11px] font-bold">
                        bKash
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        বিকাশ পেমেন্ট বিবরণ
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                      title="বন্ধ করুন"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-left">
                    <div className="flex items-center justify-between bg-pink-50/70 p-2.5 rounded-xl border border-pink-200">
                      <div>
                        <span className="text-[11px] text-gray-500 block">bKash নম্বর (Personal)</span>
                        <span className="text-sm font-mono font-bold text-[#E2136E] tracking-wider">
                          01635700386
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={copyBkashNumber}
                        className="px-2.5 py-1.5 bg-white hover:bg-pink-100 text-xs font-bold text-[#E2136E] border border-pink-300 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        {bkashCopied ? (
                          <>
                            <Check size={13} className="text-emerald-600" />
                            <span className="text-emerald-600">কপি হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-gray-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
                      <p className="font-semibold text-amber-950 mb-0.5">নির্দেশনা:</p>
                      <p>
                        এই নম্বরে Send Money করুন। পরামর্শ ফি সংক্রান্ত যে কোনো তথ্যের জন্য WhatsApp-এ মেসেজ দিন।
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCREEN 7: মৌজা ম্যাপ উত্তোলন ফর্ম */}
          {currentView === 'mouza_map' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2 shadow-2xs">
                  <Map size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">মৌজা ম্যাপ উত্তোলন</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  সিএস / আরএস / ডিয়ারা / এসএ মৌজা নকশা উত্তোলনের আবেদন করুন
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 mt-4" autoComplete="off">
                {/* ১. নাম */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* ২. জেলা */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    জেলা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="জেলার নাম লিখুন"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* ৩. উপজেলা */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    উপজেলা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="উপজেলার নাম লিখুন"
                    value={formData.upazila}
                    onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* ৪. মৌজা */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    মৌজা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="মৌজার নাম লিখুন"
                    value={formData.mouza}
                    onChange={(e) => setFormData({ ...formData, mouza: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* ৫. জে.এল নং */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    জে.এল নং <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="জে.এল নম্বর লিখুন"
                    value={formData.jlNo}
                    onChange={(e) => setFormData({ ...formData, jlNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* ৬. সিট নম্বর */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    সিট নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="সিট নম্বর লিখুন (যেমন: ১, ২ বা উল্লেখ নেই)"
                    value={formData.sheetNo}
                    onChange={(e) => setFormData({ ...formData, sheetNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* ৭. নকশা ধরন */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    নকশা ধরন <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="যেমন: সি.এস / আর.এস / ডিয়ারা"
                    value={formData.mapType}
                    onChange={(e) => setFormData({ ...formData, mapType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                {/* ৮. ট্রানজেকশন আইডি (ঐচ্ছিক) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-gray-800">
                      ট্রানজেকশন আইডি <span className="text-gray-400 font-normal text-[11px]">(ঐচ্ছিক / Optional)</span>
                    </label>
                    <span className="text-[11px] text-pink-700 font-semibold">
                      ম্যাপ ফি: প্রযোজ্য অনুযায়ী
                    </span>
                  </div>
                  <input
                    type="text"
                    autoComplete="off"
                    id="mouza-map-trxid-input"
                    placeholder="bKash TrxID লিখুন (যদি পেমেন্ট করে থাকেন - ঐচ্ছিক)"
                    value={formData.trxId}
                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none font-mono uppercase tracking-wider"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    পেমেন্ট সম্পন্ন করে থাকলে TrxID দিন। এটি বাধ্যতামূলক নয়, খালি রেখেও আবেদন পাঠাতে পারেন।
                  </p>
                </div>

                {/* পেমেন্ট করুন বাটন (সাবমিট বাটনের আগে) */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    id="btn-mouza-map-payment-open"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-50 to-pink-100/70 hover:from-pink-100 hover:to-pink-200/80 text-[#D12053] border border-pink-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
                  >
                    <CreditCard size={16} className="text-[#E2136E]" />
                    <span>পেমেন্ট করুন (bKash: 01635700386)</span>
                  </button>
                </div>

                {/* বিকাশ পেমেন্ট মডাল */}
                {showPaymentModal && (
                  <div className="p-4 bg-white border-2 border-[#E2136E]/40 rounded-2xl shadow-sm animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-pink-100">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-[#E2136E] text-white text-[11px] font-bold">
                          bKash
                        </span>
                        <span className="text-xs font-bold text-gray-900">
                          বিকাশ পেমেন্ট বিবরণ
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPaymentModal(false)}
                        className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                        title="বন্ধ করুন"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between bg-pink-50/70 p-2.5 rounded-xl border border-pink-200">
                        <div>
                          <span className="text-[11px] text-gray-500 block">bKash নম্বর (Personal)</span>
                          <span className="text-sm font-mono font-bold text-[#E2136E] tracking-wider">
                            01635700386
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={copyBkashNumber}
                          className="px-2.5 py-1.5 bg-white hover:bg-pink-100 text-xs font-bold text-[#E2136E] border border-pink-300 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        >
                          {bkashCopied ? (
                            <>
                              <Check size={13} className="text-emerald-600" />
                              <span className="text-emerald-600">কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>কপি করুন</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-gray-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
                        <p className="font-semibold text-amber-950 mb-0.5">নির্দেশনা:</p>
                        <p>
                          এই নম্বরে Send Money করুন, তারপর Transaction ID উপরের বক্সে লিখে আবেদন জমা দিন বাটনে ক্লিক করুন।
                        </p>
                      </div>

                      <div className="flex items-center justify-end text-xs px-1 text-gray-600">
                        <button
                          type="button"
                          onClick={() => {
                            setShowPaymentModal(false);
                            const el = document.getElementById('mouza-map-trxid-input');
                            if (el) el.focus();
                          }}
                          className="text-[11px] font-bold text-[#0A2540] hover:underline cursor-pointer"
                        >
                          বুঝেছি, TrxID লিখুন →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* সাবমিট বাটন */}
                <button
                  type="submit"
                  id="btn-mouza-map-submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4 flex items-center justify-center gap-2"
                >
                  <Map size={16} />
                  <span>আবেদন জমা দিন</span>
                </button>
              </form>
            </div>
          )}

          {/* SCREEN: যোগাযোগ করুন (Contact Us) */}
          {currentView === 'contact_us' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <MessageSquare size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">যোগাযোগ করুন</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  ডেভেলপমেন্ট ও সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন
                </p>
              </div>

              {/* Contact Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3.5 mb-4">
                {/* Developer */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0A2540] flex items-center justify-center font-bold text-xs">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">Developer</span>
                      <span className="text-sm font-bold text-gray-900">Shayed Afride</span>
                    </div>
                  </div>
                </div>

                {/* Organization */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">Organization</span>
                      <span className="text-sm font-bold text-gray-900">Ahmed Survey Solution</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">WhatsApp</span>
                      <a
                        href="https://wa.me/8801630965636"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-emerald-700 hover:underline flex items-center gap-1 font-mono"
                      >
                        <span>01630965636</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/8801630965636"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    চ্যাট করুন
                  </a>
                </div>

                {/* Response time note */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
                  <Clock size={15} className="text-amber-700 shrink-0" />
                  <span className="font-medium">সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়</span>
                </div>
              </div>

              {/* WhatsApp Feedback & Bug Report Buttons */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-800">মতামত, সহায়তা ও অ্যাপ অর্ডার:</h3>
                
                {/* 1. Send Feedback Button */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-gray-500 block">১ নম্বর অপশন: মতামত জানান</span>
                  <a
                    id="btn-send-feedback"
                    href="https://wa.me/8801630965636?text=Ahmed%20Survey%20Feedback%3A%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0A2540] hover:bg-[#12365A] active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Send size={15} className="text-amber-300" />
                    <span>মতামত জানান (Send Feedback)</span>
                  </a>
                </div>

                {/* 2. Report a Bug Button */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-gray-500 block">২ নম্বর অপশন: সমস্যা রিপোর্ট করুন</span>
                  <a
                    id="btn-report-bug"
                    href="https://wa.me/8801630965636?text=Ahmed%20Survey%20Bug%20Report%3A%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Bug size={15} />
                    <span>সমস্যা রিপোর্ট করুন (Report a Bug)</span>
                  </a>
                </div>

                {/* 3. আপনার অ্যাপ অর্ডার করুন (Option 3 inside Contact Us) */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold text-gray-500 block">৩ নম্বর অপশন: আপনার অ্যাপ অর্ডার করুন</span>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/80 border border-amber-300/80 shadow-xs space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0A2540]">
                      <Smartphone size={16} className="text-amber-600" />
                      <span>আপনার অ্যাপ অর্ডার করুন (Place Order for Your App)</span>
                    </div>
                    <p className="text-xs text-gray-700 font-medium leading-relaxed">
                      "আপনার ব্যবসা বা আইডিয়ার জন্য কাস্টম অ্যাপ তৈরি করাতে চান? যোগাযোগ করুন।"
                    </p>
                    <a
                      id="btn-contact-order-custom-app"
                      href="https://wa.me/8801630965636?text=Hi%2C%20I'm%20interested%20in%20ordering%20a%20custom%20app.%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <MessageSquare size={16} />
                      <span>WhatsApp-এ অর্ডার দিন</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: আপনার অ্যাপ অর্ডার করুন (Place Order for Your App) */}
          {currentView === 'order_app' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-100 to-amber-50 border border-amber-300 flex items-center justify-center text-[#0A2540] mb-2 shadow-xs">
                  <Smartphone size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">আপনার অ্যাপ অর্ডার করুন</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  কাস্টম সফটওয়্যার ও মোবাইল অ্যাপ ডেভেলপমেন্ট
                </p>
              </div>

              {/* Pitch Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs mb-4">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-sky-50/70 via-white to-amber-50/70 border border-gray-200 mb-4 text-center">
                  <p className="text-sm font-bold text-[#0A2540] leading-relaxed">
                    "আপনার ব্যবসা বা আইডিয়ার জন্য কাস্টম অ্যাপ তৈরি করাতে চান? যোগাযোগ করুন।"
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-gray-700 mb-5">
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>আধুনিক, ফাস্ট ও রেসপনসিভ ওয়েব ও মোবাইল অ্যাপ্লিকেশন</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>টোটাল স্টেশন, সার্ভে বা যেকোনো ব্যবসার জন্য কাস্টমাইজড সল্যুশন</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>ডেভেলপার: Shayed Afride</span>
                  </div>
                </div>

                {/* WhatsApp Order Button with pre-filled message */}
                <a
                  id="btn-order-app-whatsapp"
                  href="https://wa.me/8801630965636?text=Hi%2C%20I'm%20interested%20in%20ordering%20a%20custom%20app.%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp-এ অর্ডার দিন</span>
                </a>
              </div>
            </div>
          )}

          {/* SCREEN: Privacy Policy (গোপনীয়তা নীতি) */}
          {currentView === 'privacy_policy' && (
            <PrivacyPolicy onBack={onBack} showBackHomeBtn={false} />
          )}
        </>
      )}
    </div>
  );
};
