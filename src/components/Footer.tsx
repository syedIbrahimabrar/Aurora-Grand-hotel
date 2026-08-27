import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { HotelLogo } from './HotelLogo';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ArrowRight, Check, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Rooms & Suites', href: '#rooms' },
    { name: 'Experience', href: '#experience' },
    { name: 'Dining', href: '#dining' },
    { name: 'Spa & Wellness', href: '#wellness' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <footer className="relative bg-white text-violet-900 border-t border-violet-200/80 pt-20 pb-12 overflow-hidden shadow-2xl">
      {/* Top Gradient Divider Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Row: Brand Emblem, Mission, and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <HotelLogo size="lg" showText={true} />
            <p className="font-serif-luxury text-lg italic text-violet-900/80 max-w-md font-light leading-relaxed">
              “Where European architectural heritage meets modern tranquility in the cultural heart of Kyiv.”
            </p>
          </div>

          {/* Newsletter / VIP Club Box */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-violet-50/70 border border-violet-200/80 space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-fuchsia-600 font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3" /> Private Members Journal
              </span>
              <h4 className="font-display text-lg font-bold text-violet-950 uppercase tracking-wider">
                Receive Curated Kyiv Inquiries &amp; Offers
              </h4>
            </div>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you. Your demo subscription to the Aurora Gazette has been registered.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-violet-200 text-violet-950 placeholder-violet-400 text-xs focus:outline-none focus:border-fuchsia-500 transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-purple-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Row: Links, Direct Contacts, Concierge */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-violet-100 text-xs">
          {/* Column 1: Navigation */}
          <div className="space-y-3">
            <h5 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-violet-950">
              The Property
            </h5>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-violet-800/80 hover:text-fuchsia-600 transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="space-y-3">
            <h5 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-violet-950">
              Direct Contact
            </h5>
            <div className="space-y-2.5 text-violet-800/90 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-fuchsia-600 flex-shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}, Kyiv, Ukraine</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-fuchsia-600 flex-shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-fuchsia-600 flex-shrink-0" />
                <span>{HOTEL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Check-in / Accreditations */}
          <div className="space-y-3">
            <h5 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-violet-950">
              Arrivals &amp; Hours
            </h5>
            <div className="space-y-1.5 text-violet-800/80">
              <p><strong className="text-violet-950">Check-in:</strong> {HOTEL_INFO.checkInTime}</p>
              <p><strong className="text-violet-950">Check-out:</strong> {HOTEL_INFO.checkOutTime}</p>
              <p><strong className="text-violet-950">Concierge Desk:</strong> 24 Hours Multilingual</p>
              <p><strong className="text-violet-950">Rating:</strong> 5-Star Luxury Heritage</p>
            </div>
          </div>

          {/* Column 4: Quick Action Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white space-y-3 shadow-lg shadow-purple-500/20">
            <h5 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Instant Reservations
            </h5>
            <p className="text-[11px] text-violet-100 leading-relaxed font-light">
              Guaranteed best rate, complimentary room upgrade when available, and late checkout.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 rounded-xl bg-white text-violet-950 hover:bg-violet-50 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              Reserve a Suite
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-violet-500">
          <p>© {new Date().getFullYear()} Aurora Grand Hotel Kyiv. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-fuchsia-600 cursor-pointer">Privacy Notice</span>
            <span className="hover:text-fuchsia-600 cursor-pointer">Terms &amp; Conditions</span>
            <span className="hover:text-fuchsia-600 cursor-pointer">Cookies Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
