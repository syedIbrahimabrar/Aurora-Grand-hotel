import React, { useState, useEffect, useRef } from 'react';
import { HotelLogo } from './HotelLogo';
import { 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  Sparkles, 
  ChevronDown, 
  BedDouble, 
  Utensils, 
  Sparkle, 
  Compass, 
  MapPin, 
  Image as ImageIcon,
  Home as HomeIcon,
  PhoneCall,
  Crown,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown states for Floating Pill Nav
  const [hotelDropdownOpen, setHotelDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  // Mobile accordion submenus
  const [mobileHotelOpen, setMobileHotelOpen] = useState(true);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const hotelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contactTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const isTickingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isTickingRef.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const prevScrollY = lastScrollYRef.current;

          setIsScrolled((prev) => {
            const next = currentScrollY > 40;
            return prev !== next ? next : prev;
          });

          setIsVisible((prev) => {
            let next = true;
            if (currentScrollY > 200 && currentScrollY > prevScrollY && !mobileMenuOpen) {
              next = false;
            }
            return prev !== next ? next : prev;
          });

          lastScrollYRef.current = currentScrollY;
          isTickingRef.current = false;
        });
        isTickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setHotelDropdownOpen(false);
    setContactDropdownOpen(false);

    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseEnterHotel = () => {
    if (hotelTimeoutRef.current) clearTimeout(hotelTimeoutRef.current);
    setHotelDropdownOpen(true);
    setContactDropdownOpen(false);
  };

  const handleMouseLeaveHotel = () => {
    hotelTimeoutRef.current = setTimeout(() => {
      setHotelDropdownOpen(false);
    }, 180);
  };

  const handleMouseEnterContact = () => {
    if (contactTimeoutRef.current) clearTimeout(contactTimeoutRef.current);
    setContactDropdownOpen(true);
    setHotelDropdownOpen(false);
  };

  const handleMouseLeaveContact = () => {
    contactTimeoutRef.current = setTimeout(() => {
      setContactDropdownOpen(false);
    }, 180);
  };

  const hotelItems = [
    { name: 'Rooms & Suites', href: '#rooms', desc: 'Luxury suites & bespoke penthouses', icon: BedDouble, badge: '5-Star' },
    { name: 'Haute Dining', href: '#dining', desc: 'Michelin-caliber culinary experiences', icon: Utensils, badge: 'Michelin' },
    { name: 'Spa & Wellness', href: '#wellness', desc: 'Thermal hydrotherapy & Roman rituals', icon: Sparkle, badge: 'Thermal' },
    { name: 'The Experience', href: '#experience', desc: 'A timeless European sanctuary', icon: Compass, badge: 'Heritage' },
  ];

  const contactItems = [
    { name: 'Location & Map', href: '#location', desc: 'Volodymyrska St, 24, Historic Kyiv', icon: MapPin },
    { name: 'Visual Gallery', href: '#gallery', desc: 'Photographic anthology & architecture', icon: ImageIcon },
    { name: 'Concierge Direct Line', href: `tel:${HOTEL_INFO.phone}`, desc: `Call concierge: ${HOTEL_INFO.phone}`, icon: Phone, isPhone: true },
  ];

  const isHotelActive = ['rooms', 'dining', 'wellness', 'experience'].includes(activeSection);
  const isContactActive = ['location'].includes(activeSection);
  const isGalleryActive = activeSection === 'gallery';
  const isHomeActive = activeSection === 'home' || !activeSection;

  return (
    <>
      {/* Top Floating Glass Header with Floating Island Dock */}
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isScrolled 
            ? 'py-3 sm:py-3.5 bg-white/92 backdrop-blur-xl border-b border-violet-100/90 shadow-[0_10px_35px_rgba(76,29,149,0.08)]' 
            : 'py-4 sm:py-5 bg-transparent border-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* 1. Left Brand Logo Lockup */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 focus:outline-none cursor-pointer group"
            aria-label="Aurora Grand Hotel Home"
          >
            <HotelLogo size="sm" showText={true} variant={isScrolled ? 'violet' : 'light'} />
          </a>

          {/* 2. CENTER: LUXURY FLOATING ISLAND PILL NAVBAR (Inspired by Reference Design) */}
          <nav 
            className="hidden md:flex items-center p-1.5 rounded-full bg-white/98 backdrop-blur-2xl border border-violet-200/90 shadow-[0_12px_45px_rgba(0,0,0,0.28)] relative z-50 transition-all duration-300 hover:shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
            aria-label="Floating Navigation Bar"
          >
            {/* 1. HOME PILL */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 group cursor-pointer ${
                isHomeActive
                  ? 'bg-violet-100/80 text-violet-950 font-bold shadow-xs'
                  : 'text-violet-700/80 hover:text-violet-950 hover:bg-violet-50/70'
              }`}
            >
              <div className="relative">
                <HomeIcon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  isHomeActive ? 'text-fuchsia-600' : 'text-violet-600/80'
                }`} />
                {isHomeActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-fuchsia-600" />
                )}
              </div>
              <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold mt-0.5 leading-none">
                Home
              </span>
            </a>

            {/* 2. HOTEL / DISCOVER PILL (With Dropdown) */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterHotel}
              onMouseLeave={handleMouseLeaveHotel}
            >
              <button
                type="button"
                onClick={() => setHotelDropdownOpen(!hotelDropdownOpen)}
                className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 group cursor-pointer ${
                  isHotelActive || hotelDropdownOpen
                    ? 'bg-violet-100/80 text-violet-950 font-bold shadow-xs'
                    : 'text-violet-700/80 hover:text-violet-950 hover:bg-violet-50/70'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  <Compass className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    isHotelActive ? 'text-fuchsia-600' : 'text-violet-600/80'
                  }`} />
                  <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${hotelDropdownOpen ? 'rotate-180 text-fuchsia-600' : 'text-violet-400'}`} />
                </div>
                <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold mt-0.5 leading-none">
                  Hotel
                </span>
              </button>

              {/* Hotel Dropdown Flyout Card */}
              <AnimatePresence>
                {hotelDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-2.5 rounded-3xl bg-white/98 backdrop-blur-2xl border border-violet-100 shadow-[0_20px_50px_rgba(76,29,149,0.18)] z-50 overflow-hidden"
                  >
                    {/* Header Snippet */}
                    <div className="flex items-center justify-between px-3 pt-2 pb-1.5 border-b border-violet-100 mb-1.5">
                      <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-fuchsia-700 font-bold">
                        Kyiv 5-Star Sanctuaries
                      </span>
                      <span className="text-[9px] uppercase font-bold text-violet-500">Est. 1924</span>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-1">
                      {hotelItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-violet-50/90 transition-all group text-left cursor-pointer border border-transparent hover:border-violet-200/60"
                          >
                            <div className="p-2 rounded-xl bg-violet-100/70 border border-violet-200/80 group-hover:border-fuchsia-400 text-violet-700 group-hover:text-fuchsia-600 flex-shrink-0 mt-0.5 transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-bold text-violet-950 group-hover:text-fuchsia-600 tracking-wider uppercase transition-colors">
                                  {item.name}
                                </div>
                                <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-800 font-mono font-bold uppercase">
                                  {item.badge}
                                </span>
                              </div>
                              <div className="text-[11px] text-violet-900/70 truncate mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. CENTER HERO GLOWING CAPSULE (Key Visual from user reference image) */}
            <button
              id="floating-nav-center-action"
              type="button"
              onClick={onOpenBooking}
              className="relative mx-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-[11px] uppercase tracking-[0.16em] shadow-[0_4px_22px_rgba(217,70,239,0.42)] hover:shadow-[0_6px_30px_rgba(217,70,239,0.6)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 flex items-center gap-1.5 cursor-pointer group overflow-hidden"
              title="Book Your Stay at Aurora Grand Hotel"
            >
              {/* Internal subtle light shine */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <Calendar className="w-3.5 h-3.5 text-fuchsia-200 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Book Stay</span>
              <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
            </button>

            {/* 4. GALLERY PILL */}
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, '#gallery')}
              className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 group cursor-pointer ${
                isGalleryActive
                  ? 'bg-violet-100/80 text-violet-950 font-bold shadow-xs'
                  : 'text-violet-700/80 hover:text-violet-950 hover:bg-violet-50/70'
              }`}
            >
              <div className="relative">
                <ImageIcon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  isGalleryActive ? 'text-fuchsia-600' : 'text-violet-600/80'
                }`} />
                {isGalleryActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-fuchsia-600" />
                )}
              </div>
              <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold mt-0.5 leading-none">
                Gallery
              </span>
            </a>

            {/* 5. CONTACT PILL (With Dropdown) */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterContact}
              onMouseLeave={handleMouseLeaveContact}
            >
              <button
                type="button"
                onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 group cursor-pointer ${
                  isContactActive || contactDropdownOpen
                    ? 'bg-violet-100/80 text-violet-950 font-bold shadow-xs'
                    : 'text-violet-700/80 hover:text-violet-950 hover:bg-violet-50/70'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  <PhoneCall className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    isContactActive ? 'text-fuchsia-600' : 'text-violet-600/80'
                  }`} />
                  <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${contactDropdownOpen ? 'rotate-180 text-fuchsia-600' : 'text-violet-400'}`} />
                </div>
                <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold mt-0.5 leading-none">
                  Contact
                </span>
              </button>

              {/* Contact Dropdown Flyout Card */}
              <AnimatePresence>
                {contactDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-2.5 rounded-3xl bg-white/98 backdrop-blur-2xl border border-violet-100 shadow-[0_20px_50px_rgba(76,29,149,0.18)] z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-3 pt-2 pb-1.5 border-b border-violet-100 mb-1.5">
                      <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-fuchsia-700 font-bold">
                        Concierge &amp; Inquiries
                      </span>
                      <span className="text-[9px] uppercase font-bold text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        24/7 Live
                      </span>
                    </div>

                    <div className="space-y-1">
                      {contactItems.map((item) => {
                        const Icon = item.icon;
                        if (item.isPhone) {
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-violet-50/90 transition-all group text-left border border-transparent hover:border-violet-200/60"
                            >
                              <div className="p-2 rounded-xl bg-fuchsia-100/80 border border-fuchsia-200 text-fuchsia-700 group-hover:text-fuchsia-800 flex-shrink-0 mt-0.5 transition-all">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-violet-950 group-hover:text-fuchsia-600 tracking-wider uppercase transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-[11px] font-mono text-fuchsia-700 font-semibold mt-0.5">
                                  {item.desc}
                                </div>
                              </div>
                            </a>
                          );
                        }
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-violet-50/90 transition-all group text-left cursor-pointer border border-transparent hover:border-violet-200/60"
                          >
                            <div className="p-2 rounded-xl bg-violet-100/70 border border-violet-200/80 group-hover:border-fuchsia-400 text-violet-700 group-hover:text-fuchsia-600 flex-shrink-0 mt-0.5 transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-violet-950 group-hover:text-fuchsia-600 tracking-wider uppercase transition-colors">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-violet-900/70 truncate mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* 3. RIGHT ACTION: VIP Direct Contact & Book Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? 'bg-white/95 border border-violet-200/80 text-violet-900 hover:text-fuchsia-600 shadow-xs'
                  : 'bg-black/35 backdrop-blur-xl border border-white/25 text-white hover:bg-black/50 hover:text-fuchsia-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
              }`}
              title="Call Aurora Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>{HOTEL_INFO.phone}</span>
            </a>
          </div>

          {/* 4. MOBILE CONTROLS */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-book-stay-pill"
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-md shadow-fuchsia-500/25 cursor-pointer"
            >
              Book Stay
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl focus:outline-none cursor-pointer transition-all duration-300 ${
                isScrolled
                  ? 'bg-white border border-violet-200 text-violet-900 hover:text-fuchsia-600 shadow-xs'
                  : 'bg-black/35 backdrop-blur-xl border border-white/25 text-white hover:bg-black/50 hover:text-fuchsia-300 shadow-md'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 5. MOBILE FLOATING BOTTOM ISLAND DOCK (Quick Reachable Pill Navigation for Phones) */}
      <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center md:hidden pointer-events-none px-4">
        <nav 
          className="pointer-events-auto flex items-center justify-around p-1.5 rounded-full bg-white/95 backdrop-blur-2xl border border-violet-200/90 shadow-[0_12px_35px_rgba(76,29,149,0.18)] max-w-sm w-full"
          aria-label="Mobile Bottom Floating Bar"
        >
          {/* Home */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-full transition-colors ${
              isHomeActive ? 'text-fuchsia-600 font-bold' : 'text-violet-700'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="text-[9.5px] uppercase tracking-wider font-semibold mt-0.5">Home</span>
          </a>

          {/* Hotel */}
          <a
            href="#rooms"
            onClick={(e) => handleNavClick(e, '#rooms')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-full transition-colors ${
              isHotelActive ? 'text-fuchsia-600 font-bold' : 'text-violet-700'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[9.5px] uppercase tracking-wider font-semibold mt-0.5">Hotel</span>
          </a>

          {/* Center Glowing Action */}
          <button
            onClick={onOpenBooking}
            className="flex flex-col items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold shadow-[0_4px_16px_rgba(217,70,239,0.5)] mx-1"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[8.5px] uppercase tracking-wider font-bold">Reserve</span>
          </button>

          {/* Gallery */}
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, '#gallery')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-full transition-colors ${
              isGalleryActive ? 'text-fuchsia-600 font-bold' : 'text-violet-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="text-[9.5px] uppercase tracking-wider font-semibold mt-0.5">Gallery</span>
          </a>

          {/* Contact */}
          <a
            href="#location"
            onClick={(e) => handleNavClick(e, '#location')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-full transition-colors ${
              isContactActive ? 'text-fuchsia-600 font-bold' : 'text-violet-700'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span className="text-[9.5px] uppercase tracking-wider font-semibold mt-0.5">Contact</span>
          </a>
        </nav>
      </div>

      {/* 6. FULL MOBILE DRAWER ACCORDION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-16 overflow-y-auto"
          >
            {/* Close Button Top Right */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-violet-50 border border-violet-100 text-violet-900 hover:text-fuchsia-600 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Header Logo */}
            <div className="flex justify-center mb-4">
              <HotelLogo size="md" showText={true} />
            </div>

            {/* Mobile Navigation List */}
            <div className="flex flex-col space-y-4 my-auto py-2">
              {/* Home */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="font-display text-lg tracking-[0.2em] text-violet-950 hover:text-fuchsia-600 uppercase text-left py-2 border-b border-violet-100 flex items-center justify-between"
              >
                <span>Home</span>
                <HomeIcon className="w-4 h-4 text-fuchsia-600" />
              </a>

              {/* Hotel Accordion */}
              <div className="border-b border-violet-100 py-2">
                <button
                  type="button"
                  onClick={() => setMobileHotelOpen(!mobileHotelOpen)}
                  className="w-full flex items-center justify-between font-display text-lg tracking-[0.2em] text-violet-950 hover:text-fuchsia-600 uppercase text-left cursor-pointer"
                >
                  <span>Hotel Discoveries</span>
                  <ChevronDown className={`w-4 h-4 text-fuchsia-600 transition-transform ${mobileHotelOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileHotelOpen && (
                  <div className="mt-3 pl-4 space-y-2.5 border-l-2 border-fuchsia-500">
                    {hotelItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="block text-xs uppercase tracking-wider text-violet-800 hover:text-fuchsia-600 py-1 font-semibold"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery */}
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, '#gallery')}
                className="font-display text-lg tracking-[0.2em] text-violet-950 hover:text-fuchsia-600 uppercase text-left py-2 border-b border-violet-100 flex items-center justify-between"
              >
                <span>Grand Gallery</span>
                <ImageIcon className="w-4 h-4 text-fuchsia-600" />
              </a>

              {/* Contact Accordion */}
              <div className="border-b border-violet-100 py-2">
                <button
                  type="button"
                  onClick={() => setMobileContactOpen(!mobileContactOpen)}
                  className="w-full flex items-center justify-between font-display text-lg tracking-[0.2em] text-violet-950 hover:text-fuchsia-600 uppercase text-left cursor-pointer"
                >
                  <span>Concierge &amp; Location</span>
                  <ChevronDown className={`w-4 h-4 text-fuchsia-600 transition-transform ${mobileContactOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileContactOpen && (
                  <div className="mt-3 pl-4 space-y-2.5 border-l-2 border-fuchsia-500">
                    {contactItems.map((item) => {
                      if (item.isPhone) {
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block text-xs uppercase tracking-wider text-fuchsia-600 hover:text-violet-950 py-1 font-bold"
                          >
                            Call Concierge: {HOTEL_INFO.phone}
                          </a>
                        );
                      }
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="block text-xs uppercase tracking-wider text-violet-800 hover:text-fuchsia-600 py-1 font-semibold"
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-violet-100 flex flex-col items-center gap-3">
              <button
                id="mobile-drawer-book-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold text-xs tracking-[0.2em] uppercase shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Stay</span>
              </button>

              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="flex items-center gap-2 text-xs tracking-wider text-violet-800 hover:text-fuchsia-600 font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-fuchsia-600" />
                <span>{HOTEL_INFO.phone}</span>
              </a>

              <p className="text-[10px] text-violet-600/70 tracking-widest uppercase text-center">
                {HOTEL_INFO.address}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
