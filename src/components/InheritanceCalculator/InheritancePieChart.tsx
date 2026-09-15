import React from 'react';
import { HeirShareResult } from './types';
import { toBengaliNumerals } from './muslimCalculation';

interface InheritancePieChartProps {
  heirResults: HeirShareResult[];
  religion: 'muslim' | 'hindu';
}

const PALETTE = [
  '#006a4e', // Govt Bangladesh Green
  '#0d9488', // Teal
  '#2563eb', // Blue
  '#d97706', // Amber / Gold
  '#dc2626', // Red
  '#7c3aed', // Purple
  '#059669', // Emerald
  '#4338ca', // Indigo
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#be185d', // Pink
  '#4d7c0f', // Lime green
  '#475569', // Slate
];

export const InheritancePieChart: React.FC<InheritancePieChartProps> = ({
  heirResults,
  religion,
}) => {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Filter valid heirs with share > 0
  const validHeirs = heirResults.filter((h) => h.sharePercent > 0);

  if (validHeirs.length === 0) {
    return null;
  }

  // Pre-calculate cumulative percentages for SVG donut slices
  let cumulative = 0;
  const slices = validHeirs.map((heir, idx) => {
    const startAngle = (cumulative / 100) * 360;
    cumulative += heir.sharePercent;
    const endAngle = (cumulative / 100) * 360;
    const color = PALETTE[idx % PALETTE.length];
    return {
      heir,
      idx,
      startAngle,
      endAngle,
      percent: heir.sharePercent,
      color,
    };
  });

  // Convert polar coordinates to Cartesian for SVG path
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const createDonutPath = (
    centerX: number,
    centerY: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    // If it's a full 360 circle (single heir gets 100%)
    if (endAngle - startAngle >= 359.99) {
      return `M ${centerX} ${centerY - outerRadius}
              A ${outerRadius} ${outerRadius} 0 1 1 ${centerX} ${centerY + outerRadius}
              A ${outerRadius} ${outerRadius} 0 1 1 ${centerX} ${centerY - outerRadius}
              M ${centerX} ${centerY - innerRadius}
              A ${innerRadius} ${innerRadius} 0 1 0 ${centerX} ${centerY + innerRadius}
              A ${innerRadius} ${innerRadius} 0 1 0 ${centerX} ${centerY - innerRadius}
              Z`;
    }

    const startOuter = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const endOuter = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const startInner = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const endInner = polarToCartesian(centerX, centerY, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      startOuter.x,
      startOuter.y,
      'A',
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      1,
      endOuter.x,
      endOuter.y,
      'L',
      startInner.x,
      startInner.y,
      'A',
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      0,
      endInner.x,
      endInner.y,
      'Z',
    ].join(' ');
  };

  const hoveredSlice = hoveredIdx !== null ? slices.find((s) => s.idx === hoveredIdx) : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <h3 className="text-sm font-bold text-gray-900">
            {religion === 'muslim'
              ? 'ওয়ারিশদের ত্যাজ্য সম্পত্তির বণ্টন সচিত্র পাই চার্ট'
              : 'দায়ভাগ ওয়ারিশদের অংশ বণ্টন সচিত্র পাই চার্ট'}
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          শতকরা বণ্টন
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* SVG Donut Chart */}
        <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 240 240" className="w-full h-full transform -rotate-90">
            {slices.map((slice) => {
              const isHovered = hoveredIdx === slice.idx;
              const outerRadius = isHovered ? 108 : 102;
              const innerRadius = 58;
              const pathD = createDonutPath(
                120,
                120,
                innerRadius,
                outerRadius,
                slice.startAngle,
                slice.endAngle
              );

              return (
                <path
                  key={slice.idx}
                  d={pathD}
                  fill={slice.color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    filter: isHovered ? 'drop-shadow(0px 2px 6px rgba(0,0,0,0.25))' : 'none',
                    opacity: hoveredIdx === null || isHovered ? 1 : 0.65,
                  }}
                  onMouseEnter={() => setHoveredIdx(slice.idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center Info in Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            {hoveredSlice ? (
              <>
                <span className="text-[11px] font-bold text-gray-900 truncate max-w-[100px]">
                  {hoveredSlice.heir.relation}
                </span>
                <span className="text-sm font-black font-mono text-emerald-700">
                  {toBengaliNumerals(hoveredSlice.percent.toFixed(2))}%
                </span>
                <span className="text-[10px] text-gray-600 font-mono">
                  {hoveredSlice.heir.shareFraction}
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] uppercase font-bold text-gray-400">সর্বমোট</span>
                <span className="text-base font-black text-gray-800 font-mono">১০০%</span>
                <span className="text-[9px] text-gray-500">সম্পূর্ণ বণ্টিত</span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full">
          <h4 className="text-xs font-bold text-gray-700 mb-2 border-b border-gray-100 pb-1">
            ওয়ারিশ ও প্রাপ্ত অংশের তালিকা (হিস্যা):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {slices.map((slice) => {
              const isHovered = hoveredIdx === slice.idx;
              return (
                <div
                  key={slice.idx}
                  onMouseEnter={() => setHoveredIdx(slice.idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isHovered
                      ? 'bg-emerald-50 border-emerald-300 shadow-2xs'
                      : 'bg-gray-50/70 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: slice.color }}
                    />
                    <div className="truncate">
                      <span className="font-bold text-gray-900 block truncate">
                        {slice.heir.relation}
                      </span>
                      <span className="text-[10px] text-gray-500 block">
                        ({toBengaliNumerals(slice.heir.count)} জন) • {slice.heir.shareFraction}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 font-mono font-bold text-emerald-800">
                    {toBengaliNumerals(slice.percent.toFixed(2))}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
