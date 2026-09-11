import React from 'react';
import { Phone } from 'lucide-react';

export const ContactActions: React.FC = () => {
  const phoneNumber = '+8801873434500';
  const displayPhone = '+880 1873434500';
  const whatsappUrl = `https://wa.me/8801873434500?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি আহম্মদ টোটাল স্টেশন থেকে সার্ভে সেবা নিতে আগ্রহী।')}`;

  return (
    <section className="px-4 pt-2 pb-5 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-3">
        {/* WhatsApp Button */}
        <a
          id="btn-whatsapp-contact"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 bg-[#0D5B3A] hover:bg-[#09472C] active:scale-[0.98] text-white py-3 px-3.5 rounded-xl shadow-xs transition-all duration-150 cursor-pointer text-left"
        >
          {/* WhatsApp SVG Icon */}
          <div className="shrink-0 w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold leading-tight tracking-wide">
              WhatsApp
            </div>
            <div className="text-[11px] text-emerald-100 font-medium leading-tight">
              যোগাযোগ করুন
            </div>
          </div>
        </a>

        {/* Call Button */}
        <a
          id="btn-call-contact"
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center gap-2.5 bg-[#F3BA47] hover:bg-[#E5AC36] active:scale-[0.98] text-[#0A2540] py-3 px-3.5 rounded-xl shadow-xs transition-all duration-150 cursor-pointer text-left border border-amber-400/50"
        >
          <div className="shrink-0 w-6 h-6 rounded-full bg-[#0A2540]/10 flex items-center justify-center text-[#0A2540]">
            <Phone size={14} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-bold leading-tight tracking-wide">
              Call
            </div>
            <div className="text-[11px] text-[#0A2540] font-bold leading-tight font-mono">
              {displayPhone}
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};
