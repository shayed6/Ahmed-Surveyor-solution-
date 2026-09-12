import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Info,
  Scale,
  Check,
  Copy,
  Users,
  Coins,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileSpreadsheet,
  FileDown,
  Printer,
  Eye,
  X,
  Loader2,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import {
  Religion,
  MuslimHeirsInput,
  HinduHeirsInput,
  PropertyAssets,
  CalculationOutcome,
} from './types';
import {
  calculateMuslimInheritance,
  toBengaliNumerals,
  formatDecimalBn,
} from './muslimCalculation';
import { calculateHinduInheritance } from './hinduCalculation';
import { exportElementToPdf } from './pdfExport';
import { InheritancePdfReport } from './InheritancePdfReport';

interface InheritanceCalculatorViewProps {
  onBack: () => void;
  initialReligion?: Religion;
}

export const InheritanceCalculatorView: React.FC<InheritanceCalculatorViewProps> = ({
  onBack,
  initialReligion = 'muslim',
}) => {
  const [religion, setReligion] = useState<Religion>(initialReligion);

  // Common assets
  const [assets, setAssets] = useState<PropertyAssets>({
    landAmount: 20, // default 20 decimal
    landUnit: 'decimal',
    goldVori: 0,
    silverVori: 0,
    cashBDT: 0,
  });

  // Muslim Heirs State
  const [muslimInput, setMuslimInput] = useState<MuslimHeirsInput>({
    deceasedGender: 'male',
    wivesCount: 1,
    hasHusband: false,
    hasFather: true,
    hasMother: true,
    hasPaternalGrandfather: false,
    hasPaternalGrandmother: false,
    hasMaternalGrandmother: false,
    sonsCount: 2,
    daughtersCount: 1,
    orphanedGrandsonsCount: 0,
    orphanedGranddaughtersCount: 0,
    fullBrothersCount: 0,
    fullSistersCount: 0,
    paternalUnclesCount: 0,
  });

  // Hindu Heirs State
  const [hinduInput, setHinduInput] = useState<HinduHeirsInput>({
    deceasedGender: 'male',
    hasWidow: true,
    sonsCount: 2,
    grandsonsCount: 0,
    greatGrandsonsCount: 0,
    unmarriedDaughtersCount: 0,
    marriedDaughtersCount: 1,
    hasFather: false,
    hasMother: false,
    brothersCount: 0,
    brotherSonsCount: 0,
    sistersCount: 0,
  });

  // Result state
  const [result, setResult] = useState<CalculationOutcome | null>(null);
  const [showSteps, setShowSteps] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfExportSuccess, setPdfExportSuccess] = useState(false);
  const [showPdfPreviewModal, setShowPdfPreviewModal] = useState(false);
  const pdfReportRef = useRef<HTMLDivElement | null>(null);

  // Download PDF Handler
  const handleDownloadPdf = async () => {
    if (!pdfReportRef.current || !result) return;
    setIsExportingPdf(true);
    try {
      const safeSuffix = religion === 'muslim' ? 'Farayez' : 'Dayabhaga';
      const fileName = `Ahmed_Survey_Inheritance_${safeSuffix}.pdf`;
      const success = await exportElementToPdf(pdfReportRef.current, fileName);
      if (success) {
        setPdfExportSuccess(true);
        setTimeout(() => setPdfExportSuccess(false), 3500);
      }
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Execute Calculation
  const handleCalculate = () => {
    if (religion === 'muslim') {
      const outcome = calculateMuslimInheritance(muslimInput, assets);
      setResult(outcome);
    } else {
      const outcome = calculateHinduInheritance(hinduInput, assets);
      setResult(outcome);
    }

    // Smooth scroll down to result
    setTimeout(() => {
      const el = document.getElementById('inheritance-result-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Reset to default
  const handleReset = () => {
    setResult(null);
    setAssets({
      landAmount: 0,
      landUnit: 'decimal',
      goldVori: 0,
      silverVori: 0,
      cashBDT: 0,
    });
    setMuslimInput({
      deceasedGender: 'male',
      wivesCount: 1,
      hasHusband: false,
      hasFather: false,
      hasMother: false,
      hasPaternalGrandfather: false,
      hasPaternalGrandmother: false,
      hasMaternalGrandmother: false,
      sonsCount: 0,
      daughtersCount: 0,
      orphanedGrandsonsCount: 0,
      orphanedGranddaughtersCount: 0,
      fullBrothersCount: 0,
      fullSistersCount: 0,
      paternalUnclesCount: 0,
    });
    setHinduInput({
      deceasedGender: 'male',
      hasWidow: false,
      sonsCount: 0,
      grandsonsCount: 0,
      greatGrandsonsCount: 0,
      unmarriedDaughtersCount: 0,
      marriedDaughtersCount: 0,
      hasFather: false,
      hasMother: false,
      brothersCount: 0,
      brotherSonsCount: 0,
      sistersCount: 0,
    });
  };

  // Copy result text summary
  const copyResultText = () => {
    if (!result) return;
    const lines = [
      `*আহম্মদ টোটাল স্টেশন - উত্তরাধিকার সম্পত্তি বণ্টন হিসাব*`,
      `আইন: ${religion === 'muslim' ? 'মুসলিম হানাফি ফারায়েজ' : 'হিন্দু দায়ভাগ ও ১৯৩৭ আইন'}`,
      `সম্পদ: জমি ${toBengaliNumerals(assets.landAmount)} ${assets.landUnit === 'acre' ? 'একর' : 'শতাংশ'}, স্বর্ণ ${toBengaliNumerals(assets.goldVori)} ভরি, নগদ ৳${toBengaliNumerals(assets.cashBDT)}`,
      '--------------------------',
      ...result.heirResults.map(
        (h) =>
          `${h.relation}: ${toBengaliNumerals(h.sharePercent.toFixed(2))}% অংশ | জমি: ${formatDecimalBn(h.totalLand)} শতাংশ`
      ),
      '--------------------------',
      result.disclaimer,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Counter helper
  const renderCounter = (
    label: string,
    value: number,
    onChange: (val: number) => void,
    min: number = 0,
    max: number = 20,
    badge?: string
  ) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <div>
        <span className="text-xs font-bold text-gray-800">{label}</span>
        {badge && <span className="ml-1.5 text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">{badge}</span>}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-bold flex items-center justify-center text-sm cursor-pointer transition-colors"
        >
          -
        </button>
        <span className="w-8 text-center text-xs font-mono font-bold text-gray-900">
          {toBengaliNumerals(value)}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-bold flex items-center justify-center text-sm cursor-pointer transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );

  // Checkbox/Toggle helper
  const renderToggle = (
    label: string,
    checked: boolean,
    onChange: (val: boolean) => void,
    note?: string
  ) => (
    <label className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 cursor-pointer select-none">
      <div>
        <span className="text-xs font-bold text-gray-800">{label}</span>
        {note && <p className="text-[10px] text-gray-500">{note}</p>}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-[#0A2540] rounded border-gray-300 focus:ring-[#0A2540] cursor-pointer"
      />
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Sticky Header */}
      <div className="bg-[#0A2540] text-white px-4 py-3 sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>হোমে ফিরুন</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-300/30">
              ফ্রি ক্যালকুলেটর
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Title Header Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0A2540] mx-auto mb-2.5">
            <Scale size={24} className="text-[#AA771C]" />
          </div>
          <h1 className="text-base font-bold text-gray-900">
            উত্তরাধিকার সম্পত্তি বণ্টন ক্যালকুলেটর
          </h1>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            ইসলামিক ফারায়েজ ও হিন্দু দায়ভাগ আইনানুযায়ী জমি, স্বর্ণ ও অর্থের নির্ভুল উত্তরাধিকার অংশ নির্ণয় করুন
          </p>

          {/* Religion Switcher (দুটো অপশন: মুসলিম ও হিন্দু) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mt-4 border border-gray-200">
            <button
              type="button"
              id="calc-tab-muslim"
              onClick={() => {
                setReligion('muslim');
                setResult(null);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                religion === 'muslim'
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <span>☪️ মুসলিম (ফারায়েজ)</span>
            </button>
            <button
              type="button"
              id="calc-tab-hindu"
              onClick={() => {
                setReligion('hindu');
                setResult(null);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                religion === 'hindu'
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <span>🕉️ হিন্দু (দায়ভাগ)</span>
            </button>
          </div>
        </div>

        {/* STEP 1: উত্তরাধিকারী নির্বাচন */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-gray-100">
            <span className="w-5 h-5 rounded-full bg-[#0A2540] text-white text-[11px] font-bold flex items-center justify-center">
              ১
            </span>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              ধাপ ১: উত্তরাধিকারী নির্বাচন
            </h2>
          </div>

          {/* Gender of Deceased */}
          <div className="mb-3.5 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-800 mb-2">
              মৃত ব্যক্তির লিঙ্গ:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  if (religion === 'muslim') {
                    setMuslimInput({ ...muslimInput, deceasedGender: 'male' });
                  } else {
                    setHinduInput({ ...hinduInput, deceasedGender: 'male' });
                  }
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  (religion === 'muslim' ? muslimInput.deceasedGender : hinduInput.deceasedGender) === 'male'
                    ? 'bg-amber-50 border-[#AA771C] text-[#0A2540]'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                পুরুষ (স্ত্রী রেখে গেছেন)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (religion === 'muslim') {
                    setMuslimInput({ ...muslimInput, deceasedGender: 'female' });
                  } else {
                    setHinduInput({ ...hinduInput, deceasedGender: 'female' });
                  }
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  (religion === 'muslim' ? muslimInput.deceasedGender : hinduInput.deceasedGender) === 'female'
                    ? 'bg-amber-50 border-[#AA771C] text-[#0A2540]'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                নারী (স্বামী রেখে গেছেন)
              </button>
            </div>
          </div>

          {/* Muslim Heirs List */}
          {religion === 'muslim' && (
            <div className="space-y-1">
              {/* Spouse */}
              {muslimInput.deceasedGender === 'male' ? (
                renderCounter(
                  'স্ত্রী (সংখ্যা)',
                  muslimInput.wivesCount,
                  (v) => setMuslimInput({ ...muslimInput, wivesCount: v }),
                  0,
                  4,
                  'যাবিল ফুরুজ'
                )
              ) : (
                renderToggle(
                  'স্বামী জীবিত আছেন?',
                  muslimInput.hasHusband,
                  (v) => setMuslimInput({ ...muslimInput, hasHusband: v }),
                  'যাবিল ফুরুজ (১/২ বা ১/৪ অংশ)'
                )
              )}

              {/* Children */}
              {renderCounter(
                'পুত্র (সংখ্যা)',
                muslimInput.sonsCount,
                (v) => setMuslimInput({ ...muslimInput, sonsCount: v }),
                0,
                20,
                'আসাবা'
              )}

              {renderCounter(
                'কন্যা (সংখ্যা)',
                muslimInput.daughtersCount,
                (v) => setMuslimInput({ ...muslimInput, daughtersCount: v }),
                0,
                20,
                muslimInput.sonsCount > 0 ? 'আসাবা বিল গাইর' : 'যাবিল ফুরুজ'
              )}

              {/* Parents */}
              {renderToggle(
                'পিতা জীবিত আছেন?',
                muslimInput.hasFather,
                (v) => setMuslimInput({ ...muslimInput, hasFather: v }),
                'পুত্র থাকলে ১/৬, কন্যা থাকলে ১/৬ + অবশিষ্ট'
              )}

              {renderToggle(
                'মাতা জীবিত আছেন?',
                muslimInput.hasMother,
                (v) => setMuslimInput({ ...muslimInput, hasMother: v }),
                'সন্তান/একাধিক ভাই-বোন থাকলে ১/৬, অন্যথায় ১/৩'
              )}

              {/* Grandparents & Siblings Collapsible Option */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-gray-500 mb-1">
                  অন্যান্য আত্মীয় (প্রয়োজনে সিলেক্ট করুন):
                </p>
                <div className="space-y-1 bg-gray-50/70 p-2.5 rounded-xl border border-gray-200">
                  {renderToggle('দাদা জীবিত আছেন?', muslimInput.hasPaternalGrandfather, (v) =>
                    setMuslimInput({ ...muslimInput, hasPaternalGrandfather: v })
                  )}
                  {renderToggle('দাদী জীবিত আছেন?', muslimInput.hasPaternalGrandmother, (v) =>
                    setMuslimInput({ ...muslimInput, hasPaternalGrandmother: v })
                  )}
                  {renderToggle('নানী জীবিত আছেন?', muslimInput.hasMaternalGrandmother, (v) =>
                    setMuslimInput({ ...muslimInput, hasMaternalGrandmother: v })
                  )}
                  {renderCounter('সহোদর ভাই (সংখ্যা)', muslimInput.fullBrothersCount, (v) =>
                    setMuslimInput({ ...muslimInput, fullBrothersCount: v })
                  )}
                  {renderCounter('সহোদর বোন (সংখ্যা)', muslimInput.fullSistersCount, (v) =>
                    setMuslimInput({ ...muslimInput, fullSistersCount: v })
                  )}
                  {renderCounter('চাচা (সংখ্যা)', muslimInput.paternalUnclesCount, (v) =>
                    setMuslimInput({ ...muslimInput, paternalUnclesCount: v })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Hindu Heirs List (Dayabhaga Law) */}
          {religion === 'hindu' && (
            <div className="space-y-1">
              <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-950 mb-2">
                <span className="font-bold">দায়ভাগ নীতি:</span> অগ্রাধিকার ক্রমে উপরের সারির ১ জন ওয়ারিশ থাকলেও নিচের সকল ওয়ারিশ সম্পূর্ণ বঞ্চিত হবেন।
              </div>

              {/* Tier 1 */}
              {hinduInput.deceasedGender === 'male' &&
                renderToggle(
                  'বিধবা স্ত্রী জীবিত আছেন?',
                  hinduInput.hasWidow,
                  (v) => setHinduInput({ ...hinduInput, hasWidow: v }),
                  '১৯৩৭ আইন অনুযায়ী পুত্রের সমান অংশ পাবেন'
                )}

              {renderCounter(
                'পুত্র (সংখ্যা)',
                hinduInput.sonsCount,
                (v) => setHinduInput({ ...hinduInput, sonsCount: v }),
                0,
                20,
                'অগ্রাধিকার ক্রম ১'
              )}

              {renderCounter(
                'পৌত্র (মৃত পুত্রের পুত্র)',
                hinduInput.grandsonsCount,
                (v) => setHinduInput({ ...hinduInput, grandsonsCount: v }),
                0,
                20,
                'অগ্রাধিকার ক্রম ১'
              )}

              {/* Daughters */}
              {renderCounter(
                'অবিবাহিতা কন্যা (সংখ্যা)',
                hinduInput.unmarriedDaughtersCount,
                (v) => setHinduInput({ ...hinduInput, unmarriedDaughtersCount: v }),
                0,
                20,
                'অগ্রাধিকার ক্রম ২'
              )}

              {renderCounter(
                'বিবাহিতা কন্যা (সংখ্যা)',
                hinduInput.marriedDaughtersCount,
                (v) => setHinduInput({ ...hinduInput, marriedDaughtersCount: v }),
                0,
                20,
                'অগ্রাধিকার ক্রম ৩'
              )}

              {/* Parents & Siblings */}
              {renderToggle(
                'পিতা জীবিত আছেন?',
                hinduInput.hasFather,
                (v) => setHinduInput({ ...hinduInput, hasFather: v }),
                'অগ্রাধিকার ক্রম ৪'
              )}

              {renderToggle(
                'মাতা জীবিত আছেন?',
                hinduInput.hasMother,
                (v) => setHinduInput({ ...hinduInput, hasMother: v }),
                'অগ্রাধিকার ক্রম ৫'
              )}

              {renderCounter(
                'সহোদর ভাই (সংখ্যা)',
                hinduInput.brothersCount,
                (v) => setHinduInput({ ...hinduInput, brothersCount: v }),
                0,
                20,
                'অগ্রাধিকার ক্রম ৬'
              )}

              {renderCounter(
                'ভাইয়ের পুত্র (ভাতিজা)',
                hinduInput.brotherSonsCount,
                (v) => setHinduInput({ ...hinduInput, brotherSonsCount: v }),
                0,
                20,
                'অগ্রাধিকার ক্রম ৭'
              )}

              {renderCounter(
                'বোন (সংখ্যা)',
                hinduInput.sistersCount,
                (v) => setHinduInput({ ...hinduInput, sistersCount: v }),
                0,
                20,
                'অগ্রাধিকার ক্রম ৮'
              )}
            </div>
          )}
        </div>

        {/* STEP 2: সম্পদের বিবরণ */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 mb-3 border-b border-gray-100">
            <span className="w-5 h-5 rounded-full bg-[#0A2540] text-white text-[11px] font-bold flex items-center justify-center">
              ২
            </span>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              ধাপ ২: সম্পদের বিবরণ
            </h2>
          </div>

          <div className="space-y-3">
            {/* Land Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-800">
                  মোট জমি <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAssets({ ...assets, landUnit: 'decimal' })}
                    className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                      assets.landUnit === 'decimal'
                        ? 'bg-white text-[#0A2540] shadow-2xs'
                        : 'text-gray-600'
                    }`}
                  >
                    শতাংশ (শতক)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssets({ ...assets, landUnit: 'acre' })}
                    className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                      assets.landUnit === 'acre'
                        ? 'bg-white text-[#0A2540] shadow-2xs'
                        : 'text-gray-600'
                    }`}
                  >
                    একর
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={assets.landAmount || ''}
                  onChange={(e) =>
                    setAssets({ ...assets, landAmount: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="যেমন: ৫০"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono font-semibold focus:border-[#0A2540] outline-none pr-16"
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-500 font-semibold pointer-events-none">
                  {assets.landUnit === 'acre' ? 'একর' : 'শতাংশ'}
                </span>
              </div>
            </div>

            {/* Gold & Silver */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  স্বর্ণ (ভরি)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={assets.goldVori || ''}
                  onChange={(e) =>
                    setAssets({ ...assets, goldVori: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="০"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-mono focus:border-[#0A2540] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  রৌপ্য (ভরি)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={assets.silverVori || ''}
                  onChange={(e) =>
                    setAssets({ ...assets, silverVori: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="০"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-mono focus:border-[#0A2540] outline-none"
                />
              </div>
            </div>

            {/* Cash */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                নগদ টাকা (টাকা / BDT)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={assets.cashBDT || ''}
                  onChange={(e) =>
                    setAssets({ ...assets, cashBDT: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="যেমন: ৫,০০,০০০"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:border-[#0A2540] outline-none pr-12"
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-500 font-semibold pointer-events-none">
                  ৳ টাকা
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: ACTION BUTTONS */}
        <div className="flex gap-2.5">
          <button
            type="button"
            id="btn-calculate-inheritance"
            onClick={handleCalculate}
            className="flex-1 py-3 bg-[#0A2540] hover:bg-[#12365A] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} className="text-amber-300" />
            <span>ফলাফল দেখুন</span>
          </button>
          <button
            type="button"
            id="btn-reset-inheritance"
            onClick={handleReset}
            className="px-4 py-3 bg-white hover:bg-gray-50 active:scale-[0.99] text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="সব রিসেট করুন"
          >
            <RotateCcw size={15} />
            <span>রিসেট</span>
          </button>
        </div>

        {/* ANCHOR FOR AUTO-SCROLL */}
        <div id="inheritance-result-anchor" />

        {/* RESULTS SECTION */}
        {result && (
          <div className="bg-white border-2 border-[#0A2540]/30 rounded-2xl p-4 shadow-sm space-y-4 animate-in fade-in duration-300">
            {/* Header & Actions */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                  ✓ হিসাব সম্পন্ন
                </span>
                <h3 className="text-sm font-bold text-gray-900">
                  উত্তরাধিকার সম্পত্তি বণ্টনের ফলাফল
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id="btn-download-pdf-header"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs disabled:opacity-70"
                  title="পিডিএফ ডাউনলোড করুন"
                >
                  {isExportingPdf ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : pdfExportSuccess ? (
                    <CheckCircle2 size={13} className="text-emerald-200" />
                  ) : (
                    <FileDown size={13} />
                  )}
                  <span>
                    {isExportingPdf ? 'তৈরি...' : pdfExportSuccess ? 'হয়েছে!' : 'পিডিএফ'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={copyResultText}
                  className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  title="ফলাফল কপি করুন"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700">কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>কপি</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Total Assets Summary Chips */}
            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-xs">
              <div>
                <span className="text-gray-500 block text-[11px]">বণ্টনযোগ্য মোট জমি:</span>
                <span className="font-mono font-bold text-gray-900">
                  {toBengaliNumerals(assets.landAmount)}{' '}
                  {assets.landUnit === 'acre' ? 'একর' : 'শতাংশ'}
                </span>
              </div>
              {assets.cashBDT > 0 && (
                <div>
                  <span className="text-gray-500 block text-[11px]">মোট নগদ টাকা:</span>
                  <span className="font-mono font-bold text-gray-900">
                    ৳ {toBengaliNumerals(assets.cashBDT.toLocaleString('en-IN'))}
                  </span>
                </div>
              )}
              {assets.goldVori > 0 && (
                <div>
                  <span className="text-gray-500 block text-[11px]">স্বর্ণ:</span>
                  <span className="font-mono font-bold text-gray-900">
                    {toBengaliNumerals(assets.goldVori)} ভরি
                  </span>
                </div>
              )}
              {assets.silverVori > 0 && (
                <div>
                  <span className="text-gray-500 block text-[11px]">রৌপ্য:</span>
                  <span className="font-mono font-bold text-gray-900">
                    {toBengaliNumerals(assets.silverVori)} ভরি
                  </span>
                </div>
              )}
            </div>

            {/* Prominent PDF Export Callout Card */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/50 border border-emerald-300 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileText size={19} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs font-bold text-emerald-950">
                      অফিসিয়াল ফরায়েজ বিবরণী PDF
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.2 bg-emerald-200 text-emerald-900 rounded-sm font-semibold">
                      A4 প্রিন্টযোগ্য
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                    ওয়ারিশ বণ্টন ছক, অংশ/শতকরা হার, ফিকহি কারণ ও অফিসিয়াল সীল-স্বাক্ষর যুক্ত পূর্ণাঙ্গ PDF সংগ্রহ করুন।
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  id="btn-download-pdf-primary"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] disabled:opacity-75 text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  {isExportingPdf ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>পিডিএফ তৈরি হচ্ছে...</span>
                    </>
                  ) : pdfExportSuccess ? (
                    <>
                      <CheckCircle2 size={15} className="text-emerald-200" />
                      <span>✓ ডাউনলোড সম্পন্ন হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <FileDown size={15} />
                      <span>পিডিএফ ডাউনলোড করুন</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  id="btn-preview-pdf"
                  onClick={() => setShowPdfPreviewModal(true)}
                  className="py-2.5 px-3 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  title="প্রিভিউ দেখুন"
                >
                  <Eye size={14} />
                  <span>প্রিভিউ</span>
                </button>
              </div>
            </div>

            {/* Heirs Share Cards */}
            {result.heirResults.length === 0 ? (
              <div className="p-4 bg-amber-50 rounded-xl text-center text-xs text-amber-900 border border-amber-200">
                কোনো জীবিত ওয়ারিশ পাওয়া যায়নি। অনুগ্রহ করে উপযুক্ত ওয়ারিশ নির্বাচন করুন।
              </div>
            ) : (
              <div className="space-y-3">
                {result.heirResults.map((heir, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-[#AA771C] transition-all shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm font-bold text-[#0A2540]">
                            {heir.relation}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                            {heir.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          অংশ: <strong className="text-gray-900">{heir.shareFraction}</strong>{' '}
                          ({toBengaliNumerals(heir.sharePercent.toFixed(2))}%)
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {toBengaliNumerals(heir.sharePercent.toFixed(2))}%
                        </span>
                      </div>
                    </div>

                    {/* Breakdown per person / group */}
                    <div className="bg-gray-50/80 p-2 rounded-lg border border-gray-100 text-xs space-y-1 font-mono">
                      {assets.landAmount > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-sans text-[11px]">জমি:</span>
                          <span className="font-bold text-gray-900">
                            {heir.count > 1 ? (
                              <>
                                সর্বমোট {formatDecimalBn(heir.totalLand)} শতক{' '}
                                <span className="text-gray-500 text-[10px] font-sans font-normal">
                                  (জনপ্রতি {formatDecimalBn(heir.perPersonLand)} শতক)
                                </span>
                              </>
                            ) : (
                              `${formatDecimalBn(heir.totalLand)} শতক`
                            )}
                          </span>
                        </div>
                      )}

                      {assets.cashBDT > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-sans text-[11px]">নগদ অর্থ:</span>
                          <span className="font-bold text-gray-900">
                            {heir.count > 1 ? (
                              <>
                                ৳ {toBengaliNumerals(Math.round(heir.totalCash).toLocaleString('en-IN'))}{' '}
                                <span className="text-gray-500 text-[10px] font-sans font-normal">
                                  (জনপ্রতি ৳ {toBengaliNumerals(Math.round(heir.perPersonCash).toLocaleString('en-IN'))})
                                </span>
                              </>
                            ) : (
                              `৳ ${toBengaliNumerals(Math.round(heir.totalCash).toLocaleString('en-IN'))}`
                            )}
                          </span>
                        </div>
                      )}

                      {assets.goldVori > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-sans text-[11px]">স্বর্ণ:</span>
                          <span className="font-bold text-gray-900">
                            {formatDecimalBn(heir.totalGold)} ভরি{' '}
                            {heir.count > 1 && (
                              <span className="text-gray-500 text-[10px] font-sans font-normal">
                                (জনপ্রতি {formatDecimalBn(heir.perPersonGold)} ভরি)
                              </span>
                            )}
                          </span>
                        </div>
                      )}

                      {assets.silverVori > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-sans text-[11px]">রৌপ্য:</span>
                          <span className="font-bold text-gray-900">
                            {formatDecimalBn(heir.totalSilver)} ভরি
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Legal Explanation */}
                    {heir.explanation && (
                      <p className="text-[10px] text-gray-600 italic mt-1.5 leading-relaxed">
                        আইনি দলিল: {heir.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Excluded Heirs List (মাহজুব / বঞ্চিত তালিকা) */}
            {result.excludedHeirs.length > 0 && (
              <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 font-bold text-red-900 mb-1">
                  <AlertTriangle size={14} className="text-red-600 shrink-0" />
                  <span>আইনানুযায়ী বঞ্চিত ওয়ারিশ (হিজব/মাহজুব):</span>
                </div>
                <ul className="list-disc list-inside text-[11px] text-red-800 space-y-0.5">
                  {result.excludedHeirs.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step-by-Step Mathematical Explanation Toggle */}
            {result.steps.length > 0 && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowSteps(!showSteps)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-xs font-bold text-gray-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Info size={14} className="text-[#0A2540]" />
                    <span>হিসাবের ধাপ ও ফিকহি/আইনি ব্যাখ্যা ({toBengaliNumerals(result.steps.length)}টি ধাপ)</span>
                  </span>
                  {showSteps ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
                {showSteps && (
                  <div className="p-3 text-[11px] text-gray-700 bg-white space-y-1.5 leading-relaxed border-t border-gray-100">
                    {result.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#AA771C] font-bold font-mono">
                          {toBengaliNumerals(idx + 1)}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Mandatory Legal Warning & Disclaimer */}
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-2 shadow-2xs">
              <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-semibold">
                {result.disclaimer}
              </p>
            </div>

            {/* Bottom Quick PDF Download Bar */}
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] text-gray-600 font-medium">
                ফরায়েজ বিবরণীর অফিসিয়াল কপি সংরক্ষণ করতে:
              </span>
              <button
                type="button"
                id="btn-download-pdf-footer"
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-xs disabled:opacity-75 ml-auto"
              >
                {isExportingPdf ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <FileDown size={14} />
                )}
                <span>{isExportingPdf ? 'পিডিএফ তৈরি হচ্ছে...' : 'পিডিএফ ডাউনলোড করুন'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Target for PDF Generation (captured by html2canvas-pro) */}
        {result && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '800px',
              zIndex: -9999,
              opacity: 0.01,
              pointerEvents: 'none',
            }}
          >
            <InheritancePdfReport
              result={result}
              assets={assets}
              religion={religion}
              muslimInput={muslimInput}
              hinduInput={hinduInput}
              reportRef={pdfReportRef}
            />
          </div>
        )}

        {/* PDF Preview Modal */}
        {showPdfPreviewModal && result && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-2 sm:p-4">
            <div className="bg-white w-full max-w-3xl max-h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0A2540] text-white">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-amber-300" />
                  <h3 className="text-sm font-bold">
                    ফরায়েজ বণ্টন প্রতিবেদন (PDF প্রিভিউ)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isExportingPdf}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                  >
                    {isExportingPdf ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>তৈরি হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <FileDown size={13} />
                        <span>ডাউনলোড PDF</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    title="প্রিন্ট করুন"
                  >
                    <Printer size={13} />
                    <span className="hidden sm:inline">প্রিন্ট</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPdfPreviewModal(false)}
                    className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title="বন্ধ করুন"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="flex-1 overflow-y-auto overflow-x-auto p-4 bg-gray-100 flex justify-center">
                <div className="bg-white shadow-md my-1 max-w-full">
                  <InheritancePdfReport
                    result={result}
                    assets={assets}
                    religion={religion}
                    muslimInput={muslimInput}
                    hinduInput={hinduInput}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
                <span>আহম্মদ টোটাল স্টেশন - সার্ভে এন্ড সলুশন সেন্টার</span>
                <button
                  type="button"
                  onClick={() => setShowPdfPreviewModal(false)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-gray-800 transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
