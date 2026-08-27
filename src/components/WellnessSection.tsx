import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Waves, Flame, Heart, Dumbbell, Droplets, Check, Compass, Maximize2 } from 'lucide-react';

interface WellnessSectionProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

const WELLNESS_FACILITIES = [
  {
    name: "Thermal Infinity Pool",
    desc: "Heated thermal waters hovering 60m above Kyiv with underwater ambient acoustic soundscapes.",
    icon: Waves,
    temp: "31°C",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Finnish Cedar Sauna",
    desc: "Aromatic Finnish dry heat infused with Carpathian mountain birch oils and cold plunge ritual.",
    icon: Flame,
    temp: "90°C",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Aroma Steam Chamber",
    desc: "100% humidity infused with lavender, eucalyptus and ionized Himalayan mineral salts.",
    icon: Droplets,
    temp: "45°C",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Cellular Massage Suites",
    desc: "Bespoke bodywork and facials using Swiss Valmont and Biologique Recherche formulations.",
    icon: Heart,
    temp: "Custom",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Technogym Fitness Studio",
    desc: "Artis-line cardiovascular & strength biomechanics with private Reformer Pilates studios.",
    icon: Dumbbell,
    temp: "24/7 Access",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Hydrotherapy Vitality Pods",
    desc: "Ergonomic pressurized water jets designed to release spinal compression and muscle fatigue.",
    icon: Sparkles,
    temp: "36°C",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=85",
  },
];

export const WellnessSection: React.FC<WellnessSectionProps> = ({ onOpenLightbox }) => {
  return (
    <section id="wellness" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Sanctuary of Equilibrium</span>
        </div>

        <h2 className="font-italiana text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-violet-950">
          Spa &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Wellness</span>
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl italic text-violet-900/80 mt-4 max-w-2xl font-light">
          A multi-level haven dedicated to restorative hydrothermal rituals, cellular regeneration, and quiet reflection above Kyiv.
        </p>
      </div>

      {/* Grid of 6 Wellness Facilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {WELLNESS_FACILITIES.map((facility, idx) => {
          const Icon = facility.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-white border border-violet-200/80 hover:border-fuchsia-400 rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_20px_45px_rgba(76,29,149,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-violet-950/10">
                <img
                  src={facility.image}
                  alt={facility.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                  onClick={() => onOpenLightbox(facility.image, facility.name)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-fuchsia-300 text-fuchsia-700 text-[10px] uppercase font-bold tracking-wider shadow-sm">
                    {facility.temp}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenLightbox(facility.image, facility.name)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/80 hover:bg-white text-violet-900 hover:text-fuchsia-600 backdrop-blur-md transition-all shadow-md cursor-pointer"
                  aria-label="Expand photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                    {facility.name}
                  </h3>
                </div>
              </div>

              {/* Description & Icon */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-violet-900/80 leading-relaxed">
                  {facility.desc}
                </p>

                <div className="pt-3 border-t border-violet-100 flex items-center justify-between text-xs text-violet-600">
                  <div className="flex items-center gap-1.5 font-bold text-violet-900">
                    <Icon className="w-4 h-4 text-fuchsia-600" />
                    <span>Included with Suite</span>
                  </div>
                  <span className="text-[11px] font-bold text-fuchsia-600 uppercase tracking-wider">07:00 – 23:00</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
