import React, { useState, useMemo, useEffect, useRef, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { Room, GalleryItem } from './types';
import { ROOMS_DATA, GALLERY_DATA } from './data/hotelData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { RoomsSection } from './components/RoomsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { DiningSection } from './components/DiningSection';
import { WellnessSection } from './components/WellnessSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Code-split modals for optimal initial page load performance
const RoomModal = lazy(() => import('./components/RoomModal').then(m => ({ default: m.RoomModal })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));
const LightboxModal = lazy(() => import('./components/LightboxModal').then(m => ({ default: m.LightboxModal })));

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize ultra-responsive, lightweight smooth scrolling via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track active section for Floating Navbar
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = ['home', 'experience', 'rooms', 'dining', 'wellness', 'gallery', 'testimonials', 'location'];
    
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Demo default dates: 12 Sep 2026 to 15 Sep 2026 (3 nights demo as in prompt)
  const [checkIn, setCheckIn] = useState<string>('2026-09-12');
  const [checkOut, setCheckOut] = useState<string>('2026-09-15');
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [roomsCount, setRoomsCount] = useState<number>(1);

  // Modals & Active Selections
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(ROOMS_DATA[1]); // Executive Suite default
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // Lightbox State
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    currentIndex?: number;
    totalImages?: number;
    galleryItems?: GalleryItem[];
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  // Calculate nights automatically
  const nights = useMemo(() => {
    try {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffTime = outDate.getTime() - inDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 3;
    }
  }, [checkIn, checkOut]);

  // Handler when Check-in changes: Ensure Check-out is at least 1 day after
  const handleCheckInChange = (newIn: string) => {
    setCheckIn(newIn);
    try {
      const inD = new Date(newIn);
      const outD = new Date(checkOut);
      if (outD <= inD) {
        const nextDay = new Date(inD);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOut(nextDay.toISOString().split('T')[0]);
      }
    } catch {
      // fallback
    }
  };

  const handleCheckOutChange = (newOut: string) => {
    try {
      const inD = new Date(checkIn);
      const outD = new Date(newOut);
      if (outD > inD) {
        setCheckOut(newOut);
      }
    } catch {
      setCheckOut(newOut);
    }
  };

  // Lightbox Handlers
  const openSingleImageLightbox = (imageUrl: string, title: string) => {
    setLightboxData({
      isOpen: true,
      imageUrl,
      title,
    });
  };

  const openGalleryLightbox = (item: GalleryItem, index: number, allItems: GalleryItem[]) => {
    setLightboxData({
      isOpen: true,
      imageUrl: item.imageUrl,
      title: item.title,
      currentIndex: index,
      totalImages: allItems.length,
      galleryItems: allItems,
    });
  };

  const handleLightboxNext = () => {
    if (!lightboxData.galleryItems || lightboxData.currentIndex === undefined) return;
    const nextIdx = (lightboxData.currentIndex + 1) % lightboxData.galleryItems.length;
    const nextItem = lightboxData.galleryItems[nextIdx];
    setLightboxData((prev) => ({
      ...prev,
      imageUrl: nextItem.imageUrl,
      title: nextItem.title,
      currentIndex: nextIdx,
    }));
  };

  const handleLightboxPrev = () => {
    if (!lightboxData.galleryItems || lightboxData.currentIndex === undefined) return;
    const prevIdx = (lightboxData.currentIndex - 1 + lightboxData.galleryItems.length) % lightboxData.galleryItems.length;
    const prevItem = lightboxData.galleryItems[prevIdx];
    setLightboxData((prev) => ({
      ...prev,
      imageUrl: prevItem.imageUrl,
      title: prevItem.title,
      currentIndex: prevIdx,
    }));
  };

  // Scroll actions with Lenis integration
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleSearchAvailability = () => {
    scrollToSection('rooms');
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#faf8fc] text-[#2c1d3b] font-sans antialiased selection:bg-[#d946ef] selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* Hardware-Accelerated Ambient Light Background (Zero Scroll Lag) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(168,85,247,0.12),rgba(255,255,255,0))]" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(217,70,239,0.06),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.06),rgba(255,255,255,0))]" />
      </div>

      {/* 1. Transparent to Glass Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <main className="relative z-10 flex-1">
        {/* 2. Full-Screen Cinematic Hero */}
        <Hero
          onExplore={() => scrollToSection('experience')}
          onReserve={() => setIsBookingModalOpen(true)}
        />

        {/* 3. Hero Overlapping Booking Widget */}
        <BookingWidget
          checkIn={checkIn}
          checkOut={checkOut}
          nights={nights}
          adults={adults}
          childrenCount={childrenCount}
          roomsCount={roomsCount}
          onCheckInChange={handleCheckInChange}
          onCheckOutChange={handleCheckOutChange}
          onAdultsChange={setAdults}
          onChildrenChange={setChildrenCount}
          onRoomsCountChange={setRoomsCount}
          onSearchAvailability={handleSearchAvailability}
        />

        {/* 4. The Hotel Experience Section ("A Different Kind of Stay") */}
        <ExperienceSection />

        {/* 5. Rooms & Suites Section with Editorial Cards & Carousels */}
        <RoomsSection
          nights={nights}
          roomsCount={roomsCount}
          adults={adults}
          onViewDetails={(room) => setSelectedRoomForModal(room)}
          onSelectRoom={handleSelectRoom}
          onOpenLightbox={openSingleImageLightbox}
        />

        {/* 6. Hotel Amenities Showcase */}
        <AmenitiesSection
          onOpenLightbox={openSingleImageLightbox}
        />

        {/* 7. Haute Gastronomy & Mixology (Aurora Restaurant & Skyline Lounge) */}
        <DiningSection
          onOpenLightbox={openSingleImageLightbox}
        />

        {/* 8. Spa & Wellness Sanctuary */}
        <WellnessSection
          onOpenLightbox={openSingleImageLightbox}
        />

        {/* 9. Visual Gallery with Pinned Scroll Dual-Direction Exhibition (Goyard Style) */}
        <GallerySection
          onOpenGalleryLightbox={openGalleryLightbox}
          onExploreRooms={() => scrollToSection('rooms')}
        />

        {/* 10. Guest Chronicles & Testimonials */}
        <TestimonialsSection />

        {/* 11. Prime Kyiv Location & Styled Vector Map */}
        <LocationSection />

        {/* 12. Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* 13. Luxury Crisp Footer with Circular Emblem */}
      <Footer
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Lazy-loaded Dialogs and Modals in Suspense boundary */}
      <Suspense fallback={null}>
        {/* Room Details Modal */}
        {selectedRoomForModal && (
          <RoomModal
            room={selectedRoomForModal}
            nights={nights}
            roomsCount={roomsCount}
            onClose={() => setSelectedRoomForModal(null)}
            onSelectRoom={handleSelectRoom}
            onOpenLightbox={openSingleImageLightbox}
          />
        )}

        {/* 3-Step Interactive Booking Engine */}
        {isBookingModalOpen && (
          <BookingModal
            isOpen={isBookingModalOpen}
            selectedRoom={selectedRoomForBooking}
            checkIn={checkIn}
            checkOut={checkOut}
            nights={nights}
            adults={adults}
            childrenCount={childrenCount}
            roomsCount={roomsCount}
            onClose={() => setIsBookingModalOpen(false)}
            onSelectRoom={(room) => setSelectedRoomForBooking(room)}
            onCheckInChange={handleCheckInChange}
            onCheckOutChange={handleCheckOutChange}
            onAdultsChange={setAdults}
            onChildrenChange={setChildrenCount}
            onRoomsCountChange={setRoomsCount}
          />
        )}

        {/* Fullscreen High-Resolution Lightbox */}
        {lightboxData.isOpen && (
          <LightboxModal
            isOpen={lightboxData.isOpen}
            imageUrl={lightboxData.imageUrl}
            title={lightboxData.title}
            currentIndex={lightboxData.currentIndex}
            totalImages={lightboxData.totalImages}
            onClose={() => setLightboxData((prev) => ({ ...prev, isOpen: false }))}
            onNext={lightboxData.galleryItems ? handleLightboxNext : undefined}
            onPrev={lightboxData.galleryItems ? handleLightboxPrev : undefined}
          />
        )}
      </Suspense>
    </div>
  );
}
