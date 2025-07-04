export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  collegeName: string;
  gender: 'male' | 'female';
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  images: string[];
  gender: 'male' | 'female' | 'unisex';
  amenities: {
    building: Amenity[];
    commonArea: Amenity[];
    bedroom: Amenity[];
    washroom: Amenity[];
  };
  description?: string;
  rules?: string[];
  nearbyPlaces?: string[];
  ownerId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Amenity {
  name: string;
  available: boolean;
  icon?: string;
}

export interface Booking {
  id: string;
  userId: string;
  propertyId: string;
  startDate: Date;
  endDate?: Date;
  monthlyRent: number;
  securityDeposit: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  propertyId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
}