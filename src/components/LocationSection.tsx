import React, { useState } from 'react';
import { HOTEL_INFO, LOCATION_DATA } from '../data/hotelData';
import { MapPin, Navigation, Compass, Train, Plane, Clock, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const LocationSection: React.FC = () => {
  const [activeLandmark, setActiveLandmark] = useState<number | null>(null);

  return (
    <section id="location" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Prime City Center</span>
        </div>

        <h2 className="font-italiana text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-violet-950">
          In the Heart of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Kyiv</span>
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl italic text-violet-900/80 mt-4 max-w-2xl font-light">
          Situated on prestigious Velyka Vasylkivska street, nestled between historical opera houses, designer boutiques, and verdant botanical gardens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Address & Proximity Points */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-violet-200/80 space-y-4 shadow-xl">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-fuchsia-600 font-bold block mb-1">
                Official Address
              </span>
              <h3 className="font-display text-xl font-bold text-violet-950 uppercase tracking-wider">
                {LOCATION_DATA.address}
              </h3>
              <p className="text-xs text-violet-700/80 mt-0.5">
                {LOCATION_DATA.district} &bull; Postal Code: {HOTEL_INFO.postalCode}
              </p>
            </div>

            <div className="pt-3 border-t border-violet-100 flex items-center justify-between text-xs">
              <span className="text-violet-600 font-medium">GPS Coordinates:</span>
              <span className="font-mono text-violet-950 font-bold">50.4402° N, 30.5186° E</span>
            </div>
          </div>

          {/* Key Proximity Destinations */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-violet-950 px-1">
              Travel Distances &amp; Transit Times:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {LOCATION_DATA.nearbyLandmarks.map((dest, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveLandmark(idx)}
                  onMouseLeave={() => setActiveLandmark(null)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    activeLandmark === idx
                      ? 'bg-white border-fuchsia-400 shadow-md translate-x-1'
                      : 'bg-white/70 border-violet-100 hover:border-violet-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-violet-100 text-fuchsia-600">
                      {dest.name.includes('Airport') ? (
                        <Plane className="w-4 h-4" />
                      ) : dest.name.includes('Station') ? (
                        <Train className="w-4 h-4" />
                      ) : (
                        <Compass className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-violet-950">{dest.name}</p>
                      <p className="text-[10px] text-violet-600">{dest.distance}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-violet-100 text-violet-950 text-[11px] font-bold">
                    {dest.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Styled Map Visual */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/11] w-full rounded-3xl overflow-hidden bg-violet-950 border border-violet-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
            {/* Background Stylized Map Grid Lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="loc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(217,70,239,0.2)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#loc-grid)" />
              {/* Stylized River Dnieper Curve */}
              <path
                d="M 600,0 C 550,150 480,250 520,450"
                fill="none"
                stroke="rgba(192,132,252,0.4)"
                strokeWidth="24"
                strokeLinecap="round"
              />
              {/* Avenue Lines */}
              <path d="M 0,200 L 700,220" stroke="rgba(217,70,239,0.4)" strokeWidth="3" />
              <path d="M 280,0 L 250,500" stroke="rgba(217,70,239,0.4)" strokeWidth="3" />
              <path d="M 100,80 L 500,380" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Top Map Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase font-bold tracking-wider">
                <Navigation className="w-3 h-3 text-fuchsia-400" />
                <span>Kyiv Historic Center Map</span>
              </div>
              <span className="text-[10px] text-fuchsia-300 font-mono">Pechersk District</span>
            </div>

            {/* Central Hotel Pin Marker */}
            <div className="relative z-10 my-auto flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-20 bg-fuchsia-500/30 rounded-full animate-ping pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(217,70,239,0.8)] border-2 border-white">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-fuchsia-400 text-center">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Aurora Grand Hotel</p>
                <p className="text-[9px] text-fuchsia-300">24 Velyka Vasylkivska St</p>
              </div>
            </div>

            {/* Bottom Map Bar */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-violet-200">
              <span>Private Chauffeur &amp; Airport Limousine on Call</span>
              <span className="text-fuchsia-400 font-bold">24/7 Valet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
