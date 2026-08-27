import React, { useState } from 'react';
import { Room, GuestInfo } from '../types';
import { ROOMS_DATA, HOTEL_INFO } from '../data/hotelData';
import { X, Check, Calendar, Users, BedDouble, Shield, Sparkles, Phone, Mail, User, Clock, ArrowRight, Printer, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HotelLogo } from './HotelLogo';

interface BookingModalProps {
  isOpen: boolean;
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  childrenCount: number;
  roomsCount: number;
  onClose: () => void;
  onSelectRoom: (room: Room) => void;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onAdultsChange: (val: number) => void;
  onChildrenChange: (val: number) => void;
  onRoomsCountChange: (val: number) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  selectedRoom,
  checkIn,
  checkOut,
  nights,
  adults,
  childrenCount,
  roomsCount,
  onClose,
  onSelectRoom,
  onCheckInChange,
  onCheckOutChange,
  onAdultsChange,
  onChildrenChange,
  onRoomsCountChange,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [activeRoom, setActiveRoom] = useState<Room>(selectedRoom || ROOMS_DATA[1]);
  const [reservationId, setReservationId] = useState<string>('AGH-2026-48291');

  // Realistic Demo Guest Information
  const [guest, setGuest] = useState<GuestInfo>({
    firstName: 'Alexander',
    lastName: 'Vane',
    email: 'hello@auroragrand.example.com',
    phone: '+380 67 123 4567',
    specialRequests: 'High floor suite with sunset city view. Non-allergenic down pillows.',
    arrivalEstimate: '16:00',
    airportTransfer: true,
    champagneOnArrival: true,
  });

  React.useEffect(() => {
    if (selectedRoom) {
      setActiveRoom(selectedRoom);
    }
  }, [selectedRoom]);

  if (!isOpen) return null;

  // Live Calculations
  const roomPricePerNight = activeRoom.pricePerNight;
  const roomSubtotal = roomPricePerNight * nights * roomsCount;
  const transferFee = guest.airportTransfer ? 45 : 0;
  const champagneFee = guest.champagneOnArrival ? 65 : 0;
  const addOnsTotal = transferFee + champagneFee;
  const taxesAndService = Math.round((roomSubtotal + addOnsTotal) * 0.12);
  const grandTotal = roomSubtotal + addOnsTotal + taxesAndService;

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    setReservationId(`AGH-2026-${randomCode}`);
    setStep(3);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-4xl bg-white border border-violet-200 rounded-3xl overflow-hidden shadow-2xl max-h-[94vh] flex flex-col"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 px-6 border-b border-violet-100 flex items-center justify-between bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <HotelLogo size="sm" showText={false} />
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-violet-950 uppercase tracking-wider">
                {step === 1 && 'Step 1: Your Stay & Room Selection'}
                {step === 2 && 'Step 2: Guest Details & Preferences'}
                {step === 3 && 'Reservation Confirmed'}
              </h2>
              <p className="text-[10px] text-violet-600 uppercase tracking-widest font-semibold">
                Aurora Grand Hotel &bull; Direct Demo Reservation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-950 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
          {/* Step 1: Stay & Suite Selection */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Stay Dates Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-violet-50/80 border border-violet-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-violet-600 block">Check-in</span>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => onCheckInChange(e.target.value)}
                    className="w-full bg-transparent font-bold text-violet-950 focus:outline-none mt-1 cursor-pointer"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-violet-600 block">Check-out</span>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => onCheckOutChange(e.target.value)}
                    className="w-full bg-transparent font-bold text-violet-950 focus:outline-none mt-1 cursor-pointer"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-violet-600 block">Duration</span>
                  <p className="font-bold text-violet-950 mt-1">{nights} {nights === 1 ? 'Night' : 'Nights'}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-violet-600 block">Guests &amp; Rooms</span>
                  <p className="font-bold text-violet-950 mt-1">{adults} Adults, {roomsCount} Room</p>
                </div>
              </div>

              {/* Suite Selection Grid */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-violet-950">
                  Select Accommodations:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ROOMS_DATA.map((room) => {
                    const isSelected = activeRoom.id === room.id;
                    const primaryImg = room.images[0] || '';
                    return (
                      <div
                        key={room.id}
                        onClick={() => {
                          setActiveRoom(room);
                          onSelectRoom(room);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                          isSelected
                            ? 'bg-violet-50 border-fuchsia-500 shadow-md ring-1 ring-fuchsia-500'
                            : 'bg-white border-violet-100 hover:border-violet-300'
                        }`}
                      >
                        <img
                          src={primaryImg}
                          alt={room.name}
                          className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-fuchsia-600 tracking-wider">
                                {room.highlightTag || 'Luxury Suite'}
                              </span>
                              {isSelected && (
                                <span className="p-1 rounded-full bg-fuchsia-600 text-white">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <h4 className="font-display text-sm font-bold text-violet-950 uppercase tracking-wide">
                              {room.name}
                            </h4>
                            <p className="text-[11px] text-violet-700/80 line-clamp-1 mt-0.5">
                              {room.beds} &bull; {room.sizeM2} m²
                            </p>
                          </div>
                          <p className="font-bold text-sm text-violet-950 mt-2">
                            €{room.pricePerNight} <span className="text-[10px] font-normal text-violet-600">/ night</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Guest Details & Add-ons */}
          {step === 2 && (
            <form id="booking-form" onSubmit={handleCompleteBooking} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-violet-700 block mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={guest.firstName}
                    onChange={(e) => setGuest({ ...guest, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-violet-50/50 border border-violet-200 text-violet-950 font-medium text-xs focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-violet-700 block mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={guest.lastName}
                    onChange={(e) => setGuest({ ...guest, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-violet-50/50 border border-violet-200 text-violet-950 font-medium text-xs focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-violet-700 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={guest.email}
                    onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-violet-50/50 border border-violet-200 text-violet-950 font-medium text-xs focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-violet-700 block mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={guest.phone}
                    onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-violet-50/50 border border-violet-200 text-violet-950 font-medium text-xs focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-3 pt-4 border-t border-violet-100">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-violet-950">
                  Curated VIP Enhancements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-violet-50/60 border border-violet-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={guest.airportTransfer}
                        onChange={(e) => setGuest({ ...guest, airportTransfer: e.target.checked })}
                        className="w-4 h-4 accent-fuchsia-600 rounded cursor-pointer"
                      />
                      <div>
                        <p className="text-xs font-bold text-violet-950">Mercedes-Maybach Chauffeur</p>
                        <p className="text-[10px] text-violet-600">Airport meet &amp; greet</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-fuchsia-600 font-mono">+€45</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-violet-50/60 border border-violet-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={guest.champagneOnArrival}
                        onChange={(e) => setGuest({ ...guest, champagneOnArrival: e.target.checked })}
                        className="w-4 h-4 accent-fuchsia-600 rounded cursor-pointer"
                      />
                      <div>
                        <p className="text-xs font-bold text-violet-950">Dom Pérignon on Arrival</p>
                        <p className="text-[10px] text-violet-600">Chilled in-suite with berries</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-fuchsia-600 font-mono">+€65</span>
                  </label>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-xs uppercase font-bold text-violet-700 block mb-1.5">Special Concierge Requests</label>
                <textarea
                  rows={2}
                  value={guest.specialRequests}
                  onChange={(e) => setGuest({ ...guest, specialRequests: e.target.value })}
                  placeholder="Dietary requirements, pillow preference, high floor request..."
                  className="w-full px-4 py-2.5 rounded-xl bg-violet-50/50 border border-violet-200 text-violet-950 font-medium text-xs focus:outline-none focus:border-fuchsia-500"
                />
              </div>
            </form>
          )}

          {/* Step 3: Reservation Confirmation */}
          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-fuchsia-600 font-bold block mb-1">
                  Reservation Confirmed
                </span>
                <h3 className="font-display text-2xl font-bold text-violet-950 uppercase tracking-wider">
                  We Await Your Arrival in Kyiv
                </h3>
                <p className="text-xs text-violet-700 mt-1">
                  Confirmation #{reservationId} has been sent to {guest.email}
                </p>
              </div>

              {/* Voucher Card */}
              <div className="p-6 rounded-2xl bg-violet-50/80 border border-violet-200 text-left max-w-lg mx-auto space-y-4">
                <div className="flex justify-between items-baseline border-b border-violet-200/80 pb-3">
                  <div>
                    <h4 className="font-display text-sm font-bold text-violet-950 uppercase">{activeRoom.name}</h4>
                    <p className="text-[11px] text-violet-600">{formatDate(checkIn)} — {formatDate(checkOut)} ({nights} Nights)</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-violet-950">€{grandTotal}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-violet-800">
                  <p><strong className="text-violet-950">Guest:</strong> {guest.firstName} {guest.lastName}</p>
                  <p><strong className="text-violet-950">Phone:</strong> {guest.phone}</p>
                  <p><strong className="text-violet-950">Check-in:</strong> 15:00</p>
                  <p><strong className="text-violet-950">Status:</strong> Confirmed &bull; Guaranteed</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 px-6 border-t border-violet-100 flex items-center justify-between bg-violet-50/80">
          <div>
            <span className="text-[10px] uppercase font-bold text-violet-600 block">Total Stay Estimate</span>
            <span className="font-display text-xl font-bold text-violet-950">
              €{grandTotal} <span className="text-xs font-normal text-violet-600 font-sans">all inclusive</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-violet-200 text-violet-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="booking-form"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Complete Reservation</span>
                  <Check className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 3 && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-violet-950 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
