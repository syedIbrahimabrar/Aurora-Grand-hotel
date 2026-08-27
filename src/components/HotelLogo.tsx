import React from 'react';
import { Crown, Sparkles, Star } from 'lucide-react';

interface HotelLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  variant?: 'violet' | 'light' | 'dark';
}

export const HotelLogo: React.FC<HotelLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'violet',
}) => {
  const sizeMap = {
    sm: { dimension: 38, iconSize: 14, titleClass: 'text-sm', subClass: 'text-[8.5px]' },
    md: { dimension: 48, iconSize: 16, titleClass: 'text-base', subClass: 'text-[9px]' },
    lg: { dimension: 60, iconSize: 20, titleClass: 'text-xl', subClass: 'text-[10px]' },
    xl: { dimension: 76, iconSize: 24, titleClass: 'text-2xl', subClass: 'text-xs' },
    '2xl': { dimension: 96, iconSize: 30, titleClass: 'text-3xl', subClass: 'text-sm' },
  };

  const currentSize = sizeMap[size];
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`} id="hotel-brand-logo">
      {/* 5-Star Luxury Heritage Hotel Crest in Violet & Vibrant Magenta */}
      <div 
        className="relative flex-shrink-0 transition-all duration-300 group-hover:scale-105 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-600 p-[2px] shadow-[0_4px_24px_rgba(147,51,234,0.28)] group-hover:shadow-[0_6px_30px_rgba(217,70,239,0.4)]"
        style={{ width: currentSize.dimension, height: currentSize.dimension }}
      >
        <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center p-1.5 relative overflow-hidden">
          {/* Subtle Ambient Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-100/70 via-fuchsia-50/50 to-white" />

          {/* SVG Heritage Crest: Shield + Crown + Monogram A + Stars */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full relative z-10 drop-shadow-sm text-violet-950"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Subtle Heraldic Filigree Ring */}
            <circle cx="50" cy="50" r="44" stroke="url(#crest-grad)" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
            <circle cx="50" cy="50" r="41" stroke="url(#crest-grad)" strokeWidth="1" opacity="0.8" />

            {/* 5 Stars Arch at Top */}
            <path d="M 28 24 L 29 26 L 31 26 L 29.5 27.5 L 30 29.5 L 28 28.5 L 26 29.5 L 26.5 27.5 L 25 26 L 27 26 Z" fill="#c026d3" />
            <path d="M 38 18 L 39 20 L 41 20 L 39.5 21.5 L 40 23.5 L 38 22.5 L 36 23.5 L 36.5 21.5 L 35 20 L 37 20 Z" fill="#a855f7" />
            <path d="M 50 15 L 51.2 17.5 L 53.8 17.5 L 51.8 19.2 L 52.5 21.8 L 50 20.2 L 47.5 21.8 L 48.2 19.2 L 46.2 17.5 L 48.8 17.5 Z" fill="#db2777" />
            <path d="M 62 18 L 63 20 L 65 20 L 63.5 21.5 L 64 23.5 L 62 22.5 L 60 23.5 L 60.5 21.5 L 59 20 L 61 20 Z" fill="#a855f7" />
            <path d="M 72 24 L 73 26 L 75 26 L 73.5 27.5 L 74 29.5 L 72 28.5 L 70 29.5 L 70.5 27.5 L 69 26 L 71 26 Z" fill="#c026d3" />

            {/* Regal Crown / Coronet */}
            <path
              d="M34 38 L40 43 L50 33 L60 43 L66 38 L63 47 L37 47 Z"
              fill="url(#crown-grad)"
              stroke="#7e22ce"
              strokeWidth="0.8"
            />
            <circle cx="50" cy="31" r="2" fill="#ec4899" />
            <circle cx="34" cy="36" r="1.5" fill="#a855f7" />
            <circle cx="66" cy="36" r="1.5" fill="#a855f7" />

            {/* Monogram A with Classical Serif Stylings */}
            <text
              x="50"
              y="74"
              textAnchor="middle"
              fontFamily="Cinzel, Cormorant Garamond, serif"
              fontWeight="900"
              fontSize="34"
              fill="url(#monogram-grad)"
              letterSpacing="0"
            >
              A
            </text>

            {/* Laurel Leaves on Bottom */}
            <path
              d="M 26 70 C 28 78 38 84 50 85 C 62 84 72 78 74 70 C 68 76 58 80 50 80 C 42 80 32 76 26 70 Z"
              fill="url(#crest-grad)"
              opacity="0.85"
            />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="crest-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
              <linearGradient id="crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="50%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id="monogram-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2e1065" />
                <stop offset="60%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#a21caf" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Side Brand Typography Lockup (High Contrast) */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className={`font-cinzel-decorative font-bold tracking-[0.2em] uppercase ${currentSize.titleClass} leading-none transition-colors ${
              isLight 
                ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] group-hover:text-fuchsia-300' 
                : 'text-violet-950 group-hover:text-fuchsia-600'
            }`}>
              Aurora
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`font-sans ${currentSize.subClass} tracking-[0.28em] uppercase font-bold ${
              isLight 
                ? 'text-fuchsia-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]' 
                : 'text-fuchsia-600'
            }`}>
              Grand Hotel &bull; Kyiv
            </span>
            <div className="hidden sm:flex items-center text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2 h-2 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
