import React, { useState } from 'react';
import { Room } from '../types';
import { X, ChevronLeft, ChevronRight, Check, Users, Maximize2, Sparkles, Shield, Wifi, Coffee, Tv, Wind, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RoomModalProps {
  room: Room | null;
  nights: number;
  roomsCount: number;
  onClose: () => void;
  onSelectRoom: (room: Room) => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  room,
  nights,
  roomsCount,
  onClose,
  onSelectRoom,
  onOpenLightbox,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const roomSubtotal = room.pricePerNight * nights * roomsCount;
  const taxAmount = Math.round(roomSubtotal * 0.12);
  const totalStayPrice = roomSubtotal + taxAmount;
  const images = room.images || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-white border border-violet-200 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="p-4 sm:p-5 px-6 border-b border-violet-100 flex items-center justify-between bg-white/95 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-fuchsia-100 border border-fuchsia-200 text-fuchsia-700 text-[10px] font-bold uppercase tracking-[0.2em]">
                {room.highlightTag || 'Luxury Suite'}
              </span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-violet-950 uppercase tracking-wider">
                {room.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-950 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
            {/* Image Slider & Gallery Grid */}
            <div className="space-y-3">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-violet-950/10 group">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Left/Right Slider Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-violet-950 backdrop-blur-md transition-all shadow-md cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-violet-950 backdrop-blur-md transition-all shadow-md cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Expand Image */}
                <button
                  onClick={() => onOpenLightbox(images[activeImageIndex] || images[0], `${room.name} - View ${activeImageIndex + 1}`)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-violet-950 backdrop-blur-md transition-all shadow-md cursor-pointer flex items-center gap-1 text-xs font-bold"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Fullscreen</span>
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-fuchsia-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-violet-50/80 border border-violet-100 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-violet-600 block">Suite Size</span>
                <p className="font-bold text-violet-950 text-sm mt-0.5">{room.sizeM2} m² / {Math.round(room.sizeM2 * 10.764)} sq ft</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-violet-600 block">Bedding</span>
                <p className="font-bold text-violet-950 text-sm mt-0.5">{room.beds}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-violet-600 block">Occupancy</span>
                <p className="font-bold text-violet-950 text-sm mt-0.5">Up to {room.maxGuests} Guests</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-violet-600 block">View</span>
                <p className="font-bold text-violet-950 text-sm mt-0.5">{room.view}</p>
              </div>
            </div>

            {/* Editorial Room Story */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-violet-950">
                The Suite Narrative
              </h3>
              <p className="text-sm text-violet-900/85 leading-relaxed font-normal">
                {room.fullDescription || room.shortDescription}
              </p>
            </div>

            {/* Features & In-Suite Amenities */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-violet-950">
                Included Privileges &amp; Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-violet-900">
                    <div className="w-4 h-4 rounded-full bg-fuchsia-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-fuchsia-600 font-bold" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Bottom Footer */}
          <div className="p-4 sm:p-5 px-6 border-t border-violet-100 flex items-center justify-between bg-violet-50/80">
            <div>
              <span className="text-[10px] uppercase font-bold text-violet-600 block">Pricing for {nights} Nights</span>
              <span className="font-display text-xl font-bold text-violet-950">
                €{totalStayPrice} <span className="text-xs font-normal text-violet-600 font-sans">(€{room.pricePerNight}/night)</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white border border-violet-200 text-violet-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectRoom(room);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Reserve This Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
