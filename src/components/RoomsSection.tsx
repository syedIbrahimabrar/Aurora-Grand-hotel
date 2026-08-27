import React, { useState } from 'react';
import { Room } from '../types';
import { ROOMS_DATA } from '../data/hotelData';
import { RoomCard } from './RoomCard';
import { Sparkles, Shield, Award } from 'lucide-react';

interface RoomsSectionProps {
  nights: number;
  roomsCount: number;
  adults: number;
  onViewDetails: (room: Room) => void;
  onSelectRoom: (room: Room) => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  nights,
  roomsCount,
  adults,
  onViewDetails,
  onSelectRoom,
  onOpenLightbox,
}) => {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Suites' | 'Penthouse' | 'King'>('All');

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filterCategory === 'Suites') return room.name.includes('Suite') && !room.name.includes('Presidential');
    if (filterCategory === 'Penthouse') return room.name.includes('Presidential');
    if (filterCategory === 'King') return room.name.includes('King');
    return true;
  });

  return (
    <section id="rooms" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-violet-200 text-violet-800 text-[11px] uppercase tracking-[0.25em] font-bold mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Curated Accommodations</span>
        </div>

        <h2 className="font-italiana text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-violet-950">
          Rooms &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Suites</span>
        </h2>

        <p className="font-serif-luxury text-lg sm:text-xl italic text-violet-900/80 mt-4 max-w-2xl font-light">
          Each residence at Aurora Grand Hotel has been meticulously conceived to offer an atmosphere of calm luxury, bespoke Italian craft, and sweeping views of Kyiv.
        </p>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 p-1.5 rounded-full bg-white/90 border border-violet-200/80 shadow-md backdrop-blur-md">
          {(['All', 'Suites', 'King', 'Penthouse'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-500/25'
                  : 'text-violet-800 hover:text-violet-950 hover:bg-violet-50'
              }`}
            >
              {cat === 'All' ? 'All Residences (4)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            nights={nights}
            roomsCount={roomsCount}
            onViewDetails={onViewDetails}
            onSelectRoom={onSelectRoom}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>

      {/* Bottom Direct Guarantee Note */}
      <div className="mt-14 p-6 rounded-2xl bg-white/95 border border-violet-200/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-violet-100 text-violet-700">
            <Award className="w-5 h-5 text-fuchsia-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-violet-950">Direct Reservation Privileges</h4>
            <p className="text-xs text-violet-800/80">Complimentary high-speed airport transit &amp; welcome champagne for all suite bookings.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-fuchsia-600 font-bold tracking-wider uppercase">
          <Shield className="w-4 h-4" />
          <span>Flexible 24h Cancellation</span>
        </div>
      </div>
    </section>
  );
};
