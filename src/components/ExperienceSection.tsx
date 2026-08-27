import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, HeartHandshake, Compass, Award } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Editorial Typography & Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
            <span>The Aurora Philosophy</span>
          </div>

          <h2 className="font-italiana text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-violet-950 leading-[1.12]">
            A Different <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Kind of Stay</span>
          </h2>

          <p className="font-serif-luxury text-xl sm:text-2xl italic text-violet-900/90 font-light leading-relaxed">
            “Aurora Grand Hotel brings together timeless European elegance, contemporary comfort, and thoughtful hospitality in the heart of Kyiv.”
          </p>

          <p className="text-sm sm:text-base text-violet-900/80 leading-relaxed font-normal">
            Rooted on the historic Velyka Vasylkivska avenue, Aurora Grand Hotel is an architectural homage to Kyiv's golden age, reimagined for the modern international traveler. Every detail—from custom olfactory room notes designed in Grasse to our private art collection curated from local Ukrainian ateliers—is crafted to offer an experience of profound quietude and refined prestige.
          </p>

          {/* Three Signature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-violet-100">
            <div className="p-4 rounded-2xl bg-white/80 border border-violet-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-fuchsia-600">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-violet-950 uppercase tracking-wider">Thoughtful Care</h4>
              <p className="text-xs text-violet-800/80">Intuitive, discrete hospitality tailored to your rhythm.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-violet-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-fuchsia-600">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-violet-950 uppercase tracking-wider">Haute Craft</h4>
              <p className="text-xs text-violet-800/80">Italian marble, French linens, and bespoke walnut cabinetry.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-violet-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-fuchsia-600">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-violet-950 uppercase tracking-wider">Prime Heritage</h4>
              <p className="text-xs text-violet-800/80">Moments from the National Opera &amp; Khreshchatyk.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Dual Layered Editorial Photography */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          {/* Main Primary Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-violet-100 group bg-violet-950/10">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85"
              alt="Aurora Grand Hotel Architecture Kyiv"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] text-fuchsia-300 font-bold uppercase tracking-[0.25em] block mb-1">
                Grand Entrance &bull; Kyiv
              </span>
              <p className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                Classical Monumental Facade &bull; Est. 2026
              </p>
            </div>
          </div>

          {/* Floating Offset Secondary Image */}
          <div className="hidden sm:block absolute -bottom-8 -left-8 w-60 aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(76,29,149,0.25)] border-2 border-white bg-white">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=85"
              alt="Lobby Atrium"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-[9px] uppercase font-bold tracking-widest text-white">
                Grand Marble Lobby
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
