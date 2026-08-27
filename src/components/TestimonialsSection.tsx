import React, { useState, useEffect } from 'react';
import { TESTIMONIALS_DATA } from '../data/hotelData';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Editorial Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Guest Chronicles</span>
        </div>

        <h2 className="font-italiana text-4xl sm:text-6xl font-normal tracking-wide text-violet-950">
          Praised by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Discerning</span>
        </h2>
      </div>

      {/* Main Testimonial Stage */}
      <div className="relative rounded-3xl bg-white border border-violet-200/80 p-8 sm:p-12 lg:p-16 shadow-xl overflow-hidden">
        {/* Background Quote Watermark */}
        <Quote className="absolute -top-6 -right-6 w-48 h-48 text-violet-100/60 pointer-events-none rotate-12" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto relative z-10"
          >
            {/* 5 Stars */}
            <div className="flex items-center gap-1.5 text-fuchsia-500">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-fuchsia-500 text-fuchsia-500" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl italic text-violet-950 font-light leading-relaxed">
              “{current.quote}”
            </p>

            {/* Guest Signature */}
            <div className="space-y-1 pt-2">
              <h4 className="font-display text-base font-bold uppercase tracking-wider text-violet-950">
                {current.author}
              </h4>
              <p className="text-xs text-violet-700/80 uppercase tracking-widest font-semibold">
                {current.role} &bull; Stayed in {current.stayedRoom} ({current.date})
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-violet-100 relative z-10">
          <div className="flex items-center gap-2">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-gradient-to-r from-violet-600 to-fuchsia-600' : 'w-2 bg-violet-200 hover:bg-violet-300'
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-full bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-900 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-full bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-900 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
