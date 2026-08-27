import React, { useState } from 'react';
import { FAQ_DATA } from '../data/hotelData';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Curated Information</span>
        </div>

        <h2 className="font-italiana text-4xl sm:text-6xl font-normal tracking-wide text-violet-950">
          Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Asked</span>
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl italic text-violet-900/80 mt-4 max-w-xl font-light">
          Essential details to help you prepare for your stay at Aurora Grand Hotel.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQ_DATA.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-fuchsia-400 shadow-xl'
                  : 'bg-white/70 border-violet-100 hover:border-violet-300 hover:bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-xs font-mono text-fuchsia-600 font-bold">
                    {item.id.replace('faq-', '0')}
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-bold text-violet-950 uppercase tracking-wider">
                    {item.question}
                  </h3>
                </div>

                <div className={`p-1.5 rounded-full bg-violet-100 text-violet-900 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-fuchsia-100 text-fuchsia-600' : ''
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-violet-100 text-sm text-violet-900/80 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
