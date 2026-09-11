import React from 'react';

interface AhmedLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AhmedLogo: React.FC<AhmedLogoProps> = ({
  className = '',
  size = 56,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA771C" />
            <stop offset="100%" stopColor="#F5D77F" />
          </linearGradient>

          {/* Deep Navy Gradient */}
          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F2847" />
            <stop offset="100%" stopColor="#07172B" />
          </linearGradient>

          {/* Globe Blue Gradient */}
          <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EBF4FB" />
            <stop offset="50%" stopColor="#9BC2E6" />
            <stop offset="100%" stopColor="#2E619E" />
          </linearGradient>

          {/* Silver Ring Gradient */}
          <linearGradient id="silverRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#DDE4EC" />
            <stop offset="70%" stopColor="#A4B3C6" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Instrument Orange/Gold Accent */}
          <linearGradient id="tsGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7C04A" />
            <stop offset="100%" stopColor="#C98B10" />
          </linearGradient>
        </defs>

        {/* Outer Silver / Rope Ring */}
        <circle cx="120" cy="115" r="100" fill="url(#silverRing)" stroke="#0F2847" strokeWidth="2.5" />
        <circle cx="120" cy="115" r="94" fill="none" stroke="url(#goldGrad)" strokeWidth="3" strokeDasharray="4 2" />
        <circle cx="120" cy="115" r="89" fill="#FFFFFF" stroke="#0F2847" strokeWidth="1.5" />

        {/* Globe on the Right */}
        <g opacity="0.95">
          <circle cx="152" cy="110" r="56" fill="url(#globeGrad)" stroke="#0F2847" strokeWidth="1.5" />
          {/* Latitude & Longitude lines */}
          <ellipse cx="152" cy="110" rx="36" ry="56" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="152" cy="110" rx="18" ry="56" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
          <line x1="96" y1="110" x2="208" y2="110" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
          <line x1="104" y1="90" x2="200" y2="90" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
          <line x1="104" y1="130" x2="200" y2="130" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />

          {/* Continents (Europe, Africa, Asia stylized) */}
          <path
            d="M 145 75 Q 160 70 170 80 Q 185 85 190 95 Q 180 105 165 100 Q 155 105 145 95 Z"
            fill="#0F2847"
            opacity="0.85"
          />
          <path
            d="M 148 105 Q 170 108 175 125 Q 165 145 155 150 Q 142 135 145 118 Z"
            fill="#0F2847"
            opacity="0.85"
          />
          {/* Mini labels on globe */}
          <text x="145" y="88" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">EUROPE</text>
          <text x="160" y="122" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">AFRICA</text>
          <text x="180" y="78" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">ASIA</text>
          <text x="156" y="150" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">ASIA</text>
        </g>

        {/* Compass Rose on Left */}
        <g id="compass-rose">
          {/* Compass dial circle */}
          <circle cx="90" cy="110" r="50" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="90" cy="110" r="46" fill="none" stroke="#0F2847" strokeWidth="0.8" />

          {/* Cardinal Directions Letters */}
          <text x="86" y="72" fill="#0F2847" fontSize="13" fontWeight="900" fontFamily="sans-serif">N</text>
          <text x="135" y="114" fill="#0F2847" fontSize="11" fontWeight="900" fontFamily="sans-serif">E</text>
          <text x="86" y="154" fill="#0F2847" fontSize="12" fontWeight="900" fontFamily="sans-serif">S</text>
          <text x="44" y="114" fill="#0F2847" fontSize="12" fontWeight="900" fontFamily="sans-serif">W</text>

          {/* Compass Star 4-Points */}
          {/* North-South Points */}
          <polygon points="90,60 96,110 90,110" fill="url(#goldGrad)" />
          <polygon points="90,60 84,110 90,110" fill="#0F2847" />
          <polygon points="90,160 96,110 90,110" fill="#0F2847" />
          <polygon points="90,160 84,110 90,110" fill="url(#goldGrad)" />

          {/* East-West Points */}
          <polygon points="140,110 90,104 90,110" fill="url(#goldGrad)" />
          <polygon points="140,110 90,116 90,110" fill="#0F2847" />
          <polygon points="40,110 90,104 90,110" fill="#0F2847" />
          <polygon points="40,110 90,116 90,110" fill="url(#goldGrad)" />

          {/* Corner 4 Minor Points */}
          <polygon points="125,75 90,110 94,106" fill="url(#goldGrad)" opacity="0.9" />
          <polygon points="55,145 90,110 86,114" fill="url(#goldGrad)" opacity="0.9" />
          <polygon points="55,75 90,110 86,106" fill="url(#goldGrad)" opacity="0.9" />
          <polygon points="125,145 90,110 94,114" fill="url(#goldGrad)" opacity="0.9" />
        </g>

        {/* Surveying Total Station & Tripod in Center */}
        <g id="total-station">
          {/* Tripod Legs */}
          {/* Left Leg */}
          <line x1="120" y1="102" x2="90" y2="188" stroke="#0F2847" strokeWidth="6" strokeLinecap="round" />
          <line x1="120" y1="102" x2="90" y2="188" stroke="url(#tsGold)" strokeWidth="2.5" />
          <circle cx="102" cy="148" r="3" fill="#F7C04A" />

          {/* Right Leg */}
          <line x1="120" y1="102" x2="150" y2="188" stroke="#0F2847" strokeWidth="6" strokeLinecap="round" />
          <line x1="120" y1="102" x2="150" y2="188" stroke="url(#tsGold)" strokeWidth="2.5" />
          <circle cx="138" cy="148" r="3" fill="#F7C04A" />

          {/* Center Leg */}
          <line x1="120" y1="102" x2="120" y2="188" stroke="#07172B" strokeWidth="7" strokeLinecap="round" />
          <line x1="120" y1="102" x2="120" y2="188" stroke="#F5D77F" strokeWidth="2" />
          <circle cx="120" cy="150" r="3.5" fill="#D4AF37" />

          {/* Tribrach / Base Plate */}
          <rect x="110" y="98" width="20" height="6" rx="2" fill="url(#goldGrad)" stroke="#0F2847" strokeWidth="1" />
          <rect x="113" y="92" width="14" height="6" rx="1" fill="#0F2847" />

          {/* Main Total Station Body */}
          <rect x="108" y="55" width="24" height="37" rx="4" fill="#0F2847" stroke="url(#goldGrad)" strokeWidth="1.5" />

          {/* Handle on Top */}
          <path d="M 112 55 L 112 44 Q 120 40 128 44 L 128 55" fill="none" stroke="#0F2847" strokeWidth="3" strokeLinecap="round" />
          <path d="M 113 55 L 113 45 Q 120 42 127 45 L 127 55" fill="none" stroke="url(#goldGrad)" strokeWidth="1.2" />

          {/* Objective Lens Barrel (Telescope) */}
          <circle cx="120" cy="62" r="11" fill="url(#goldGrad)" stroke="#0F2847" strokeWidth="1.5" />
          <circle cx="120" cy="62" r="8" fill="#1C3D5A" />
          <circle cx="120" cy="62" r="5" fill="#0A1826" />
          {/* Glass reflection highlight */}
          <path d="M 117 58 Q 120 56 123 58" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

          {/* Digital Screen / Control Panel */}
          <rect x="111" y="74" width="18" height="15" rx="2" fill="#2E619E" stroke="#12304F" strokeWidth="0.8" />
          {/* Buttons/Grid */}
          <rect x="113" y="76" width="14" height="6" fill="#0F2847" />
          <circle cx="114" cy="85" r="1" fill="#F5D77F" />
          <circle cx="117" cy="85" r="1" fill="#F5D77F" />
          <circle cx="120" cy="85" r="1" fill="#F5D77F" />
          <circle cx="123" cy="85" r="1" fill="#F5D77F" />
          <circle cx="126" cy="85" r="1" fill="#F5D77F" />
        </g>

        {/* Navy & Gold Curved Banner at Bottom */}
        <g id="brand-ribbon">
          {/* Ribbon Ends */}
          <path d="M 46 195 L 36 210 L 52 214 L 56 198 Z" fill="#07172B" />
          <path d="M 194 195 L 204 210 L 188 214 L 184 198 Z" fill="#07172B" />

          {/* Main Curved Ribbon Body */}
          <path
            d="M 40 198 Q 120 180 200 198 L 194 220 Q 120 202 46 220 Z"
            fill="url(#navyGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
          />

          {/* Gold Inset Border on Ribbon */}
          <path
            d="M 44 200 Q 120 183 196 200"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="0.8"
          />
          <path
            d="M 49 217 Q 120 200 191 217"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="0.8"
          />

          {/* Bengali Brand Text inside Ribbon */}
          <text
            x="120"
            y="212"
            textAnchor="middle"
            fill="#FBEBB5"
            fontSize="14"
            fontWeight="bold"
            fontFamily="'Hind Siliguri', sans-serif"
            style={{ letterSpacing: '0.5px' }}
          >
            আহম্মদ টোটাল স্টেশন
          </text>
        </g>

        {/* Subtitle curved underneath ribbon */}
        <text
          x="120"
          y="233"
          textAnchor="middle"
          fill="#0F2847"
          fontSize="10"
          fontWeight="bold"
          fontFamily="'Hind Siliguri', sans-serif"
        >
          সার্ভে এন্ড সলুশন সেন্টার
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-[#0F2942] font-bold text-base leading-tight">
            আহম্মদ টোটাল স্টেশন
          </span>
          <span className="text-gray-700 text-xs leading-tight font-medium">
            সার্ভে এন্ড সলুশন সেন্টার
          </span>
          <span className="text-[#AA771C] text-[10px] font-semibold tracking-wider uppercase font-cinzel">
            Ahmed Survey Solution
          </span>
        </div>
      )}
    </div>
  );
};
