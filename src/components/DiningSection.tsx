import React, { useState } from 'react';
import { DINING_VENUES } from '../data/hotelData';
import { Sparkles, Clock, Utensils, GlassWater, ChevronRight, Award, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiningSectionProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onOpenLightbox }) => {
  const [activeVenueTab, setActiveVenueTab] = useState<'aurora-restaurant' | 'skyline-lounge'>('aurora-restaurant');
  const [showSampleMenu, setShowSampleMenu] = useState(false);

  const currentVenue = DINING_VENUES.find((v) => v.id === activeVenueTab) || DINING_VENUES[0];
  const primaryImg = currentVenue.images[0] || '';

  return (
    <section id="dining" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Haute Gastronomy &amp; Mixology</span>
        </div>

        <h2 className="font-italiana text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-violet-950">
          Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Artistry</span>
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl italic text-violet-900/80 mt-4 max-w-2xl font-light">
          From Michelin-inspired seasonal tasting menus to twilight cocktails overlooking Kyiv's golden domes.
        </p>

        {/* Venue Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mt-8 p-1.5 rounded-full bg-white/90 border border-violet-200 shadow-md backdrop-blur-md">
          <button
            onClick={() => setActiveVenueTab('aurora-restaurant')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeVenueTab === 'aurora-restaurant'
                ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-500/25'
                : 'text-violet-800 hover:text-violet-950 hover:bg-violet-50'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Aurora Restaurant</span>
          </button>

          <button
            onClick={() => setActiveVenueTab('skyline-lounge')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeVenueTab === 'skyline-lounge'
                ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-500/25'
                : 'text-violet-800 hover:text-violet-950 hover:bg-violet-50'
            }`}
          >
            <GlassWater className="w-3.5 h-3.5" />
            <span>Skyline Lounge</span>
          </button>
        </div>
      </div>

      {/* Main Venue Display Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVenue.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white border border-violet-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Left Column: Venue Image */}
          <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-[480px] bg-violet-950/10">
            <img
              src={primaryImg}
              alt={currentVenue.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
              onClick={() => onOpenLightbox(primaryImg, currentVenue.name)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-fuchsia-300 text-fuchsia-700 text-[10.5px] uppercase font-bold tracking-[0.2em] shadow-md">
                {currentVenue.cuisine}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
              <span className="text-[10px] text-fuchsia-300 uppercase tracking-widest font-bold block mb-1">
                Executive Chef Curated
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider">
                {currentVenue.name}
              </h3>
            </div>
          </div>

          {/* Right Column: Venue Philosophy, Hours, Highlights */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-fuchsia-600 font-bold block mb-1">
                  Atmosphere &amp; Ambience
                </span>
                <h3 className="font-display text-2xl font-bold text-violet-950 uppercase tracking-wider">
                  {currentVenue.name}
                </h3>
                <p className="text-sm text-violet-900/80 leading-relaxed mt-2">
                  {currentVenue.description}
                </p>
              </div>

              {/* Hours */}
              <div className="p-4 rounded-2xl bg-violet-50/80 border border-violet-100 text-xs space-y-2">
                <span className="text-[10px] uppercase font-bold text-violet-600 block">Service Hours</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentVenue.hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between pr-2">
                      <span className="text-violet-800">{h.meal}:</span>
                      <strong className="text-violet-950 font-mono">{h.time}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-violet-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-fuchsia-600" />
                  <span>Signature Selections</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentVenue.highlights.map((dish, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-violet-900">
                      <div className="w-4 h-4 rounded-full bg-fuchsia-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-fuchsia-600 font-bold" />
                      </div>
                      <span className="font-medium">{dish}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Toggle Modal / Button */}
            <div className="pt-6 border-t border-violet-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowSampleMenu(!showSampleMenu)}
                className="px-5 py-2.5 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-950 font-bold text-xs uppercase tracking-[0.16em] transition-all cursor-pointer"
              >
                {showSampleMenu ? 'Hide Tasting Menu' : 'View Sample Tasting Menu'}
              </button>

              <button
                type="button"
                onClick={() => onOpenLightbox(primaryImg, currentVenue.name)}
                className="text-xs text-fuchsia-600 hover:text-violet-950 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <span>Gallery Photo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive Tasting Menu Drawer */}
      <AnimatePresence>
        {showSampleMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 sm:p-8 rounded-3xl bg-white border border-violet-200/80 shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-violet-100">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-fuchsia-600 font-bold block mb-1">
                  Sample Culinary Program
                </span>
                <h4 className="font-display text-xl font-bold text-violet-950 uppercase tracking-wider">
                  {currentVenue.name} &bull; Degustation Menu
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-950 text-xs font-bold font-mono">
                Executive Selection
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentVenue.sampleMenu.map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <h5 className="text-xs uppercase font-bold text-fuchsia-600 tracking-wider border-b border-violet-100 pb-1">
                    {cat.category}
                  </h5>
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="pb-3 border-b border-violet-50">
                      <div className="flex justify-between items-baseline">
                        <h6 className="font-display text-sm font-bold text-violet-950 uppercase">{item.name}</h6>
                        <span className="text-xs font-mono text-fuchsia-600 font-bold">{item.price}</span>
                      </div>
                      <p className="text-xs text-violet-700/80 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
