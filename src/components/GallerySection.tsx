import React, { useState, useRef } from 'react';
import { GALLERY_DATA } from '../data/hotelData';
import { GalleryItem } from '../types';
import { 
  Sparkles, 
  Maximize2, 
  ArrowUpRight, 
  ArrowDown, 
  ArrowUp, 
  Layers, 
  Grid, 
  Compass,
  Play,
  Pause
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  onOpenGalleryLightbox: (item: GalleryItem, index: number, allItems: GalleryItem[]) => void;
  onExploreRooms?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ 
  onOpenGalleryLightbox,
  onExploreRooms 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');
  const [isAutoDrifting, setIsAutoDrifting] = useState<boolean>(false);

  const categories = [
    { id: 'All', label: 'All Plates' },
    { id: 'Rooms', label: 'Suites' },
    { id: 'Dining', label: 'Gastronomy' },
    { id: 'Spa', label: 'Spa' },
    { id: 'Architecture', label: 'Architecture' },
    { id: 'Experiences', label: 'Experiences' },
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  const baseItems = filteredItems.length > 0 ? filteredItems : GALLERY_DATA;

  // Split into left and right stream columns
  const itemsCol1: GalleryItem[] = [];
  const itemsCol2: GalleryItem[] = [];

  baseItems.forEach((item, index) => {
    if (index % 2 === 0) {
      itemsCol1.push(item);
    } else {
      itemsCol2.push(item);
    }
  });

  const col1List = [...itemsCol1, ...itemsCol1];
  const col2List = [...itemsCol2, ...itemsCol2];

  // Ultra-lightweight scroll transform: tracks section entry & exit without sticky height traps
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth counter-parallax within natural bounds (transform-gpu for 60fps)
  const yCol1 = useTransform(scrollYProgress, [0, 1], ['12%', '-35%']);
  const yCol2 = useTransform(scrollYProgress, [0, 1], ['-35%', '12%']);

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-[#fbf8fd] to-white py-16 sm:py-24 overflow-hidden border-b border-violet-100/60"
    >
      {/* Background Subtle Gradient Lighting (Hardware Accelerated, No Lag) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(192,38,211,0.08),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
            <span>Bi-Directional Visual Exhibition</span>
          </div>

          <h2 className="font-italiana text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-violet-950">
            The Grand <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Gallery</span>
          </h2>

          <p className="font-serif-luxury text-base sm:text-xl italic text-violet-900/80 mt-3 max-w-2xl font-light leading-relaxed">
            Experience our counter-scrolling visual anthology — Kyiv heritage ascends on the left as contemporary splendour cascades on the right.
          </p>

          {/* Filter Bar and View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 sm:mt-8">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/95 border border-violet-200 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-sm scale-[1.02]'
                      : 'text-violet-800 hover:text-violet-950 hover:bg-violet-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-full bg-white/95 border border-violet-200 shadow-sm">
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-violet-950 text-white shadow-sm'
                    : 'text-violet-700 hover:text-violet-950'
                }`}
                title="Counter-Scrolling Parallax"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dual Stream</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-violet-950 text-white shadow-sm'
                    : 'text-violet-700 hover:text-violet-950'
                }`}
                title="Grid Showcase"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Curated Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: DUAL STREAM COUNTER-SCROLLING PARALLAX (FLUID & SMOOTH, ZERO LAG) */}
        {viewMode === 'split' && (
          <div className="relative rounded-3xl border border-violet-200/80 bg-white/70 shadow-xl overflow-hidden min-h-[580px] sm:min-h-[680px] lg:min-h-[740px] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            
            {/* Top & Bottom Vignette Masking */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-[540px] sm:h-[620px] lg:h-[680px] items-center relative overflow-hidden">
              
              {/* LEFT STREAM: Ascending upwards on scroll */}
              <div className="hidden lg:block lg:col-span-4 h-full relative overflow-hidden rounded-2xl">
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-violet-200 text-[10.5px] font-bold text-violet-950 shadow-sm backdrop-blur-sm">
                  <ArrowUp className="w-3.5 h-3.5 text-fuchsia-600 animate-bounce" />
                  <span>Ascending Stream</span>
                </div>

                <motion.div 
                  style={{ y: yCol1 }} 
                  className={`space-y-6 pt-10 pb-20 transform-gpu will-change-transform ${isAutoDrifting ? 'animate-glide-up' : ''}`}
                >
                  {col1List.map((item, idx) => (
                    <div
                      key={`left-${item.id}-${idx}`}
                      onClick={() => onOpenGalleryLightbox(item, idx % baseItems.length, baseItems)}
                      className="group relative rounded-2xl overflow-hidden bg-violet-950/5 border border-violet-200 shadow-md hover:shadow-xl hover:border-fuchsia-400 transition-all duration-300 cursor-pointer aspect-[16/11]"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/85 via-black/20 to-transparent opacity-65 group-hover:opacity-90 transition-opacity" />
                      
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-violet-950 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>

                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-fuchsia-300 font-bold block mb-0.5">
                          {item.category} &bull; Plate {idx + 1}
                        </span>
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider line-clamp-1">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* CENTER LUXURY EDITORIAL HUB */}
              <div className="lg:col-span-4 z-30 flex flex-col items-center justify-center p-2 sm:p-4">
                <div className="w-full max-w-sm rounded-3xl bg-white/98 border border-violet-200/90 p-6 sm:p-7 shadow-[0_12px_40px_rgba(76,29,149,0.12)] text-center space-y-4 relative overflow-hidden">
                  {/* Decorative Subtle Accent Top Bar */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[3px] bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />

                  {/* Emblem Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-600 text-white flex items-center justify-center mx-auto shadow-md shadow-purple-500/25">
                    <Compass className="w-6 h-6 animate-pulse" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-fuchsia-600 uppercase tracking-[0.25em] font-bold block mb-1">
                      Kyiv Heritage &bull; Est. 1924
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-violet-950">
                      Visual Sanctuary
                    </h3>
                    <p className="font-serif-luxury text-sm italic text-violet-900/80 mt-1.5 font-light leading-relaxed">
                      Counter-flowing visual perspectives moving in effortless harmony as you scroll.
                    </p>
                  </div>

                  {/* Summary Metric Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-violet-100 text-left text-xs">
                    <div className="p-2.5 rounded-xl bg-violet-50/80 border border-violet-100">
                      <span className="text-[9px] uppercase font-bold text-violet-600 block">Plates</span>
                      <strong className="text-violet-950 font-mono text-sm">{baseItems.length} Photographs</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-violet-50/80 border border-violet-100">
                      <span className="text-[9px] uppercase font-bold text-violet-600 block">Resolution</span>
                      <strong className="text-violet-950 font-mono text-sm">Ultra HD 4K</strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenGalleryLightbox(baseItems[0], 0, baseItems)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-[0.18em] shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Launch Fullscreen Lightbox</span>
                    </button>

                    {onExploreRooms && (
                      <button
                        type="button"
                        onClick={onExploreRooms}
                        className="w-full py-2.5 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Reserve Accommodations</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Visual Parallax Guidance */}
                  <div className="flex items-center justify-center gap-2 text-[10px] text-violet-600 font-semibold pt-1">
                    <ArrowUp className="w-3 h-3 text-fuchsia-600" />
                    <span>Scroll page to animate dual streams</span>
                    <ArrowDown className="w-3 h-3 text-violet-600" />
                  </div>
                </div>
              </div>

              {/* RIGHT STREAM: Descending downwards on scroll */}
              <div className="hidden lg:block lg:col-span-4 h-full relative overflow-hidden rounded-2xl">
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-violet-200 text-[10.5px] font-bold text-violet-950 shadow-sm backdrop-blur-sm">
                  <ArrowDown className="w-3.5 h-3.5 text-violet-700 animate-bounce" />
                  <span>Descending Stream</span>
                </div>

                <motion.div 
                  style={{ y: yCol2 }} 
                  className={`space-y-6 pt-10 pb-20 transform-gpu will-change-transform ${isAutoDrifting ? 'animate-glide-down' : ''}`}
                >
                  {col2List.map((item, idx) => (
                    <div
                      key={`right-${item.id}-${idx}`}
                      onClick={() => onOpenGalleryLightbox(item, (idx * 2 + 1) % baseItems.length, baseItems)}
                      className="group relative rounded-2xl overflow-hidden bg-violet-950/5 border border-violet-200 shadow-md hover:shadow-xl hover:border-fuchsia-400 transition-all duration-300 cursor-pointer aspect-[16/11]"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/85 via-black/20 to-transparent opacity-65 group-hover:opacity-90 transition-opacity" />
                      
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-violet-950 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>

                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-fuchsia-300 font-bold block mb-0.5">
                          {item.category} &bull; Plate {idx + 2}
                        </span>
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider line-clamp-1">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* MOBILE & TABLET RESPONSIVE STREAM */}
              <div className="block lg:hidden col-span-1 w-full space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {baseItems.slice(0, 6).map((item, idx) => (
                    <div
                      key={`mob-${item.id}-${idx}`}
                      onClick={() => onOpenGalleryLightbox(item, idx, baseItems)}
                      className="group relative rounded-2xl overflow-hidden bg-white border border-violet-200 shadow-sm aspect-[4/3] cursor-pointer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/85 via-transparent to-transparent opacity-75" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="text-[8.5px] text-fuchsia-300 uppercase font-bold block">
                          {item.category}
                        </span>
                        <h5 className="text-xs font-bold uppercase tracking-wider line-clamp-1">
                          {item.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: CURATED GRID SHOWCASE */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-violet-200/80 hover:border-fuchsia-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => onOpenGalleryLightbox(item, idx, filteredItems)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-violet-950/5">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-transparent to-black/20 opacity-70 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-fuchsia-300 text-fuchsia-700 text-[10px] uppercase font-bold tracking-widest shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="p-2 rounded-full bg-white/90 text-violet-900 shadow-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-mono text-fuchsia-300 uppercase tracking-widest block mb-0.5">
                        Plate {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} &bull; Kyiv
                      </span>
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white drop-shadow-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-violet-100/90 line-clamp-1 mt-0.5 font-light">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
