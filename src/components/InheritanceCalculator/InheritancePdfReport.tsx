import React from 'react';
import {
  CalculationOutcome,
  PropertyAssets,
  Religion,
  MuslimHeirsInput,
  HinduHeirsInput,
} from './types';
import { toBengaliNumerals, formatDecimalBn } from './muslimCalculation';

interface InheritancePdfReportProps {
  result: CalculationOutcome;
  assets: PropertyAssets;
  religion: Religion;
  muslimInput?: MuslimHeirsInput;
  hinduInput?: HinduHeirsInput;
  reportRef?: React.RefObject<HTMLDivElement | null>;
}

export const InheritancePdfReport: React.FC<InheritancePdfReportProps> = ({
  result,
  assets,
  religion,
  muslimInput,
  hinduInput,
  reportRef,
}) => {
  // Format current date in Bengali
  const todayBn = new Date().toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const reportId = `ASSC-FRZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const deceasedGenderText =
    religion === 'muslim'
      ? muslimInput?.deceasedGender === 'female'
        ? 'মরহুমা (নারী)'
        : 'মরহুম (পুরুষ)'
      : hinduInput?.deceasedGender === 'female'
      ? 'মৃতা (নারী)'
      : 'মৃত (পুরুষ)';

  return (
    <div
      ref={reportRef}
      id="inheritance-pdf-printable-area"
      className="bg-white text-gray-900 p-8 max-w-[800px] mx-auto border border-gray-300 font-sans shadow-none print:p-4 print:border-none"
      style={{ width: '800px', boxSizing: 'border-box' }}
    >
      {/* 1. OFFICIAL LETTERHEAD / HEADER */}
      <div className="border-b-2 border-[#0A2540] pb-4 mb-4 text-center relative">
        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-[11px] font-bold mb-2">
          সরকারি সনদপ্রাপ্ত আধুনিক ডিজিটাল সার্ভে এন্ড সলুশন সেন্টার
        </div>
        <h1 className="text-2xl font-black text-[#0A2540] tracking-tight leading-tight">
          আহম্মদ টোটাল স্টেশন - সার্ভে এন্ড সলুশন সেন্টার
        </h1>
        <p className="text-xs font-semibold text-gray-700 tracking-wide mt-0.5">
          Ahmed Total Station - Survey & Solution Center
        </p>
        <p className="text-[11px] text-gray-600 mt-1">
          ডিজিটাল সার্ভে, মৌজা ম্যাপ, সীমানা বিরোধ নিষ্পত্তি ও উত্তরাধিকার সম্পত্তি বণ্টন (ফরায়েজ)
        </p>
        <div className="mt-2 text-xs font-bold text-gray-800 bg-gray-100 py-1 px-4 rounded-lg inline-flex items-center gap-4">
          <span>📞 হেল্পলাইন: +8801873434500</span>
          <span>•</span>
          <span>WhatsApp: +8801873434500</span>
        </div>
      </div>

      {/* 2. REPORT TITLE & META */}
      <div className="bg-[#0A2540] text-white p-3 rounded-xl mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
            অফিসিয়াল ফরায়েজ ও বণ্টন প্রতিবেদন
          </span>
          <h2 className="text-base font-bold">
            উত্তরাধিকার সম্পত্তি বণ্টন বিবরণী ফলাফল
          </h2>
        </div>
        <div className="text-right text-[11px] space-y-0.5 font-mono">
          <div>প্রতিবেদন নং: <span className="text-amber-200 font-bold">{reportId}</span></div>
          <div>তারিখ: <span className="text-white">{todayBn}</span></div>
        </div>
      </div>

      {/* 3. CASE SUMMARY / GENERAL INFO */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
          <div className="font-bold text-gray-900 border-b border-gray-200 pb-1 flex items-center justify-between">
            <span>মৃত ব্যক্তি ও প্রযোজ্য আইন</span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              {religion === 'muslim' ? 'ইসলামিক ফারায়েজ' : 'হিন্দু দায়ভাগ আইন'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">মৃত ব্যক্তির তথ্য:</span>
            <span className="font-bold text-gray-800">{deceasedGenderText}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">আইন ও বিধান:</span>
            <span className="font-semibold text-gray-800">
              {religion === 'muslim'
                ? 'হানাফি ফিকহ ও মুসলিম পারিবারিক আইন ১৯৬১'
                : 'হিন্দু দায়ভাগ আইন ও ১৯৩৭ সালের আইন'}
            </span>
          </div>
        </div>

        {/* Assets Summary */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
          <div className="font-bold text-gray-900 border-b border-gray-200 pb-1">
            বণ্টনযোগ্য মোট সম্পত্তি
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">মোট জমি:</span>
            <span className="font-bold text-emerald-800 font-mono">
              {toBengaliNumerals(assets.landAmount)}{' '}
              {assets.landUnit === 'acre' ? 'একর' : 'শতাংশ'}
            </span>
          </div>
          {assets.cashBDT > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">নগদ টাকা:</span>
              <span className="font-bold text-gray-900 font-mono">
                ৳ {toBengaliNumerals(assets.cashBDT.toLocaleString('en-IN'))}
              </span>
            </div>
          )}
          {assets.goldVori > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">স্বর্ণ:</span>
              <span className="font-bold text-gray-900 font-mono">
                {toBengaliNumerals(assets.goldVori)} ভরি
              </span>
            </div>
          )}
          {assets.silverVori > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">রৌপ্য:</span>
              <span className="font-bold text-gray-900 font-mono">
                {toBengaliNumerals(assets.silverVori)} ভরি
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 4. HEIRS DISTRIBUTION TABLE */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0A2540] inline-block"></span>
          <span>ওয়ারিশগণের মধ্যে সম্পত্তির চূড়ান্ত বণ্টন তালিকা</span>
        </h3>

        <div className="border border-gray-300 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0A2540] text-white text-[11px] font-bold">
                <th className="py-2 px-2 border-r border-gray-600 text-center w-8">ক্রম</th>
                <th className="py-2 px-2 border-r border-gray-600">ওয়ারিশের পরিচয়</th>
                <th className="py-2 px-2 border-r border-gray-600 text-center w-12">সংখ্যা</th>
                <th className="py-2 px-2 border-r border-gray-600">শ্রেণি</th>
                <th className="py-2 px-2 border-r border-gray-600 text-center">ফারায়েজ অংশ</th>
                <th className="py-2 px-2 border-r border-gray-600 text-center">হার (%)</th>
                <th className="py-2 px-2 border-r border-gray-600 text-right">প্রাপ্ত মোট জমি</th>
                <th className="py-2 px-2 text-right">জনপ্রতি জমি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {result.heirResults.map((heir, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}
                >
                  <td className="py-2 px-2 border-r border-gray-200 text-center font-mono font-bold text-gray-600">
                    {toBengaliNumerals(idx + 1)}
                  </td>
                  <td className="py-2 px-2 border-r border-gray-200 font-bold text-gray-900">
                    {heir.relation}
                  </td>
                  <td className="py-2 px-2 border-r border-gray-200 text-center font-mono">
                    {toBengaliNumerals(heir.count)} জন
                  </td>
                  <td className="py-2 px-2 border-r border-gray-200 text-[10px] text-gray-700">
                    {heir.category}
                  </td>
                  <td className="py-2 px-2 border-r border-gray-200 text-center font-mono font-bold text-[#0A2540]">
                    {heir.shareFraction}
                  </td>
                  <td className="py-2 px-2 border-r border-gray-200 text-center font-mono font-bold text-emerald-700">
                    {toBengaliNumerals(heir.sharePercent.toFixed(2))}%
                  </td>
                  <td className="py-2 px-2 border-r border-gray-200 text-right font-mono font-bold text-gray-900">
                    {formatDecimalBn(heir.totalLand)} শতক
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-gray-800">
                    {formatDecimalBn(heir.perPersonLand)} শতক
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
                <td colSpan={5} className="py-2 px-3 text-right">
                  সর্বমোট বণ্টন:
                </td>
                <td className="py-2 px-2 text-center font-mono text-emerald-800">
                  {toBengaliNumerals(result.totalDistributedPercent.toFixed(1))}%
                </td>
                <td className="py-2 px-2 text-right font-mono text-emerald-800">
                  {formatDecimalBn(assets.landAmount)} শতক
                </td>
                <td className="py-2 px-2 text-right text-gray-500 text-[10px]">
                  সম্পূর্ণ বণ্টিত
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 5. ADDITIONAL ASSETS BREAKDOWN (Cash/Gold/Silver if any) */}
      {(assets.cashBDT > 0 || assets.goldVori > 0 || assets.silverVori > 0) && (
        <div className="mb-4 p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs">
          <h4 className="font-bold text-amber-950 mb-1.5">
            নগদ অর্থ ও অলংকার বণ্টন বিবরণ:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {result.heirResults.map((heir, i) => (
              <div key={i} className="flex justify-between py-0.5 border-b border-amber-100">
                <span className="font-semibold text-gray-800">{heir.relation} ({toBengaliNumerals(heir.count)} জন):</span>
                <span className="font-mono text-gray-900">
                  {assets.cashBDT > 0 && `৳${toBengaliNumerals(Math.round(heir.totalCash).toLocaleString('en-IN'))} `}
                  {assets.goldVori > 0 && `| স্বর্ণ: ${formatDecimalBn(heir.totalGold)} ভরি `}
                  {assets.silverVori > 0 && `| রৌপ্য: ${formatDecimalBn(heir.totalSilver)} ভরি`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. EXCLUDED HEIRS LIST (IF ANY) */}
      {result.excludedHeirs.length > 0 && (
        <div className="mb-4 p-2.5 bg-red-50/70 border border-red-200 rounded-xl text-xs">
          <div className="font-bold text-red-900 mb-1">
            আইনানুযায়ী বঞ্চিত ওয়ারিশ (হিজব/মাহজুব):
          </div>
          <p className="text-[11px] text-red-800 leading-relaxed">
            {result.excludedHeirs.join(' • ')}
          </p>
        </div>
      )}

      {/* 7. CALCULATION STEPS / LEGAL BASIS */}
      {result.steps.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs">
          <h4 className="font-bold text-gray-900 mb-1">
            হিসাবের ফিকহি/আইনি পদক্ষেপ ও ব্যাখ্যা:
          </h4>
          <ol className="list-decimal list-inside text-[11px] text-gray-700 space-y-1">
            {result.steps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* 8. LEGAL DISCLAIMER */}
      <div className="mb-6 p-2.5 bg-gray-100 border border-gray-300 rounded-xl text-[10px] text-gray-600 leading-relaxed">
        <strong className="text-gray-800">আইনি সতর্কবার্তা ও ঘোষণা: </strong>
        {result.disclaimer} এটি একটি কম্পিউটারাইজড হিসাব বিবরণী। জমি হস্তান্তর বা রেজিস্ট্রি দলিল নিবন্ধনের পূর্বে মূল খতিয়ান ও বিজ্ঞ আইনজীবীর মতামত গ্রহণ আবশ্যক।
      </div>

      {/* 9. SIGNATURES & VERIFICATION */}
      <div className="pt-6 border-t-2 border-gray-300 flex justify-between items-end text-center text-xs">
        <div className="space-y-1">
          <div className="w-44 border-b border-gray-400 pb-1 text-gray-400 font-mono text-[10px]">
            স্বাক্ষর
          </div>
          <p className="font-bold text-gray-800">যাচাইকারী সার্ভেয়ার</p>
          <p className="text-[10px] text-gray-500">ডিজিটাল ল্যান্ড রেকর্ড শাখা</p>
        </div>

        <div className="p-2 border-2 border-dashed border-gray-300 rounded-lg text-[10px] text-gray-400 w-28 h-16 flex items-center justify-center">
          অফিসিয়াল সিল
        </div>

        <div className="space-y-1">
          <div className="w-44 border-b border-gray-400 pb-1 text-gray-400 font-mono text-[10px]">
            স্বাক্ষর
          </div>
          <p className="font-bold text-gray-800">প্রধান সার্ভেয়ার</p>
          <p className="text-[10px] text-gray-500">আহম্মদ টোটাল স্টেশন ও সল্যুশন সেন্টার</p>
        </div>
      </div>

      {/* 10. FOOTER NOTE */}
      <div className="mt-6 pt-2 border-t border-gray-200 text-center text-[9px] text-gray-400">
        আহম্মদ টোটাল স্টেশন - সার্ভে এন্ড সলুশন সেন্টার • মোবাইল / WhatsApp: +8801873434500 • অনলাইন ফরায়েজ প্রতিবেদন
      </div>
    </div>
  );
};
