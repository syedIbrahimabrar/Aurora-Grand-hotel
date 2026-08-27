import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  currentIndex?: number;
  totalImages?: number;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  currentIndex,
  totalImages,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-fuchsia-400 font-bold">
              Aurora Grand Gallery
            </span>
            {currentIndex !== undefined && totalImages !== undefined && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-fuchsia-300">
                {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} / {totalImages < 10 ? `0${totalImages}` : totalImages}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/10 hover:bg-fuchsia-600 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Main High-Res Image View */}
        <div className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full">
          {/* Previous Button */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-fuchsia-600 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <motion.div
            key={imageUrl}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[78vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src={imageUrl}
              alt={title}
              referrerPolicy="no-referrer"
              className="max-h-[78vh] w-auto object-contain select-none"
            />
          </motion.div>

          {/* Next Button */}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-fuchsia-600 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Title Bar */}
        <div className="text-center z-10 max-w-2xl mx-auto">
          <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
            {title}
          </h3>
          <p className="text-xs text-violet-300 mt-1 font-sans">
            Aurora Grand Hotel &bull; 24 Velyka Vasylkivska St, Kyiv
          </p>
        </div>
      </div>
    </AnimatePresence>
  );
};
