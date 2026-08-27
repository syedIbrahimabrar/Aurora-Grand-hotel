import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, BedDouble, Search, ChevronDown, Plus, Minus, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingWidgetProps {
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  childrenCount: number;
  roomsCount: number;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onAdultsChange: (val: number) => void;
  onChildrenChange: (val: number) => void;
  onRoomsCountChange: (val: number) => void;
  onSearchAvailability: () => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  checkIn,
  checkOut,
  nights,
  adults,
  childrenCount,
  roomsCount,
  onCheckInChange,
  onCheckOutChange,
  onAdultsChange,
  onChildrenChange,
  onRoomsCountChange,
  onSearchAvailability,
}) => {
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const [roomsDropdownOpen, setRoomsDropdownOpen] = useState(false);

  return (
    <div id="booking-widget-container" className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 mb-16">
      <div className="bg-white/95 backdrop-blur-xl border border-violet-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_20px_50px_rgba(76,29,149,0.1)] transition-all">
        {/* Top Header Strip with Live Calculation Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-violet-100">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-fuchsia-600 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-violet-900">
              Reserve Your Stay
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-violet-800">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 font-medium">
              <Moon className="w-3.5 h-3.5 text-fuchsia-600" />
              <strong className="text-violet-950 font-bold">{nights} {nights === 1 ? 'Night' : 'Nights'}</strong>
            </span>
            <span className="hidden sm:inline text-violet-300">•</span>
            <span className="hidden sm:inline text-violet-600/80 font-medium">Direct Demo Booking Rate Applied</span>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Check-in Date */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-violet-800 mb-1.5 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-fuchsia-600" />
              Check-In Date
            </label>
            <div className="relative">
              <input
                id="widget-checkin-input"
                type="date"
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                className="w-full bg-violet-50/60 border border-violet-200 focus:border-fuchsia-500 rounded-xl px-3.5 py-3 text-sm text-violet-950 font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-violet-800 mb-1.5 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-fuchsia-600" />
              Check-Out Date
            </label>
            <div className="relative">
              <input
                id="widget-checkout-input"
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => onCheckOutChange(e.target.value)}
                className="w-full bg-violet-50/60 border border-violet-200 focus:border-fuchsia-500 rounded-xl px-3.5 py-3 text-sm text-violet-950 font-semibold focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Popover Dropdown */}
          <div className="relative lg:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-violet-800 mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-fuchsia-600" />
              Guests
            </label>
            <button
              id="widget-guests-toggle-btn"
              type="button"
              onClick={() => {
                setGuestsDropdownOpen(!guestsDropdownOpen);
                setRoomsDropdownOpen(false);
              }}
              className="w-full bg-violet-50/60 border border-violet-200 hover:border-fuchsia-400 rounded-xl px-3.5 py-3 text-sm text-left text-violet-950 font-semibold flex items-center justify-between focus:outline-none transition-all cursor-pointer"
            >
              <span>{adults + childrenCount} {adults + childrenCount === 1 ? 'Guest' : 'Guests'}</span>
              <ChevronDown className="w-4 h-4 text-fuchsia-600" />
            </button>

            {/* Guests Dropdown Panel */}
            <AnimatePresence>
              {guestsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 sm:w-64 top-full mt-2 z-50 bg-white border border-violet-200 rounded-2xl p-4 shadow-2xl space-y-4"
                >
                  {/* Adults Counter */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-violet-950">Adults</p>
                      <p className="text-[10px] text-violet-600">Ages 13 and above</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                        className="w-7 h-7 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-900 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-violet-950">{adults}</span>
                      <button
                        type="button"
                        onClick={() => onAdultsChange(Math.min(6, adults + 1))}
                        disabled={adults >= 6}
                        className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex items-center justify-between pt-3 border-t border-violet-100">
                    <div>
                      <p className="text-xs font-bold text-violet-950">Children</p>
                      <p className="text-[10px] text-violet-600">Ages 0 to 12</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onChildrenChange(Math.max(0, childrenCount - 1))}
                        disabled={childrenCount <= 0}
                        className="w-7 h-7 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-900 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-violet-950">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => onChildrenChange(Math.min(4, childrenCount + 1))}
                        disabled={childrenCount >= 4}
                        className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGuestsDropdownOpen(false)}
                    className="w-full py-1.5 bg-violet-100 hover:bg-violet-200 rounded-lg text-xs font-bold text-violet-900 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rooms Popover Dropdown */}
          <div className="relative lg:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-violet-800 mb-1.5 flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-fuchsia-600" />
              Rooms
            </label>
            <button
              id="widget-rooms-toggle-btn"
              type="button"
              onClick={() => {
                setRoomsDropdownOpen(!roomsDropdownOpen);
                setGuestsDropdownOpen(false);
              }}
              className="w-full bg-violet-50/60 border border-violet-200 hover:border-fuchsia-400 rounded-xl px-3.5 py-3 text-sm text-left text-violet-950 font-semibold flex items-center justify-between focus:outline-none transition-all cursor-pointer"
            >
              <span>{roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}</span>
              <ChevronDown className="w-4 h-4 text-fuchsia-600" />
            </button>

            {/* Rooms Dropdown Panel */}
            <AnimatePresence>
              {roomsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 sm:w-56 top-full mt-2 z-50 bg-white border border-violet-200 rounded-2xl p-4 shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-violet-950">Rooms</p>
                      <p className="text-[10px] text-violet-600">Max 4 per reservation</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onRoomsCountChange(Math.max(1, roomsCount - 1))}
                        disabled={roomsCount <= 1}
                        className="w-7 h-7 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-900 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-violet-950">{roomsCount}</span>
                      <button
                        type="button"
                        onClick={() => onRoomsCountChange(Math.min(4, roomsCount + 1))}
                        disabled={roomsCount >= 4}
                        className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRoomsDropdownOpen(false)}
                    className="w-full py-1.5 bg-violet-100 hover:bg-violet-200 rounded-lg text-xs font-bold text-violet-900 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 sm:col-span-2 mt-2 sm:mt-0">
            <button
              id="widget-check-availability-btn"
              type="button"
              onClick={onSearchAvailability}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_4px_25px_rgba(217,70,239,0.35)] hover:shadow-[0_6px_30px_rgba(217,70,239,0.55)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Check Availability</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
