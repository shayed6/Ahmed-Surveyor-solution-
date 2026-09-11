import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Phone, Search, FileUp, Sparkles, MapPin, Calendar, Clock, DollarSign, User, Building2, Send, Bug, MessageSquare, ExternalLink, Shield, Smartphone, FileText, Copy, Check } from 'lucide-react';
import { ScreenView } from '../types';

interface ServiceViewsProps {
  currentView: ScreenView;
  onBack: () => void;
  onNavigate: (view: ScreenView) => void;
}

export const ServiceViews: React.FC<ServiceViewsProps> = ({
  currentView,
  onBack,
  onNavigate,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('OB-003');
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');
  const [generatedMessageText, setGeneratedMessageText] = useState('');
  const [copied, setCopied] = useState(false);

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
        ];
        return lines.join('\n');
      }

      case 'pantagraph': {
        const lines = [
          '*নতুন প্যান্টাগ্রাফ আবেদন*',
          'সার্ভিস: প্যান্টাগ্রাফ তৈরি',
          `জেলা: ${formData.district || 'উল্লেখ নেই'}`,
          `উপজেলা: ${formData.upazila || 'উল্লেখ নেই'}`,
          `মৌজা: ${formData.mouza || 'উল্লেখ নেই'}`,
          `হাল দাগ: ${formData.halDaag || 'উল্লেখ নেই'}`,
          `সাবেক দাগ: ${formData.sabekDaag || 'উল্লেখ নেই'}`,
          formData.jlNo ? `জে.এল নং: ${formData.jlNo}` : null,
          formData.name ? `নাম: ${formData.name}` : null,
          formData.phone ? `ফোন / WhatsApp: ${formData.phone}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'report_search': {
        const lines = [
          '*রিপোর্ট অনুসন্ধান আবেদন*',
          'সার্ভিস: রিপোর্ট অনুসন্ধান',
          `মৌজা: ${formData.mouza || 'উল্লেখ নেই'}`,
          `রিপোর্ট নম্বর: ${formData.reportNo || 'উল্লেখ নেই'}`,
          `WhatsApp নম্বর: ${formData.phone || 'উল্লেখ নেই'}`,
          formData.name ? `নাম: ${formData.name}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'deed_search': {
        const lines = [
          '*নতুন দলিল উত্তোলন আবেদন*',
          'সার্ভিস: দলিল অনুসন্ধান',
          `রেজিস্ট্রেশন তারিখ: ${formData.deedDate || 'উল্লেখ নেই'}`,
          `দাতা: ${formData.dataName || 'উল্লেখ নেই'}`,
          `গ্রহিতা: ${formData.grohitaName || 'উল্লেখ নেই'}`,
          `জমির পরিমাণ: ${formData.landAmount || 'উল্লেখ নেই'}`,
          `রেজিস্ট্রি অফিস: ${formData.registryOffice || 'উল্লেখ নেই'}`,
          formData.deedNo ? `দলিল নম্বর: ${formData.deedNo}` : null,
          formData.phone ? `WhatsApp নম্বর: ${formData.phone}` : null,
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
          formData.district ? `জেলা: ${formData.district}` : null,
          formData.upazila ? `উপজেলা: ${formData.upazila}` : null,
          formData.mouza ? `মৌজা: ${formData.mouza}` : null,
          formData.jlNo ? `জে.এল নং: ${formData.jlNo}` : null,
          formData.halDaag ? `হাল দাগ: ${formData.halDaag}` : null,
          formData.sabekDaag ? `সাবেক দাগ: ${formData.sabekDaag}` : null,
        ].filter(Boolean);
        return lines.join('\n');
      }

      case 'payment': {
        const lines = [
          '*পেমেন্ট ভেরিফিকেশন অনুরোধ*',
          'সার্ভিস: পেমেন্ট ভেরিফিকেশন',
          `TrxID: ${formData.trxId || 'উল্লেখ নেই'}`,
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

  const resetForm = () => {
    setSubmitted(false);
    setCopied(false);
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

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4"
                >
                  অনুসন্ধান করুন
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

              <form onSubmit={(e) => handleSubmit(e, 'OB-003')} className="space-y-3.5 mt-4" autoComplete="off">
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
                    জেলা
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="জেলার নাম লিখুন"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    উপজেলা
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="উপজেলার নাম লিখুন"
                    value={formData.upazila}
                    onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    মৌজা
                  </label>
                  <input
                    type="text"
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      সাবেক দাগ
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="সাবেক দাগ নম্বর লিখুন"
                      value={formData.sabekDaag}
                      onChange={(e) => setFormData({ ...formData, sabekDaag: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      হাল দাগ
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="হাল দাগ নম্বর লিখুন"
                      value={formData.halDaag}
                      onChange={(e) => setFormData({ ...formData, halDaag: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#0A2540] outline-none"
                    />
                  </div>
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

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer mt-4"
                >
                  সিরিয়াল দিন
                </button>
              </form>

              {/* Display Box as shown in Screen 6 */}
              <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs text-gray-600 block">আপনার সিরিয়াল নম্বর:</span>
                <span className="text-2xl font-bold font-mono text-[#0A2540] tracking-wider block my-0.5">
                  OB-003
                </span>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  পরামর্শ ফি প্রদান করতে হবে
                </span>
              </div>
            </div>
          )}

          {/* SCREEN 7: স্ট্যাটাস ট্র্যাকিং পেজ */}
          {currentView === 'tracking' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <Search size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">স্ট্যাটাস ট্র্যাকিং</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  আপনার বুকিংয়ের বর্তমান অবস্থা জানতে এখানে সার্চ করুন।
                </p>
              </div>

              {/* Tabs */}
              <div className="flex bg-gray-100 p-1 rounded-xl mb-4 text-xs font-bold">
                <button className="flex-1 py-1.5 rounded-lg bg-[#0A2540] text-white">ফোন নম্বর</button>
                <button className="flex-1 py-1.5 rounded-lg text-gray-600">সিরিয়াল নম্বর</button>
              </div>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="01XXXXXXXXX"
                  defaultValue="01873434500"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono outline-none"
                />
                <button className="px-4 py-2.5 bg-[#0A2540] text-white font-bold text-xs rounded-xl flex items-center gap-1">
                  <Search size={14} />
                  <span>খুঁজুন</span>
                </button>
              </div>

              {/* Vertical Timeline from Screen 7 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-200">
                  {/* Step 1: Pending */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Pending</h4>
                      <p className="text-[11px] text-gray-500">০৭-০৫-২০২৫ | ১০:৩০ AM</p>
                    </div>
                  </div>

                  {/* Step 2: Confirmed */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Confirmed</h4>
                      <p className="text-[11px] text-gray-500">০৭-০৫-২০২৫ | ০২:১৬ PM</p>
                    </div>
                  </div>

                  {/* Step 3: In Progress */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      ●
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">In Progress</h4>
                      <p className="text-[11px] text-gray-500">০৮-০৫-২০২৫ | ১১:২০ AM</p>
                    </div>
                  </div>

                  {/* Step 4: Completed */}
                  <div className="flex items-start gap-3 relative z-10 opacity-50">
                    <div className="w-7 h-7 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0">
                      ○
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Completed</h4>
                      <p className="text-[11px] text-gray-500">চলমান...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 8: পেমেন্ট পেজ */}
          {currentView === 'payment' && (
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <DollarSign size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">পেমেন্ট তথ্য</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  বুকিং নিশ্চিত করতে নিচের নম্বরে পেমেন্ট করুন।
                </p>
              </div>

              {/* bKash & Nagad cards */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-center">
                  <span className="text-sm font-bold text-pink-700 block">bKash</span>
                  <span className="text-[11px] text-gray-500">বিকাশ নম্বর</span>
                  <span className="text-xs font-bold font-mono text-gray-900 block mt-1">01812-345678</span>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-center">
                  <span className="text-sm font-bold text-orange-700 block">নগদ</span>
                  <span className="text-[11px] text-gray-500">নগদ নম্বর</span>
                  <span className="text-xs font-bold font-mono text-gray-900 block mt-1">01812-345678</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center mb-4">
                <span className="text-xs text-blue-900">পেমেন্টের পরিমাণ: </span>
                <span className="text-base font-bold text-[#0A2540]">৳ ৫০০ (টাকা)</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    ট্রানজেকশন আইডি দিন (TrxID)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Transaction ID লিখুন (উদা: 9M24A67B)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono uppercase focus:border-[#0A2540] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0A2540] hover:bg-[#12365A] text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  পেমেন্ট সাবমিট করুন
                </button>
              </form>

              <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center text-xs text-gray-600 border border-gray-200">
                ⓘ পেমেন্ট স্ট্যাটাস: <span className="font-bold text-amber-700">Pending Verification</span>
              </div>
            </div>
          )}

          {/* SCREEN 9: আমার বুকিং (ইউজার ড্যাশবোর্ড) */}
          {currentView === 'my_bookings' && (
            <div>
              <div className="flex items-center justify-between my-3">
                <h2 className="text-lg font-bold text-gray-900">আমার বুকিং</h2>
                <span className="text-xs text-gray-500 font-mono">৪টি বুকিং</span>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 mb-4 text-xs font-bold">
                <button className="px-3 py-1 rounded-lg bg-[#0A2540] text-white">সকল</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">চলমান</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">সম্পন্ন</button>
              </div>

              {/* Bookings List from Screen 9 */}
              <div className="space-y-3">
                {/* Item 1 */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono text-[#0A2540]">OB-003</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Pending
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">ভূমি পরিমাপ</h4>
                  <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                    <p>তারিখ: ০৭-০৫-২০২৫</p>
                    <p>মৌজা: কোটাবালী</p>
                    <p>ফোন: ০১XXXXXXXXX</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono text-[#0A2540]">PR-002</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                      Confirmed
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">রিপোর্ট অনুসন্ধান</h4>
                  <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                    <p>তারিখ: ০৬-০৫-২০২৫</p>
                    <p>মৌজা: চর ইব্রাহিম</p>
                    <p>ফোন: ০১XXXXXXXXX</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono text-[#0A2540]">DS-001</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300">
                      In Progress
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">দলিল উত্তোলন</h4>
                  <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                    <p>তারিখ: ০৫-০৫-২০২৫</p>
                    <p>মৌজা: ফুলবাড়ী</p>
                    <p>ফোন: ০১XXXXXXXXX</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono text-[#0A2540]">KH-004</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Completed
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">খতিয়ান উত্তোলন</h4>
                  <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                    <p>তারিখ: ০৪-০৫-২০২৫</p>
                    <p>মৌজা: চর ইব্রাহিম | খতিয়ান নং: ৫৪</p>
                    <p>ফোন: ০১XXXXXXXXX</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 10: অ্যাডমিন প্যানেল */}
          {currentView === 'admin' && (
            <div>
              <div className="flex items-center justify-between my-3 p-3 bg-gradient-to-r from-gray-900 to-[#0A2540] text-white rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-[#0A2540] flex items-center justify-center font-bold text-xs">
                    AP
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">Admin Panel</h3>
                    <p className="text-[10px] text-gray-300">আহম্মদ টোটাল স্টেশন</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">● Live</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 my-3">
                <div className="bg-white border border-gray-200 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] text-gray-500">মোট বুকিং</span>
                  <span className="text-base font-bold text-[#0A2540] block">৪৮</span>
                </div>
                <div className="bg-white border border-gray-200 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] text-gray-500">পেন্ডিং</span>
                  <span className="text-base font-bold text-amber-600 block">০৭</span>
                </div>
                <div className="bg-white border border-gray-200 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] text-gray-500">সম্পন্ন</span>
                  <span className="text-base font-bold text-emerald-600 block">৪১</span>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 my-3">
                <h4 className="text-xs font-bold text-gray-900 mb-2">সাম্প্রতিক বুকিং</h4>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <div>
                      <span className="font-bold text-[#0A2540]">OB-003</span>
                      <span className="text-gray-600 ml-1">রফিক উদ্দিন</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Pending</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <div>
                      <span className="font-bold text-[#0A2540]">PR-002</span>
                      <span className="text-gray-600 ml-1">মোঃ করিম</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">Confirmed</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <div>
                      <span className="font-bold text-[#0A2540]">DS-001</span>
                      <span className="text-gray-600 ml-1">নাসির উদ্দিন</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800">In Progress</span>
                  </div>
                </div>
              </div>

              {/* Upload Report PDF Box */}
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50">
                <FileUp size={24} className="mx-auto text-gray-400 mb-1" />
                <p className="text-xs font-bold text-gray-700">রিপোর্ট আপলোড</p>
                <button className="mt-2 px-3 py-1 bg-[#0A2540] text-white text-[11px] font-bold rounded-lg">
                  PDF আপলোড করুন
                </button>
              </div>
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

                {/* Company */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 font-medium block">Company</span>
                      <span className="text-sm font-bold text-gray-900">GZ Holdings LTD</span>
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
                    href="https://wa.me/8801630965636?text=Finora%20Feedback%3A%20"
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
                    href="https://wa.me/8801630965636?text=Finora%20Bug%20Report%3A%20"
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
                    <span>ডেভেলপার: Shayed Afride • GZ Holdings LTD</span>
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
            <div>
              <div className="flex flex-col items-center text-center my-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#0A2540] mb-2">
                  <Shield size={24} className="text-[#0A2540]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">গোপনীয়তা নীতি (Privacy Policy)</h2>
                <p className="text-xs text-gray-600 max-w-xs mt-0.5">
                  ব্যবহারকারীর তথ্যের নিরাপত্তা ও সুরক্ষার অঙ্গীকার
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-gray-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">১. তথ্যের গোপনীয়তা</h4>
                  <p>আহম্মদ টোটাল স্টেশন ও Finora অ্যাপ ব্যবহারে আপনার প্রদানকৃত সকল সার্ভে ও বুকিং সংক্রান্ত তথ্য সর্বোচ্চ সতর্কতার সাথে সংরক্ষণ করা হয়।</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">২. ডেটা ব্যবহার</h4>
                  <p>আপনার মোবাইল নম্বর ও জমি সংক্রান্ত বিবরণ শুধুমাত্র সংশ্লিষ্ট সার্ভে সেবা প্রদানের কাজেই ব্যবহৃত হয়। কোনো তৃতীয় পক্ষের নিকট আপনার ডেটা শেয়ার করা হয় না।</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">৩. যোগাযোগ ও সহায়তা</h4>
                  <p>যেকোনো প্রশ্ন বা তথ্যের জন্য সরাসরি আমাদের হেল্পলাইনে অথবা ডেভেলপমেন্ট পার্টনার GZ Holdings LTD-এর সাথে যোগাযোগ করতে পারেন।</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
