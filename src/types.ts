export interface Room {
  id: string;
  name: string;
  subtitle: string;
  pricePerNight: number;
  maxGuests: number;
  adultsAllowed: number;
  childrenAllowed: number;
  beds: string;
  sizeM2: number;
  view: string;
  floor: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  features: string[];
  amenities: {
    iconName: string;
    label: string;
  }[];
  highlightTag?: string;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  roomsCount: number;
  selectedRoom: Room | null;
  step: 'search' | 'room-select' | 'guest-details' | 'confirmation';
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  arrivalEstimate?: string;
  airportTransfer: boolean;
  champagneOnArrival: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Rooms' | 'Dining' | 'Spa' | 'Architecture' | 'Experiences';
  imageUrl: string;
  caption: string;
  dimensions?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  stayedRoom: string;
  rating: number;
  date: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Reservations' | 'Hotel Services' | 'Dining & Wellness' | 'Policies';
}

export interface AmenityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  imageUrl: string;
  iconName: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  tagline: string;
  description: string;
  chef: string;
  cuisine: string;
  hours: {
    meal: string;
    time: string;
  }[];
  highlights: string[];
  images: string[];
  sampleMenu: {
    category: string;
    items: {
      name: string;
      desc: string;
      price: string;
    }[];
  }[];
}
