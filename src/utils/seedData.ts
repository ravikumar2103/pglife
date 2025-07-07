import { PropertyService } from '../services/propertyService';
import { Property } from '../types';

// Sample property data to seed the database
const sampleProperties: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Mumbai Properties
  {
    name: 'Navkar Paying Guest',
    address: 'Andheri East, Mumbai, Maharashtra 400069',
    city: 'mumbai',
    price: 9500,
    rating: 4.2,
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'male',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: false },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: false }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'A comfortable paying guest accommodation in the heart of Andheri East, perfect for working professionals.',
    ownerId: 'sample-owner-1',
    isActive: true
  },
  {
    name: 'PG for Girls Borivali West',
    address: 'Borivali West, Mumbai, Maharashtra 400092',
    city: 'mumbai',
    price: 8000,
    rating: 4.5,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'female',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Safe and secure accommodation for girls in Borivali West with all modern amenities.',
    ownerId: 'sample-owner-2',
    isActive: true
  },
  // Delhi Properties
  {
    name: 'Delhi Central PG',
    address: 'Connaught Place, New Delhi, Delhi 110001',
    city: 'delhi',
    price: 8500,
    rating: 4.3,
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'unisex',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Premium PG accommodation in the heart of Delhi with excellent connectivity.',
    ownerId: 'sample-owner-3',
    isActive: true
  },
  // Bengaluru Properties
  {
    name: 'Koramangala PG',
    address: 'Koramangala, Bengaluru, Karnataka 560034',
    city: 'bengaluru',
    price: 9000,
    rating: 4.4,
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'female',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Modern PG for girls in the tech hub of Koramangala with all amenities.',
    ownerId: 'sample-owner-4',
    isActive: true
  },
  // Hyderabad Properties
  {
    name: 'Hitech City PG',
    address: 'Hitech City, Hyderabad, Telangana 500081',
    city: 'hyderabad',
    price: 7800,
    rating: 4.2,
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'male',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: false },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: false }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Affordable PG accommodation near IT companies in Hitech City.',
    ownerId: 'sample-owner-5',
    isActive: true
  },
  // Chennai Properties
  {
    name: 'Marina Beach PG',
    address: 'Marina Beach Road, Chennai, Tamil Nadu 600001',
    city: 'chennai',
    price: 8200,
    rating: 4.3,
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'male',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Premium PG accommodation near Marina Beach with excellent connectivity to IT corridors.',
    ownerId: 'sample-owner-11',
    isActive: true
  },
  {
    name: 'T Nagar Ladies PG',
    address: 'T Nagar, Chennai, Tamil Nadu 600017',
    city: 'chennai',
    price: 7500,
    rating: 4.4,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'female',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Safe and secure accommodation for girls in the heart of T Nagar shopping district.',
    ownerId: 'sample-owner-12',
    isActive: true
  },
  {
    name: 'Anna Nagar PG',
    address: 'Anna Nagar, Chennai, Tamil Nadu 600040',
    city: 'chennai',
    price: 9000,
    rating: 4.5,
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'unisex',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Modern PG accommodation in the upscale Anna Nagar area with excellent amenities.',
    ownerId: 'sample-owner-13',
    isActive: true
  },
  {
    name: 'Velachery IT PG',
    address: 'Velachery, Chennai, Tamil Nadu 600042',
    city: 'chennai',
    price: 8800,
    rating: 4.2,
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'male',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Convenient PG accommodation in Velachery, close to major IT companies and OMR.',
    ownerId: 'sample-owner-14',
    isActive: true
  },
  {
    name: 'Adyar Premium PG',
    address: 'Adyar, Chennai, Tamil Nadu 600020',
    city: 'chennai',
    price: 10500,
    rating: 4.6,
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'female',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Luxury PG accommodation for girls in the prestigious Adyar area with top-notch amenities.',
    ownerId: 'sample-owner-15',
    isActive: true
  },
  {
    name: 'Mylapore Heritage PG',
    address: 'Mylapore, Chennai, Tamil Nadu 600004',
    city: 'chennai',
    price: 7800,
    rating: 4.1,
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'unisex',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: false },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: false }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Traditional PG accommodation in the cultural heart of Chennai, near temples and heritage sites.',
    ownerId: 'sample-owner-16',
    isActive: true
  },
  // Vizag Properties
  {
    name: 'Beach View PG',
    address: 'RK Beach Road, Visakhapatnam, Andhra Pradesh 530003',
    city: 'vizag',
    price: 6500,
    rating: 4.1,
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'male',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: false },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: false }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Comfortable PG accommodation with beautiful beach views, perfect for students and professionals.',
    ownerId: 'sample-owner-6',
    isActive: true
  },
  {
    name: 'Coastal Comfort PG',
    address: 'MVP Colony, Visakhapatnam, Andhra Pradesh 530017',
    city: 'vizag',
    price: 7200,
    rating: 4.4,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'female',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Safe and secure accommodation for girls in MVP Colony with modern amenities and excellent connectivity.',
    ownerId: 'sample-owner-7',
    isActive: true
  },
  {
    name: 'Port City PG',
    address: 'Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016',
    city: 'vizag',
    price: 5800,
    rating: 3.9,
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'unisex',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: false },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: false }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Budget-friendly PG accommodation in Dwaraka Nagar, ideal for students and young professionals.',
    ownerId: 'sample-owner-8',
    isActive: true
  },
  {
    name: 'Steel City PG',
    address: 'Gajuwaka, Visakhapatnam, Andhra Pradesh 530026',
    city: 'vizag',
    price: 6800,
    rating: 4.2,
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'male',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Well-maintained PG near industrial areas in Gajuwaka, perfect for working professionals.',
    ownerId: 'sample-owner-9',
    isActive: true
  },
  {
    name: 'Lighthouse PG',
    address: 'Kailasagiri, Visakhapatnam, Andhra Pradesh 530005',
    city: 'vizag',
    price: 7500,
    rating: 4.5,
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    gender: 'female',
    amenities: {
      building: [
        { name: 'Power Backup', available: true },
        { name: 'Fire Extinguisher', available: true },
        { name: 'Lift', available: true },
        { name: 'CCTV', available: true }
      ],
      commonArea: [
        { name: 'WiFi', available: true },
        { name: 'TV', available: true },
        { name: 'Water Purifier', available: true },
        { name: 'Dining', available: true },
        { name: 'Washing Machine', available: true }
      ],
      bedroom: [
        { name: 'Bed with Mattress', available: true }
      ],
      washroom: [
        { name: 'Geyser', available: true }
      ]
    },
    description: 'Premium PG for girls near Kailasagiri with scenic hill views and top-notch amenities.',
    ownerId: 'sample-owner-10',
    isActive: true
  }
];

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Starting database seeding...');
    
    for (const property of sampleProperties) {
      try {
        const propertyId = await PropertyService.addProperty(property);
        console.log(`Added property: ${property.name} with ID: ${propertyId}`);
      } catch (error) {
        console.error(`Failed to add property ${property.name}:`, error);
      }
    }
    
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
};

// Function to check if database needs seeding
export const checkAndSeedDatabase = async (): Promise<void> => {
  try {
    const { properties } = await PropertyService.getProperties({ limit: 1 });
    
    if (properties.length === 0) {
      console.log('Database is empty, seeding with sample data...');
      await seedDatabase();
    } else {
      console.log('Database already has data, skipping seeding.');
    }
  } catch (error) {
    console.error('Error checking database:', error);
  }
};