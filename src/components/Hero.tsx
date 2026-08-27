import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Star, MapPin, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onReserve: () => void;
}

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
    caption: "Timeless Grandeur in Kyiv",
    tagline: "Where European heritage meets contemporary mastery",
  },
  {
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=80",
    caption: "The Presidential Horizon",
    tagline: "Penthouse suites framing uninterrupted city vistas",
  },
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80",
    caption: "Thermal Sky Sanctuary",
    tagline: "Heated hydrotherapy suspended above the skyline",
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
    caption: "Haute Gastronomy",
    tagline: "Michelin-caliber culinary artistry in historic Kyiv",
  },
];

export const Hero: React.FC<HeroProps> = ({ onExplore, onReserve }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload all hero slide images immediately for instant transition without lag
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden pt-32 sm:pt-36 pb-12 sm:pb-16"
    >
      {/* Background Slides with Hardware Accelerated Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center will-change-transform transform-gpu"
            style={{
              backgroundImage: `url(${HERO_SLIDES[currentSlide].image})`,
            }}
          />
        </AnimatePresence>

        {/* Sophisticated Violet & Deep Amethyst Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#130924] via-[#1b0d33]/55 to-[#130924]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#180b2d]/30 to-[#10061e]/85" />
      </div>

      {/* Top 5-Star Luxury Accreditation (Refined Padding & Spacing) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-10 pt-2 sm:pt-4 flex items-center justify-center"
      >
        <div className="inline-flex items-center gap-3.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white/20 backdrop-blur-lg border border-fuchsia-300/40 text-fuchsia-100 text-[11px] sm:text-xs uppercase tracking-[0.26em] font-semibold shadow-[0_6px_30px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-1.5 text-fuchsia-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-fuchsia-400 text-fuchsia-400" />
            ))}
          </div>
          <span className="h-3.5 w-[1px] bg-white/35" />
          <span className="text-white font-bold tracking-[0.24em]">Historic 5-Star Landmark</span>
        </div>
      </motion.div>

      {/* Center Hero Editorial Content with Airy, Balanced Vertical Rhythm */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 my-auto flex flex-col items-center py-6 sm:py-8">
        {/* Location Subtitle with Generous Margin & Padding */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 sm:gap-6 mb-5 sm:mb-7 mt-2"
        >
          <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-fuchsia-400" />
          <span className="text-xs sm:text-sm font-sans tracking-[0.35em] uppercase text-fuchsia-300 font-bold flex items-center gap-2 px-1">
            <MapPin className="w-4 h-4 text-fuchsia-400" />
            Kyiv &bull; Ukraine
          </span>
          <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-fuchsia-400" />
        </motion.div>

        {/* Main Hotel Name Heading with Exquisite Luxury Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex flex-col items-center justify-center text-center my-3 sm:my-5 drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] select-none"
        >
          <span className="font-italiana text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.16em] sm:tracking-[0.22em] font-normal uppercase text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-fuchsia-100 to-violet-100 block drop-shadow-[0_4px_30px_rgba(217,70,239,0.35)] leading-[1.08] hover:scale-[1.02] transition-transform duration-500">
            Aurora
          </span>
          <span className="font-display text-base sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.42em] sm:tracking-[0.52em] text-white/95 uppercase mt-2 sm:mt-3 block border-t border-b border-fuchsia-300/30 py-1.5 px-6 sm:px-12 backdrop-blur-xs">
            Grand Hotel
          </span>
        </motion.h1>

        {/* Tagline Quote with Comfortable Breathing Room */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="font-serif-luxury text-lg sm:text-2xl md:text-3xl italic text-violet-100 max-w-3xl mt-5 sm:mt-7 mb-2 font-light tracking-wide drop-shadow-md leading-relaxed"
        >
          “Where Luxury Meets the Art of European Hospitality”
        </motion.p>

        {/* Current slide subtitle snippet with Clean Letter-spacing */}
        <motion.p
          key={`caption-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm text-fuchsia-200 tracking-[0.24em] uppercase mt-4 sm:mt-5 font-semibold max-w-2xl"
        >
          {HERO_SLIDES[currentSlide].caption} &bull; {HERO_SLIDES[currentSlide].tagline}
        </motion.p>

        {/* Hero CTA Action Buttons with Spacious Margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-md sm:max-w-none"
        >
          {/* Primary: Reserve Your Stay */}
          <button
            id="hero-reserve-btn"
            onClick={onReserve}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_4px_30px_rgba(217,70,239,0.45)] hover:shadow-[0_6px_35px_rgba(217,70,239,0.65)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Reserve Your Stay</span>
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Secondary: Discover the Hotel */}
          <button
            id="hero-discover-btn"
            onClick={onExplore}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] border border-white/40 hover:border-fuchsia-300 transition-all duration-300 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-fuchsia-300" />
            <span>Discover the Hotel</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Slide Indicators & Scroll Down Cue */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        {/* Slide Dots */}
        <div className="flex items-center gap-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all duration-500 rounded-full cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-gradient-to-r from-violet-400 to-fuchsia-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Center Scroll Indicator */}
        <button
          onClick={onExplore}
          className="flex flex-col items-center text-violet-200 hover:text-fuchsia-300 transition-colors group cursor-pointer"
          aria-label="Scroll to discover"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-1 group-hover:translate-y-0.5 transition-transform">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-fuchsia-400" />
          </motion.div>
        </button>

        {/* Right Feature Highlight */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-violet-200">
          <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
          <span>Guaranteed Best Direct Demo Rates</span>
        </div>
      </div>
    </section>
  );
};
