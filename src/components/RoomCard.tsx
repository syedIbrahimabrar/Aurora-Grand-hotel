import React, { useState } from 'react';
import { Room } from '../types';
import { ChevronLeft, ChevronRight, Maximize2, Users, Bed, Eye, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RoomCardProps {
  room: Room;
  nights: number;
  roomsCount: number;
  onViewDetails: (room: Room) => void;
  onSelectRoom: (room: Room) => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
  isPopular?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  nights,
  roomsCount,
  onViewDetails,
  onSelectRoom,
  onOpenLightbox,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const roomSubtotal = room.pricePerNight * nights * roomsCount;
  const taxAmount = Math.round(roomSubtotal * 0.12);
  const totalStayPrice = roomSubtotal + taxAmount;

  return (
    <div
      id={`room-card-${room.id}`}
      className="group bg-white/95 border border-violet-100 hover:border-fuchsia-400 rounded-3xl overflow-hidden shadow-xl transition-all duration-400 hover:shadow-[0_20px_50px_rgba(76,29,149,0.12)] flex flex-col justify-between"
    >
      {/* Top Image Carousel Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-violet-950/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={room.images[currentImageIndex]}
            alt={`${room.name} photo ${currentImageIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
            onClick={() => onOpenLightbox(room.images[currentImageIndex], `${room.name} - View ${currentImageIndex + 1}`)}
          />
        </AnimatePresence>

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {room.highlightTag ? (
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-fuchsia-300 text-fuchsia-700 text-[10px] uppercase font-bold tracking-[0.2em] shadow-md">
              {room.highlightTag}
            </span>
          ) : <span />}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(room.images[currentImageIndex], room.name);
            }}
            className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-violet-900 hover:text-fuchsia-600 backdrop-blur-md transition-all shadow-md cursor-pointer"
            aria-label="Expand image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            type="button"
            onClick={prevImage}
            className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-violet-900 hover:text-fuchsia-600 backdrop-blur-md transition-all shadow-lg cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-violet-900 hover:text-fuchsia-600 backdrop-blur-md transition-all shadow-lg cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Image Counter & Indicator Dots at Bottom */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
          {/* Counter pill */}
          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono tracking-widest text-white border border-white/15">
            0{currentImageIndex + 1} / 0{room.images.length}
          </span>

          {/* Dots */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {room.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentImageIndex === idx ? 'w-5 bg-fuchsia-400' : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Jump to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content & Details */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div>
          {/* Header & Pricing */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 border-b border-violet-100">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-violet-950 group-hover:text-fuchsia-600 transition-colors">
                {room.name}
              </h3>
              <p className="text-xs text-violet-700/80 font-medium tracking-wider uppercase mt-0.5">
                {room.subtitle}
              </p>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <span className="text-[10px] text-violet-500 uppercase tracking-wider block font-semibold">Starting From</span>
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="font-display text-2xl sm:text-3xl font-bold text-violet-950">
                  €{room.pricePerNight}
                </span>
                <span className="text-xs text-violet-600">/ night</span>
              </div>
            </div>
          </div>

          {/* Key Specs Bar (Guests, Bed, Size, View) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 py-3 px-4 rounded-2xl bg-violet-50/70 border border-violet-100 text-xs text-violet-900 font-medium">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>{room.maxGuests} Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-3.5 h-3.5 text-fuchsia-600" />
              <span className="truncate">{room.beds}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-violet-700">{room.sizeM2} m²</span>
              <span>Spacious</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-fuchsia-600" />
              <span className="truncate">{room.view}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-sm text-violet-900/75 leading-relaxed line-clamp-2">
            {room.shortDescription}
          </p>

          {/* Highlight Features (3-4 bullet points) */}
          <div className="mt-4 space-y-1.5">
            {room.features.slice(0, 4).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-violet-900">
                <div className="w-4 h-4 rounded-full bg-fuchsia-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-fuchsia-600 font-bold" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Stay Estimation & Actions */}
        <div className="pt-4 border-t border-violet-100 space-y-4">
          {/* Dynamic Live Estimation Pill */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-violet-50 border border-violet-200/70 text-xs">
            <span className="text-violet-700 font-medium">
              Estimated for {nights} {nights === 1 ? 'night' : 'nights'} ({roomsCount} {roomsCount === 1 ? 'room' : 'rooms'}):
            </span>
            <span className="font-bold text-violet-950">
              €{totalStayPrice} <span className="text-[10px] text-violet-500 font-normal">(incl. taxes)</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id={`view-details-${room.id}`}
              type="button"
              onClick={() => onViewDetails(room)}
              className="py-3 px-4 rounded-xl bg-violet-50 hover:bg-violet-100 border border-violet-200 text-xs uppercase tracking-[0.16em] font-bold text-violet-900 transition-all hover:scale-[1.02] active:scale-[0.98] text-center cursor-pointer"
            >
              View Room
            </button>

            <button
              id={`select-room-${room.id}`}
              type="button"
              onClick={() => onSelectRoom(room)}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white text-xs uppercase tracking-[0.16em] font-bold transition-all shadow-[0_4px_20px_rgba(217,70,239,0.3)] hover:shadow-[0_6px_25px_rgba(217,70,239,0.5)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Select Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
