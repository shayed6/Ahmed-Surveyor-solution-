import React, { useState, useRef } from 'react';
import {
  Religion,
  DeceasedGender,
  MuslimHeirsInput,
  HinduHeirsInput,
  PropertyAssets,
  LandUnit,
  CalculationOutcome,
} from './types';
import { calculateMuslimInheritance, toBengaliNumerals, formatDecimalBn, convertLandToDecimal } from './muslimCalculation';
import { calculateHinduInheritance } from './hinduCalculation';
import { InheritancePdfReport } from './InheritancePdfReport';
import { InheritancePieChart } from './InheritancePieChart';
import { exportElementToPdf } from './pdfExport';
import {
  Calculator,
  RotateCcw,
  Download,
  Printer,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Users,
  Coins,
  MapPin,
  Sparkles,
  Award,
  BookOpen,
  XCircle,
  X,
  FileText,
} from 'lucide-react';

export const InheritanceCalculatorView: React.FC = () => {
  // 1. Religion selection
  const [religion, setReligion] = useState<Religion>('muslim');

  // 2. Muslim Heirs Input State
  const [muslimInput, setMuslimInput] = useState<MuslimHeirsInput>({
    deceasedGender: 'male',
    wivesCount: 1,
    hasHusband: false,
    hasFather: false,
    hasMother: false,
    hasPaternalGrandfather: false,
    hasPaternalGrandmother: false,
    hasMaternalGrandmother: false,
    sonsCount: 1,
    daughtersCount: 1,
    orphanedGrandsonsCount: 0,
    orphanedGranddaughtersCount: 0,
    orphanedMaternalGrandsonsCount: 0,
    orphanedMaternalGranddaughtersCount: 0,
    fullBrothersCount: 0,
    fullSistersCount: 0,
    consanguineBrothersCount: 0,
    consanguineSistersCount: 0,
    uterineBrothersCount: 0,
    uterineSistersCount: 0,
    fullNephewsCount: 0,
    consanguineNephewsCount: 0,
    fullNephewSonsCount: 0,
    consanguineNephewSonsCount: 0,
    paternalUnclesCount: 0,
    consanguinePaternalUnclesCount: 0,
    fullUncleSonsCount: 0,
    consanguineUncleSonsCount: 0,
    fullUncleGrandSonsCount: 0,
    consanguineUncleGrandSonsCount: 0,
    fullUncleGreatGrandSonsCount: 0,
    consanguineUncleGreatGrandSonsCount: 0,
  });

  // 3. Hindu Heirs Input State
  const [hinduInput, setHinduInput] = useState<HinduHeirsInput>({
    deceasedGender: 'male',
    hasWidow: true,
    hasHusband: false,
    sonsCount: 1,
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

  // 4. Detailed Gold & Silver (Vori, Ana, Roti, Point) matching uttoradhikar.gov.bd
  const [goldParts, setGoldParts] = useState({ vori: 0, ana: 0, roti: 0, point: 0 });
  const [silverParts, setSilverParts] = useState({ vori: 0, ana: 0, roti: 0, point: 0 });

  // 5. Property Assets State
  const [assets, setAssets] = useState<PropertyAssets>({
    landAmount: 100, // default 100 decimal
    landUnit: 'decimal',
    goldVori: 0,
    silverVori: 0,
    cashBDT: 500000, // default 5 Lakh BDT
  });

  // 6. Outcome state
  const [result, setResult] = useState<CalculationOutcome | null>(null);

  // 7. UI / Export States
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfExportSuccess, setPdfExportSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showPdfPreviewModal, setShowPdfPreviewModal] = useState(false);

  // Accordion sections toggle for collapsible heir categories
  const [openSection, setOpenSection] = useState<{ [key: string]: boolean }>({
    primary: true,
    parents: true,
    grandchildren: false,
    siblings: false,
    extended: false,
  });

  const toggleSection = (sec: string) => {
    setOpenSection((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Ref for PDF printing target
  const pdfReportRef = useRef<HTMLDivElement | null>(null);

  // Helper to convert (vori, ana, roti, point) to decimal vori
  // ১ ভরি = ১৬ আনা, ১ আনা = ৬ রতি, ১ রতি = ১০ পয়েন্ট
  const calculateTotalVori = (v: number, a: number, r: number, p: number) => {
    const total = v + a / 16 + r / 96 + p / 960;
    return parseFloat(total.toFixed(4));
  };

  const updateGoldPart = (field: 'vori' | 'ana' | 'roti' | 'point', val: number) => {
    const next = { ...goldParts, [field]: Math.max(0, val) };
    setGoldParts(next);
    const total = calculateTotalVori(next.vori, next.ana, next.roti, next.point);
    setAssets((prev) => ({ ...prev, goldVori: total }));
  };

  const updateSilverPart = (field: 'vori' | 'ana' | 'roti' | 'point', val: number) => {
    const next = { ...silverParts, [field]: Math.max(0, val) };
    setSilverParts(next);
    const total = calculateTotalVori(next.vori, next.ana, next.roti, next.point);
    setAssets((prev) => ({ ...prev, silverVori: total }));
  };

  // Format decimal vori back to Vori-Ana-Roti-Point for table display
  const formatVoriDetailed = (totalVori: number): string => {
    if (!totalVori || totalVori <= 0) return '০ ভরি';
    let rem = totalVori;
    const v = Math.floor(rem);
    rem = (rem - v) * 16;
    const a = Math.floor(rem);
    rem = (rem - a) * 6;
    const r = Math.floor(rem);
    rem = (rem - r) * 10;
    const p = Math.round(rem);

    const parts: string[] = [];
    if (v > 0) parts.push(`${toBengaliNumerals(v)} ভরি`);
    if (a > 0) parts.push(`${toBengaliNumerals(a)} আনা`);
    if (r > 0) parts.push(`${toBengaliNumerals(r)} রতি`);
    if (p > 0) parts.push(`${toBengaliNumerals(p)} পয়েন্ট`);

    if (parts.length === 0) return `${formatDecimalBn(totalVori)} ভরি`;
    return parts.join(' ');
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
    setGoldParts({ vori: 0, ana: 0, roti: 0, point: 0 });
    setSilverParts({ vori: 0, ana: 0, roti: 0, point: 0 });
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
      orphanedMaternalGrandsonsCount: 0,
      orphanedMaternalGranddaughtersCount: 0,
      fullBrothersCount: 0,
      fullSistersCount: 0,
      consanguineBrothersCount: 0,
      consanguineSistersCount: 0,
      uterineBrothersCount: 0,
      uterineSistersCount: 0,
      fullNephewsCount: 0,
      consanguineNephewsCount: 0,
      fullNephewSonsCount: 0,
      consanguineNephewSonsCount: 0,
      paternalUnclesCount: 0,
      consanguinePaternalUnclesCount: 0,
      fullUncleSonsCount: 0,
      consanguineUncleSonsCount: 0,
      fullUncleGrandSonsCount: 0,
      consanguineUncleGrandSonsCount: 0,
      fullUncleGreatGrandSonsCount: 0,
      consanguineUncleGreatGrandSonsCount: 0,
    });
    setHinduInput({
      deceasedGender: 'male',
      hasWidow: false,
      hasHusband: false,
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

  // PDF Export Handler
  const handleDownloadPdf = async () => {
    const targetElement =
      pdfReportRef.current || document.getElementById('inheritance-pdf-printable-area');

    if (!targetElement || !result) {
      setShowPdfPreviewModal(true);
      return;
    }

    setIsExportingPdf(true);
    try {
      const safeSuffix = religion === 'muslim' ? 'Farayez' : 'Dayabhaga';
      const fileName = `Ahmed_Survey_Inheritance_${safeSuffix}.pdf`;
      const success = await exportElementToPdf(targetElement, fileName);
      if (success) {
        setPdfExportSuccess(true);
        setTimeout(() => setPdfExportSuccess(false), 3500);
      } else {
        // Fallback to preview modal
        setShowPdfPreviewModal(true);
      }
    } catch (err) {
      console.error('PDF export failed:', err);
      setShowPdfPreviewModal(true);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Copy Results to Clipboard
  const handleCopyResults = () => {
    if (!result) return;
    const landInDecimal = convertLandToDecimal(assets.landAmount, assets.landUnit);
    let text = `=== উত্তরাধিকার সম্পত্তি বণ্টন ফলাফল ===\n`;
    text += `প্রযোজ্য আইন: ${religion === 'muslim' ? 'মুসলিম ফারায়েজ আইন' : 'হিন্দু দায়ভাগ আইন'}\n`;
    text += `মোট জমি: ${toBengaliNumerals(assets.landAmount)} ${assets.landUnit} (= ${formatDecimalBn(landInDecimal)} শতক)\n`;
    if (assets.cashBDT > 0) text += `মোট মুদ্রা: ৳ ${toBengaliNumerals(assets.cashBDT.toLocaleString('en-IN'))}\n`;
    if (assets.goldVori > 0) text += `মোট স্বর্ণ: ${formatDecimalBn(assets.goldVori)} ভরি\n`;
    if (assets.silverVori > 0) text += `মোট রৌপ্য: ${formatDecimalBn(assets.silverVori)} ভরি\n\n`;

    text += `--- ওয়ারিশদের হিস্যা বিবরণী ---\n`;
    result.heirResults.forEach((h, i) => {
      text += `${i + 1}. ${h.relation} (${toBengaliNumerals(h.count)} জন): ${h.shareFraction} অংশ [${toBengaliNumerals(h.sharePercent.toFixed(2))}%] | মোট জমি: ${formatDecimalBn(h.totalLand)} শতক\n`;
    });

    if (result.excludedHeirs.length > 0) {
      text += `\nআইনানুযায়ী বঞ্চিত: ${result.excludedHeirs.join(', ')}\n`;
    }

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Number Stepper Input Component
  const NumberStepper = ({
    label,
    value,
    onChange,
    min = 0,
    max = 20,
    description,
    badge,
  }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
    description?: string;
    badge?: string;
  }) => (
    <div className="flex items-center justify-between p-3 bg-white hover:bg-emerald-50/40 border border-gray-200 rounded-xl transition-all">
      <div className="pr-2 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-semibold text-gray-800">{label}</span>
          {badge && (
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-[11px] text-gray-500 mt-0.5">{description}</p>}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-bold text-base flex items-center justify-center transition-all cursor-pointer"
        >
          -
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            onChange(isNaN(parsed) ? 0 : Math.max(min, Math.min(max, parsed)));
          }}
          className="w-12 h-8 text-center text-sm font-bold font-mono text-emerald-900 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-emerald-500 outline-none"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-emerald-900 font-bold text-base flex items-center justify-center transition-all cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );

  // Toggle Switch Component
  const BooleanToggle = ({
    label,
    checked,
    onChange,
    badge,
    description,
  }: {
    label: string;
    checked: boolean;
    onChange: (val: boolean) => void;
    badge?: string;
    description?: string;
  }) => (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between p-3 border rounded-xl transition-all cursor-pointer select-none ${
        checked
          ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
          : 'bg-white hover:bg-gray-50 border-gray-200'
      }`}
    >
      <div className="pr-2 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-sm font-semibold ${checked ? 'text-emerald-950 font-bold' : 'text-gray-800'}`}>
            {label}
          </span>
          {badge && (
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-[11px] text-gray-500 mt-0.5">{description}</p>}
      </div>
      <div
        className={`w-14 h-7 rounded-full transition-colors relative p-0.5 shrink-0 ${
          checked ? 'bg-emerald-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform flex items-center justify-center text-[9px] font-bold ${
            checked ? 'translate-x-7 text-emerald-700' : 'translate-x-0 text-gray-400'
          }`}
        >
          {checked ? 'আছে' : 'নেই'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-gray-800 pb-24">
      {/* ========================================================================= */}
      {/* ১. শিরোনাম ও ২. মুসলিম/হিন্দু ট্যাব সিলেকশন */}
      {/* ========================================================================= */}
      <header className="bg-[#006a4e] text-white shadow-sm border-b border-emerald-900/40">
        <div className="max-w-4xl mx-auto px-4 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
                <span>উত্তরাধিকার</span>
                <span className="text-amber-300 text-sm sm:text-base font-normal">
                  (অনলাইন সম্পত্তি বণ্টন ক্যালকুলেটর)
                </span>
              </h1>
              <p className="text-xs text-emerald-100 mt-1 font-medium">
                আইনসম্মত ও নির্ভুল অনলাইন সম্পত্তি বণ্টন হিসাব
              </p>
            </div>

            {/* ২. মুসলিম / হিন্দু ট্যাব সিলেকশন */}
            <div className="flex bg-emerald-950/50 p-1 rounded-xl border border-emerald-700/60 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                id="tab-muslim-inheritance"
                onClick={() => {
                  setReligion('muslim');
                  setResult(null);
                }}
                className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  religion === 'muslim'
                    ? 'bg-amber-400 text-emerald-950 shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🌿 মুসলিম</span>
              </button>

              <button
                type="button"
                id="tab-hindu-inheritance"
                onClick={() => {
                  setReligion('hindu');
                  setResult(null);
                }}
                className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  religion === 'hindu'
                    ? 'bg-amber-400 text-emerald-950 shadow-xs'
                    : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🪷 হিন্দু</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        {/* Quick Notice */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
          <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">
              {religion === 'muslim'
                ? 'পবিত্র কুরআন, সুন্নাহ ও মুসলিম পারিবারিক আইন অধ্যাদেশ অনুযায়ী নির্ভুল স্বয়ংক্রিয় হিসাব।'
                : 'ঐতিহ্যবাহী দায়ভাগ পদ্ধতি এবং হিন্দু নারী সম্পত্তি অধিকার আইন অনুসরণে প্রস্তুতকৃত।'}
            </p>
            <p className="text-amber-800/90 text-[11px]">
              মৃত ব্যক্তির তথ্য নির্ধারণ করুন, জীবিত ওয়ারিশগণের সংখ্যা ও সম্পত্তির পরিমাণ দিয়ে{' '}
              <strong className="text-emerald-900 font-bold">"হিসাব করুন"</strong> বাটনে ক্লিক করুন।
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: DECEASED INFORMATION (মৃত ব্যক্তির তথ্য) */}
        {/* ========================================================================= */}
        <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3 border-b border-gray-100 pb-2.5">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              ১
            </span>
            <h2 className="text-base font-bold text-gray-900">মৃত ব্যক্তির তথ্য</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              id="radio-deceased-male"
              onClick={() => {
                if (religion === 'muslim') {
                  setMuslimInput((prev) => ({
                    ...prev,
                    deceasedGender: 'male',
                    wivesCount: prev.wivesCount === 0 ? 1 : prev.wivesCount,
                    hasHusband: false,
                  }));
                } else {
                  setHinduInput((prev) => ({
                    ...prev,
                    deceasedGender: 'male',
                    hasWidow: true,
                    hasHusband: false,
                  }));
                }
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                (religion === 'muslim'
                  ? muslimInput.deceasedGender === 'male'
                  : hinduInput.deceasedGender === 'male')
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👨</span>
                <div>
                  <span className="font-bold text-sm text-gray-900 block">
                    {religion === 'muslim' ? 'মরহুম (পুরুষ)' : 'মৃত (পুরুষ)'}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {religion === 'muslim' ? 'স্ত্রী ও সন্তানাদি রেখে গেছেন' : 'বিধবা স্ত্রী ও সন্তানাদি'}
                  </span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  (religion === 'muslim'
                    ? muslimInput.deceasedGender === 'male'
                    : hinduInput.deceasedGender === 'male')
                    ? 'border-emerald-600 bg-emerald-600'
                    : 'border-gray-300'
                }`}
              >
                {(religion === 'muslim'
                  ? muslimInput.deceasedGender === 'male'
                  : hinduInput.deceasedGender === 'male') && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>

            <button
              type="button"
              id="radio-deceased-female"
              onClick={() => {
                if (religion === 'muslim') {
                  setMuslimInput((prev) => ({
                    ...prev,
                    deceasedGender: 'female',
                    wivesCount: 0,
                    hasHusband: true,
                  }));
                } else {
                  setHinduInput((prev) => ({
                    ...prev,
                    deceasedGender: 'female',
                    hasWidow: false,
                    hasHusband: true,
                  }));
                }
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                (religion === 'muslim'
                  ? muslimInput.deceasedGender === 'female'
                  : hinduInput.deceasedGender === 'female')
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👩</span>
                <div>
                  <span className="font-bold text-sm text-gray-900 block">
                    {religion === 'muslim' ? 'মরহুমা (নারী)' : 'মৃতা (নারী)'}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {religion === 'muslim' ? 'স্বামী ও সন্তানাদি রেখে গেছেন' : 'স্বামী বা সন্তানাদি'}
                  </span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  (religion === 'muslim'
                    ? muslimInput.deceasedGender === 'female'
                    : hinduInput.deceasedGender === 'female')
                    ? 'border-emerald-600 bg-emerald-600'
                    : 'border-gray-300'
                }`}
              >
                {(religion === 'muslim'
                  ? muslimInput.deceasedGender === 'female'
                  : hinduInput.deceasedGender === 'female') && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 2: HEIRS SELECTION (ওয়ারিশগণের বিবরণ - uttoradhikar.gov.bd MODEL) */}
        {/* ========================================================================= */}
        <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                ২
              </span>
              <h2 className="text-base font-bold text-gray-900">
                ওয়ারিশগণের সংখ্যা ও বিবরণ
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              জীবিত ওয়ারিশদের সংখ্যা নির্ধারণ করুন
            </span>
          </div>

          {religion === 'muslim' ? (
            /* MUSLIM FARAYEZ HEIR SECTIONS */
            <div className="space-y-4">
              {/* 1. Primary Sharers: Spouse & Children */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection('primary')}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-bold text-sm text-gray-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>👨‍👩‍👧‍👦</span>
                    <span>স্বামী / স্ত্রী ও সন্তানাদি</span>
                    <span className="text-[10px] font-normal text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      প্রধান ওয়ারিশ
                    </span>
                  </span>
                  {openSection.primary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openSection.primary && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
                    {muslimInput.deceasedGender === 'male' ? (
                      <NumberStepper
                        label="স্ত্রী (Wife)"
                        badge="১/৮ বা ১/৪"
                        description="জীবিত স্ত্রীর সংখ্যা (সর্বোচ্চ ৪ জন)"
                        value={muslimInput.wivesCount}
                        min={0}
                        max={4}
                        onChange={(v) => setMuslimInput((prev) => ({ ...prev, wivesCount: v }))}
                      />
                    ) : (
                      <BooleanToggle
                        label="স্বামী (Husband)"
                        badge="১/৪ বা ১/২"
                        description="মৃতা নারীর জীবিত স্বামী"
                        checked={muslimInput.hasHusband}
                        onChange={(v) => setMuslimInput((prev) => ({ ...prev, hasHusband: v }))}
                      />
                    )}

                    <NumberStepper
                      label="পুত্র (Son)"
                      badge="আসাবা (অবশিষ্টভোগী)"
                      description="জীবিত পুত্রের সংখ্যা"
                      value={muslimInput.sonsCount}
                      min={0}
                      max={20}
                      onChange={(v) => setMuslimInput((prev) => ({ ...prev, sonsCount: v }))}
                    />

                    <NumberStepper
                      label="কন্যা (Daughter)"
                      badge="কুরআনিক অংশীদার"
                      description="জীবিত কন্যার সংখ্যা"
                      value={muslimInput.daughtersCount}
                      min={0}
                      max={20}
                      onChange={(v) => setMuslimInput((prev) => ({ ...prev, daughtersCount: v }))}
                    />
                  </div>
                )}
              </div>

              {/* 2. Parents & Grandparents */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection('parents')}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-bold text-sm text-gray-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>👴👵</span>
                    <span>পিতা-মাতা ও দাদা-দাদী-নানী</span>
                  </span>
                  {openSection.parents ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openSection.parents && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
                    <BooleanToggle
                      label="পিতা (Father)"
                      badge="১/৬ বা আসাবা"
                      description="মৃত ব্যক্তির জীবিত পিতা"
                      checked={muslimInput.hasFather}
                      onChange={(v) => setMuslimInput((prev) => ({ ...prev, hasFather: v }))}
                    />

                    <BooleanToggle
                      label="মাতা (Mother)"
                      badge="১/৬ বা ১/৩"
                      description="মৃত ব্যক্তির জীবিত মাতা"
                      checked={muslimInput.hasMother}
                      onChange={(v) => setMuslimInput((prev) => ({ ...prev, hasMother: v }))}
                    />

                    <BooleanToggle
                      label="দাদা (Paternal Grandfather)"
                      badge="পিতা না থাকলে"
                      description="পিতার পিতা"
                      checked={muslimInput.hasPaternalGrandfather}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, hasPaternalGrandfather: v }))
                      }
                    />

                    <BooleanToggle
                      label="দাদী (Paternal Grandmother)"
                      badge="মাতা/পিতা না থাকলে"
                      description="পিতার মাতা"
                      checked={muslimInput.hasPaternalGrandmother}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, hasPaternalGrandgrandmother: v }))
                      }
                    />

                    <BooleanToggle
                      label="নানী (Maternal Grandmother)"
                      badge="মাতা না থাকলে"
                      description="মাতার মাতা"
                      checked={muslimInput.hasMaternalGrandmother}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, hasMaternalGrandmother: v }))
                      }
                    />
                  </div>
                )}
              </div>

              {/* 3. Predeceased Children's Offspring (1961 Ordinance Sec 4) */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection('grandchildren')}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-bold text-sm text-gray-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>👶</span>
                    <span>এতিম নাতি-নাতনি (১৯৬১ সালের পারিবারিক আইন ৪ ধারা)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                      বিশেষ আইন
                    </span>
                  </span>
                  {openSection.grandchildren ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openSection.grandchildren && (
                  <div className="p-4 space-y-3 bg-white">
                    <p className="text-xs text-gray-600 italic">
                      মৃত ব্যক্তির জীবদ্দশায় কোনো পুত্র বা কন্যা মারা গিয়ে থাকলে তাদের জীবিত সন্তানগণ এই ধারায় পিতার/মাতার সমপরিমাণ অংশ পান:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <NumberStepper
                        label="মৃত পুত্রের পুত্র (পৌত্র)"
                        value={muslimInput.orphanedGrandsonsCount}
                        onChange={(v) =>
                          setMuslimInput((prev) => ({ ...prev, orphanedGrandsonsCount: v }))
                        }
                      />
                      <NumberStepper
                        label="মৃত পুত্রের কন্যা (পৌত্রী)"
                        value={muslimInput.orphanedGranddaughtersCount}
                        onChange={(v) =>
                          setMuslimInput((prev) => ({ ...prev, orphanedGranddaughtersCount: v }))
                        }
                      />
                      <NumberStepper
                        label="মৃত কন্যার পুত্র (দৌহিত্র)"
                        value={muslimInput.orphanedMaternalGrandsonsCount}
                        onChange={(v) =>
                          setMuslimInput((prev) => ({
                            ...prev,
                            orphanedMaternalGrandsonsCount: v,
                          }))
                        }
                      />
                      <NumberStepper
                        label="মৃত কন্যার কন্যা (দৌহিত্রী)"
                        value={muslimInput.orphanedMaternalGranddaughtersCount}
                        onChange={(v) =>
                          setMuslimInput((prev) => ({
                            ...prev,
                            orphanedMaternalGranddaughtersCount: v,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Siblings (ভাই-বোন) */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection('siblings')}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-bold text-sm text-gray-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>👥</span>
                    <span>ভাই ও বোন (সহোদর, বৈমাত্রেয়, বৈপিত্রেয়)</span>
                  </span>
                  {openSection.siblings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openSection.siblings && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
                    <NumberStepper
                      label="সহোদর ভাই (আপন ভাই)"
                      badge="আসাবা"
                      value={muslimInput.fullBrothersCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, fullBrothersCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সহোদর বোন (আপন বোন)"
                      value={muslimInput.fullSistersCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, fullSistersCount: v }))
                      }
                    />
                    <NumberStepper
                      label="বৈমাত্রেয় ভাই (পিতা এক)"
                      value={muslimInput.consanguineBrothersCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, consanguineBrothersCount: v }))
                      }
                    />
                    <NumberStepper
                      label="বৈমাত্রেয় বোন (পিতা এক)"
                      value={muslimInput.consanguineSistersCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, consanguineSistersCount: v }))
                      }
                    />
                    <NumberStepper
                      label="বৈপিত্রেয় ভাই (মা এক)"
                      badge="১/৩ বা ১/৬"
                      value={muslimInput.uterineBrothersCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, uterineBrothersCount: v }))
                      }
                    />
                    <NumberStepper
                      label="বৈপিত্রেয় বোন (মা এক)"
                      badge="১/৩ বা ১/৬"
                      value={muslimInput.uterineSistersCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, uterineSistersCount: v }))
                      }
                    />
                  </div>
                )}
              </div>

              {/* 5. Extended Relatives: Nephews & Uncles */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection('extended')}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-bold text-sm text-gray-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>🤝</span>
                    <span>অন্যান্য দূরবর্তী আত্মীয় (ভাতিজা, চাচা ও চাচাতো ভাই)</span>
                  </span>
                  {openSection.extended ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openSection.extended && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
                    <NumberStepper
                      label="সহোদর ভাইয়ের পুত্র"
                      badge="আসাবা"
                      value={muslimInput.fullNephewsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, fullNephewsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সৎ ভাই (বৈমাত্রেয়)-এর পুত্র"
                      badge="আসাবা"
                      value={muslimInput.consanguineNephewsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, consanguineNephewsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সহোদর ভাইয়ের পুত্রের পুত্র"
                      badge="আসাবা"
                      value={muslimInput.fullNephewSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, fullNephewSonsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সৎ ভাই (বৈমাত্রেয়)-এর পুত্রের পুত্র"
                      badge="আসাবা"
                      value={muslimInput.consanguineNephewSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, consanguineNephewSonsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="আপন চাচা"
                      badge="আসাবা"
                      value={muslimInput.paternalUnclesCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, paternalUnclesCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সৎ চাচা (বৈমাত্রেয়)"
                      badge="আসাবা"
                      value={muslimInput.consanguinePaternalUnclesCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, consanguinePaternalUnclesCount: v }))
                      }
                    />
                    <NumberStepper
                      label="আপন চাচার পুত্র"
                      badge="আসাবা"
                      value={muslimInput.fullUncleSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, fullUncleSonsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সৎ চাচার পুত্র"
                      badge="আসাবা"
                      value={muslimInput.consanguineUncleSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, consanguineUncleSonsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="আপন চাচার পুত্রের পুত্র"
                      badge="আসাবা"
                      value={muslimInput.fullUncleGrandSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, fullUncleGrandSonsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সৎ চাচার পুত্রের পুত্র"
                      badge="আসাবা"
                      value={muslimInput.consanguineUncleGrandSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, consanguineUncleGrandSonsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="আপন চাচার পুত্রের পুত্রের পুত্র"
                      badge="আসাবা"
                      value={muslimInput.fullUncleGreatGrandSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({ ...prev, fullUncleGreatGrandSonsCount: v }))
                      }
                    />
                    <NumberStepper
                      label="সৎ চাচার পুত্রের পুত্রের পুত্র"
                      badge="আসাবা"
                      value={muslimInput.consanguineUncleGreatGrandSonsCount}
                      onChange={(v) =>
                        setMuslimInput((prev) => ({
                          ...prev,
                          consanguineUncleGreatGrandSonsCount: v,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* HINDU DAYABHAGA HEIRS SECTIONS */
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-3">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-1.5">
                  {hinduInput.deceasedGender === 'male'
                    ? 'মৃত পুরুষের ওয়ারিশগণ (দায়ভাগ আইন ও ১৯৩৭ সালের আইন)'
                    : 'মৃতা নারীর ওয়ারিশগণ (দায়ভাগ স্ত্রীধন বণ্টন)'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hinduInput.deceasedGender === 'male' ? (
                    <BooleanToggle
                      label="বিধবা স্ত্রী (Widow)"
                      badge="১৯৩৭ সালের আইন"
                      description="পুত্রের সমান এক অংশ পান (সীমিত স্বত্ব)"
                      checked={hinduInput.hasWidow}
                      onChange={(v) => setHinduInput((prev) => ({ ...prev, hasWidow: v }))}
                    />
                  ) : (
                    <BooleanToggle
                      label="স্বামী (Husband)"
                      badge="সন্তান না থাকলে"
                      description="স্ত্রীধনের ৩য় অগ্রাধিকারী"
                      checked={hinduInput.hasHusband}
                      onChange={(v) => setHinduInput((prev) => ({ ...prev, hasHusband: v }))}
                    />
                  )}

                  <NumberStepper
                    label="পুত্র (Son)"
                    badge="১ম অগ্রাধিকার"
                    value={hinduInput.sonsCount}
                    onChange={(v) => setHinduInput((prev) => ({ ...prev, sonsCount: v }))}
                  />

                  {hinduInput.deceasedGender === 'male' && (
                    <>
                      <NumberStepper
                        label="পৌত্র (মৃত পুত্রের পুত্র)"
                        value={hinduInput.grandsonsCount}
                        onChange={(v) => setHinduInput((prev) => ({ ...prev, grandsonsCount: v }))}
                      />
                      <NumberStepper
                        label="প্রপৌত্র (মৃত পৌত্রের পুত্র)"
                        value={hinduInput.greatGrandsonsCount}
                        onChange={(v) =>
                          setHinduInput((prev) => ({ ...prev, greatGrandsonsCount: v }))
                        }
                      />
                    </>
                  )}

                  <NumberStepper
                    label="অবিবাহিতা কন্যা"
                    badge="২য় অগ্রাধিকার"
                    value={hinduInput.unmarriedDaughtersCount}
                    onChange={(v) =>
                      setHinduInput((prev) => ({ ...prev, unmarriedDaughtersCount: v }))
                    }
                  />

                  <NumberStepper
                    label="বিবাহিতা কন্যা"
                    badge="৩য় অগ্রাধিকার"
                    value={hinduInput.marriedDaughtersCount}
                    onChange={(v) =>
                      setHinduInput((prev) => ({ ...prev, marriedDaughtersCount: v }))
                    }
                  />

                  <BooleanToggle
                    label="পিতা (Father)"
                    checked={hinduInput.hasFather}
                    onChange={(v) => setHinduInput((prev) => ({ ...prev, hasFather: v }))}
                  />

                  <BooleanToggle
                    label="মাতা (Mother)"
                    checked={hinduInput.hasMother}
                    onChange={(v) => setHinduInput((prev) => ({ ...prev, hasMother: v }))}
                  />

                  <NumberStepper
                    label="সহোদর ভাই"
                    value={hinduInput.brothersCount}
                    onChange={(v) => setHinduInput((prev) => ({ ...prev, brothersCount: v }))}
                  />

                  {hinduInput.deceasedGender === 'male' && (
                    <NumberStepper
                      label="ভাইয়ের পুত্র (ভাতিজা)"
                      value={hinduInput.brotherSonsCount}
                      onChange={(v) =>
                        setHinduInput((prev) => ({ ...prev, brotherSonsCount: v }))
                      }
                    />
                  )}

                  <NumberStepper
                    label="সহোদর বোন"
                    value={hinduInput.sistersCount}
                    onChange={(v) => setHinduInput((prev) => ({ ...prev, sistersCount: v }))}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* STEP 3: ASSETS INPUT (সম্পদের বিবরণ - uttoradhikar.gov.bd MODEL) */}
        {/* ========================================================================= */}
        <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                ৩
              </span>
              <h2 className="text-base font-bold text-gray-900">সম্পদের বিবরণ</h2>
            </div>
            <span className="text-[11px] font-semibold text-gray-500">
              জমি, নগদ অর্থ, স্বর্ণ ও রৌপ্য
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Land Amount & Unit Selector */}
            <div className="p-3.5 bg-gray-50/70 border border-gray-200 rounded-xl space-y-2">
              <label className="text-xs font-bold text-gray-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-emerald-700" />
                  <span>জমির পরিমাণ</span>
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">
                  ১ একর = ১০০ শতক • ১ বিঘা = ৩৩ শতক
                </span>
              </label>

              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={assets.landAmount === 0 ? '' : assets.landAmount}
                  onChange={(e) =>
                    setAssets((prev) => ({
                      ...prev,
                      landAmount: Math.max(0, parseFloat(e.target.value) || 0),
                    }))
                  }
                  placeholder="যেমন: ১০০"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold font-mono focus:border-emerald-600 focus:bg-white outline-none"
                />

                <select
                  value={assets.landUnit}
                  onChange={(e) =>
                    setAssets((prev) => ({ ...prev, landUnit: e.target.value as LandUnit }))
                  }
                  className="px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-800 focus:border-emerald-600 outline-none cursor-pointer"
                >
                  <option value="decimal">শতাংশ / শতক</option>
                  <option value="katha">কাঠা (১.৬৫ শতক)</option>
                  <option value="bigha">বিঘা (৩৩ শতক)</option>
                  <option value="acre">একর (১০০ শতক)</option>
                </select>
              </div>
            </div>

            {/* 2. Cash BDT */}
            <div className="p-3.5 bg-gray-50/70 border border-gray-200 rounded-xl space-y-2">
              <label className="text-xs font-bold text-gray-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Coins size={14} className="text-amber-600" />
                  <span>নগদ মুদ্রা / টাকা (টাকা)</span>
                </span>
                <span className="text-[10px] text-gray-500">ব্যাংক ও নগদ সঞ্চয়</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  step="100"
                  value={assets.cashBDT === 0 ? '' : assets.cashBDT}
                  onChange={(e) =>
                    setAssets((prev) => ({
                      ...prev,
                      cashBDT: Math.max(0, parseFloat(e.target.value) || 0),
                    }))
                  }
                  placeholder="যেমন: ৫,০০,০০০"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold font-mono focus:border-emerald-600 focus:bg-white outline-none pr-14"
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-500 font-bold pointer-events-none">
                  ৳ টাকা
                </span>
              </div>
            </div>
          </div>

          {/* Gold & Silver Detailed Inputs (ভরি, আনা, রতি, পয়েন্ট - uttoradhikar.gov.bd MODEL) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Gold (স্বর্ণ) */}
            <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <span>👑</span>
                  <span>স্বর্ণ (ভরি - আনা - রতি - পয়েন্ট)</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                  মোট: {formatDecimalBn(assets.goldVori)} ভরি
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">ভরি</span>
                  <input
                    type="number"
                    min={0}
                    value={goldParts.vori === 0 ? '' : goldParts.vori}
                    onChange={(e) => updateGoldPart('vori', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">আনা</span>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={goldParts.ana === 0 ? '' : goldParts.ana}
                    onChange={(e) => updateGoldPart('ana', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">রতি</span>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={goldParts.roti === 0 ? '' : goldParts.roti}
                    onChange={(e) => updateGoldPart('roti', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">পয়েন্ট</span>
                  <input
                    type="number"
                    min={0}
                    max={9}
                    value={goldParts.point === 0 ? '' : goldParts.point}
                    onChange={(e) => updateGoldPart('point', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Silver (রৌপ্য) */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span>🪙</span>
                  <span>রৌপ্য (ভরি - আনা - রতি - পয়েন্ট)</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-800 bg-slate-200/80 px-2 py-0.5 rounded">
                  মোট: {formatDecimalBn(assets.silverVori)} ভরি
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">ভরি</span>
                  <input
                    type="number"
                    min={0}
                    value={silverParts.vori === 0 ? '' : silverParts.vori}
                    onChange={(e) => updateSilverPart('vori', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-slate-500 outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">আনা</span>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={silverParts.ana === 0 ? '' : silverParts.ana}
                    onChange={(e) => updateSilverPart('ana', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-slate-500 outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">রতি</span>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={silverParts.roti === 0 ? '' : silverParts.roti}
                    onChange={(e) => updateSilverPart('roti', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-slate-500 outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-600 block mb-1">পয়েন্ট</span>
                  <input
                    type="number"
                    min={0}
                    max={9}
                    value={silverParts.point === 0 ? '' : silverParts.point}
                    onChange={(e) => updateSilverPart('point', parseFloat(e.target.value) || 0)}
                    placeholder="০"
                    className="w-full py-1.5 px-1 text-center font-mono font-bold text-xs bg-white border border-gray-300 rounded-lg focus:border-slate-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACTION BUTTONS (হিসাব করুন & মুছে ফেলুন) */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            id="btn-calculate-inheritance"
            onClick={handleCalculate}
            className="flex-1 py-3.5 px-6 bg-[#006a4e] hover:bg-[#00523c] active:scale-[0.99] text-white font-bold text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-500"
          >
            <Calculator size={20} className="text-amber-300" />
            <span>হিসাব করুন</span>
          </button>

          <button
            type="button"
            id="btn-reset-inheritance"
            onClick={handleReset}
            className="px-6 py-3.5 bg-white hover:bg-gray-50 active:scale-[0.99] text-gray-700 font-bold text-sm rounded-xl border border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            title="সব ইনপুট রিসেট করুন"
          >
            <RotateCcw size={17} />
            <span>মুছে ফেলুন / নতুন হিসাব</span>
          </button>
        </div>

        {/* ANCHOR FOR AUTO-SCROLL */}
        <div id="inheritance-result-anchor" />

        {/* ========================================================================= */}
        {/* RESULTS SECTION - EXACTLY LIKE uttoradhikar.gov.bd */}
        {/* ========================================================================= */}
        {result && (
          <section className="space-y-6 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* 1. Header Toolbar with Export Buttons */}
            <div className="bg-white border-2 border-emerald-600/60 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
                  <h2 className="text-lg font-black text-gray-900">
                    {religion === 'muslim'
                      ? 'উত্তরাধিকার সম্পত্তি বণ্টন ফলাফল (ফারায়েজ)'
                      : 'হিন্দু উত্তরাধিকার বণ্টন ফলাফল (দায়ভাগ)'}
                  </h2>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  মোট বণ্টিত হিস্যা:{' '}
                  <span className="font-bold text-emerald-800 font-mono">
                    {toBengaliNumerals(result.totalDistributedPercent.toFixed(2))}%
                  </span>{' '}
                  • জমি:{' '}
                  <span className="font-bold font-mono">
                    {formatDecimalBn(convertLandToDecimal(assets.landAmount, assets.landUnit))} শতক
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <button
                  type="button"
                  id="btn-download-pdf"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  <Download size={15} />
                  <span>{isExportingPdf ? 'পিডিএফ তৈরি হচ্ছে...' : 'অফিসিয়াল PDF ডাউনলোড'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPdfPreviewModal(true)}
                  className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="প্রিভিউ ও প্রিন্ট"
                >
                  <Printer size={15} />
                  <span>প্রিন্ট</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyResults}
                  className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="ফলাফল কপি করুন"
                >
                  {isCopied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                  <span>{isCopied ? 'কপি হয়েছে' : 'কপি'}</span>
                </button>
              </div>
            </div>

            {/* PDF Export Success Toast */}
            {pdfExportSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" />
                  <span>আপনার উত্তরাধিকার PDF সফলভাবে ডাউনলোড হয়েছে!</span>
                </span>
                <span className="text-[11px] font-normal text-emerald-700">ফাইল চেক করুন</span>
              </div>
            )}

            {/* 2. PIE CHART (উত্তরাধিকার হিস্যা সচিত্র পাই চার্ট - uttoradhikar.gov.bd MODEL) */}
            <InheritancePieChart heirResults={result.heirResults} religion={religion} />

            {/* 3. OFFICIAL RESULTS TABLE (সরকারি উত্তরাধিকার বণ্টন ফলাফল সারণী) */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-[#006a4e] text-white p-3.5 sm:p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
                    <span>📋</span>
                    <span>উত্তরাধিকার বণ্টন ফলাফল সারণী</span>
                  </h3>
                  <p className="text-[11px] text-emerald-100 mt-0.5">
                    প্রতিটি ওয়ারিশের কুরআনিক বা আইনি হিস্যা, শতাংশ ও সম্পদ বণ্টনের হিসাব
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-400 text-emerald-950 px-2.5 py-1 rounded-md">
                  সর্বমোট: {toBengaliNumerals(result.totalDistributedPercent.toFixed(1))}%
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-100 text-gray-800 font-bold border-b border-gray-200 text-[11px]">
                      <th className="py-3 px-3 text-center w-10 border-r border-gray-200">ক্র. নং</th>
                      <th className="py-3 px-3 border-r border-gray-200">ওয়ারিশের বিবরণ</th>
                      <th className="py-3 px-3 text-center border-r border-gray-200 w-14">সংখ্যা</th>
                      <th className="py-3 px-3 border-r border-gray-200">অংশ / হিস্যা</th>
                      <th className="py-3 px-3 text-center border-r border-gray-200">শতকরা (%)</th>
                      <th className="py-3 px-3 text-right border-r border-gray-200">প্রাপ্ত মোট জমি</th>
                      <th className="py-3 px-3 text-right border-r border-gray-200">জনপ্রতি জমি</th>
                      {assets.cashBDT > 0 && (
                        <th className="py-3 px-3 text-right border-r border-gray-200">মুদ্রা (টাকা)</th>
                      )}
                      {assets.goldVori > 0 && (
                        <th className="py-3 px-3 text-right border-r border-gray-200">স্বর্ণ</th>
                      )}
                      {assets.silverVori > 0 && (
                        <th className="py-3 px-3 text-right">রৌপ্য</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.heirResults.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-gray-500 font-medium">
                          কোনো বৈধ ওয়ারিশ শনাক্ত করা যায়নি। দয়া করে ওয়ারিশ ইনপুট যাচাই করুন।
                        </td>
                      </tr>
                    ) : (
                      result.heirResults.map((heir, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? 'bg-white hover:bg-emerald-50/30' : 'bg-gray-50/60 hover:bg-emerald-50/30'}
                        >
                          <td className="py-3 px-3 text-center font-mono font-bold text-gray-600 border-r border-gray-200">
                            {toBengaliNumerals(idx + 1)}
                          </td>
                          <td className="py-3 px-3 border-r border-gray-200">
                            <span className="font-bold text-gray-900 block">{heir.relation}</span>
                            <span className="text-[10px] text-gray-500 block">{heir.category}</span>
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-gray-800 border-r border-gray-200">
                            {toBengaliNumerals(heir.count)} জন
                          </td>
                          <td className="py-3 px-3 border-r border-gray-200 font-bold font-mono text-[#006a4e]">
                            {heir.shareFraction}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-black text-emerald-800 border-r border-gray-200">
                            {toBengaliNumerals(heir.sharePercent.toFixed(2))}%
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-gray-900 border-r border-gray-200">
                            {formatDecimalBn(heir.totalLand)} শতক
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-gray-700 border-r border-gray-200">
                            {formatDecimalBn(heir.perPersonLand)} শতক
                          </td>
                          {assets.cashBDT > 0 && (
                            <td className="py-3 px-3 text-right font-mono text-gray-900 border-r border-gray-200 font-semibold">
                              ৳ {toBengaliNumerals(Math.round(heir.totalCash).toLocaleString('en-IN'))}
                            </td>
                          )}
                          {assets.goldVori > 0 && (
                            <td className="py-3 px-3 text-right font-mono text-amber-950 border-r border-gray-200">
                              {formatVoriDetailed(heir.totalGold)}
                            </td>
                          )}
                          {assets.silverVori > 0 && (
                            <td className="py-3 px-3 text-right font-mono text-slate-800">
                              {formatVoriDetailed(heir.totalSilver)}
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                  {result.heirResults.length > 0 && (
                    <tfoot>
                      <tr className="bg-emerald-50/70 font-bold text-emerald-950 border-t-2 border-emerald-300">
                        <td colSpan={4} className="py-3 px-3 text-right">
                          সর্বমোট বণ্টন:
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-black text-emerald-900">
                          {toBengaliNumerals(result.totalDistributedPercent.toFixed(1))}%
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-black text-emerald-900">
                          {formatDecimalBn(convertLandToDecimal(assets.landAmount, assets.landUnit))} শতক
                        </td>
                        <td className="py-3 px-3 text-right text-gray-500 text-[10px]">
                          ১০০% বণ্টিত
                        </td>
                        {assets.cashBDT > 0 && (
                          <td className="py-3 px-3 text-right font-mono font-bold">
                            ৳ {toBengaliNumerals(assets.cashBDT.toLocaleString('en-IN'))}
                          </td>
                        )}
                        {assets.goldVori > 0 && (
                          <td className="py-3 px-3 text-right font-mono font-bold">
                            {formatVoriDetailed(assets.goldVori)}
                          </td>
                        )}
                        {assets.silverVori > 0 && (
                          <td className="py-3 px-3 text-right font-mono font-bold">
                            {formatVoriDetailed(assets.silverVori)}
                          </td>
                        )}
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            {/* 4. Excluded Heirs (বঞ্চিত ওয়ারিশদের তালিকা) */}
            {result.excludedHeirs.length > 0 && (
              <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 text-xs">
                <h4 className="font-bold text-red-950 mb-1.5 flex items-center gap-1.5">
                  <XCircle size={15} className="text-red-600" />
                  <span>আইনানুযায়ী বঞ্চিত ওয়ারিশ (হিজব/মাহজুব):</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {result.excludedHeirs.map((ex, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white border border-red-200 rounded-lg text-[11px] text-red-900 font-medium"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Legal Calculation Steps (আইনি ব্যাখ্যা ও বণ্টন পদক্ষেপ) */}
            {result.steps.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2 border-b border-gray-100 pb-2">
                  <BookOpen size={16} className="text-emerald-700" />
                  <span>আইনি বণ্টন পদক্ষেপ ও ব্যাখ্যা (Legal Basis):</span>
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs text-gray-700">
                  {result.steps.map((step, i) => (
                    <li key={i} className="leading-relaxed bg-gray-50/60 p-2 rounded-xl border border-gray-100">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* 6. Legal Disclaimer */}
            <div className="p-3.5 bg-gray-100 border border-gray-300 rounded-xl text-[11px] text-gray-600 leading-relaxed">
              <strong className="text-gray-800">আইনি সতর্কতা: </strong>
              {result.disclaimer}
            </div>
          </section>
        )}
      </main>

      {/* ========================================================================= */}
      {/* HIDDEN / OFFSCREEN TARGET FOR HIGH-RES PDF EXPORT */}
      {/* ========================================================================= */}
      {result && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '-99999px',
            width: '800px',
            overflow: 'visible',
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

      {/* ========================================================================= */}
      {/* MODAL: PRINT & PREVIEW REPORT MODAL */}
      {/* ========================================================================= */}
      {showPdfPreviewModal && result && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#006a4e] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Printer size={18} className="text-amber-300" />
                <h3 className="text-sm sm:text-base font-bold">
                  উত্তরাধিকার প্রতিবেদন প্রিভিউ ও প্রিন্ট
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>{isExportingPdf ? 'ডাউনলোড হচ্ছে...' : 'ডাউনলোড PDF'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Printer size={14} />
                  <span>প্রিন্ট</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPdfPreviewModal(false)}
                  className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body with Printable Report */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100 flex justify-center">
              <div className="shadow-lg">
                <InheritancePdfReport
                  result={result}
                  assets={assets}
                  religion={religion}
                  muslimInput={muslimInput}
                  hinduInput={hinduInput}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
