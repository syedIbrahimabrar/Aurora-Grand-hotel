import React, { useState } from 'react';
import { AMENITIES_DATA } from '../data/hotelData';
import { Waves, Sparkles, Dumbbell, UtensilsCrossed, GlassWater, KeyRound, Car, Wifi, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AmenitiesSectionProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ onOpenLightbox }) => {
  const [selectedAmenityId, setSelectedAmenityId] = useState<string>(AMENITIES_DATA[0].id);

  const activeAmenity = AMENITIES_DATA.find((a) => a.id === selectedAmenityId) || AMENITIES_DATA[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Waves': return <Waves className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      case 'GlassWater': return <GlassWater className="w-5 h-5" />;
      case 'KeyRound': return <KeyRound className="w-5 h-5" />;
      case 'Car': return <Car className="w-5 h-5" />;
      case 'Wifi': return <Wifi className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="amenities" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Curated Privileges</span>
        </div>

        <h2 className="font-italiana text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-violet-950">
          Hotel <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Amenities</span>
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl italic text-violet-900/80 mt-4 max-w-2xl font-light">
          An enclave of bespoke facilities dedicated to restorative wellness, world-class gastronomy, and effortless connection.
        </p>
      </div>

      {/* Interactive Editorial Amenities Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Interactive Nav List */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
          {AMENITIES_DATA.map((amenity) => {
            const isSelected = amenity.id === selectedAmenityId;
            return (
              <button
                key={amenity.id}
                onClick={() => setSelectedAmenityId(amenity.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-white border-fuchsia-400 shadow-[0_10px_30px_rgba(76,29,149,0.12)] translate-x-1 sm:translate-x-2'
                    : 'bg-white/70 border-violet-100 hover:border-violet-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                        : 'bg-violet-100 text-violet-700 group-hover:bg-violet-200'
                    }`}
                  >
                    {getIcon(amenity.iconName)}
                  </div>
                  <div>
                    <h3 className={`font-display text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                      isSelected ? 'text-violet-950' : 'text-violet-900/80 group-hover:text-violet-950'
                    }`}>
                      {amenity.title}
                    </h3>
                    <p className="text-xs text-violet-700/70 line-clamp-1">
                      {amenity.description}
                    </p>
                  </div>
                </div>

                <div className={`w-2 h-2 rounded-full transition-all ${
                  isSelected ? 'bg-fuchsia-600 scale-125' : 'bg-transparent'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Active Amenity Showcase Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAmenity.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-3xl bg-white border border-violet-200/80 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Amenity Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-violet-950/10">
                <img
                  src={activeAmenity.imageUrl}
                  alt={activeAmenity.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
                  onClick={() => onOpenLightbox(activeAmenity.imageUrl, activeAmenity.title)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 right-4">
                  <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-fuchsia-300 text-fuchsia-700 text-[10.5px] uppercase font-bold tracking-[0.2em] shadow-md">
                    Signature Amenity
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6 text-white pointer-events-none">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wider drop-shadow-md">
                    {activeAmenity.title}
                  </h3>
                </div>
              </div>

              {/* Amenity Details */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm sm:text-base text-violet-900/85 leading-relaxed">
                    {activeAmenity.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-violet-100">
                    {activeAmenity.details.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-violet-900 font-medium">
                        <div className="w-4 h-4 rounded-full bg-fuchsia-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-fuchsia-600 font-bold" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-violet-100 flex items-center justify-between text-xs text-violet-600">
                  <span className="font-medium">Complimentary for all resident guests</span>
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(activeAmenity.imageUrl, activeAmenity.title)}
                    className="flex items-center gap-1 text-fuchsia-600 hover:text-violet-950 font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span>View High-Res</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
