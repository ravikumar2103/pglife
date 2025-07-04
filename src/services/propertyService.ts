import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Property } from '../types';

export interface PropertyFilters {
  city?: string;
  gender?: 'male' | 'female' | 'unisex';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export interface PropertySearchOptions {
  filters?: PropertyFilters;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest';
  limit?: number;
  lastDoc?: DocumentSnapshot;
}

export class PropertyService {
  private static readonly COLLECTION_NAME = 'properties';

  // Get all properties with filters and pagination
  static async getProperties(options: PropertySearchOptions = {}): Promise<{
    properties: Property[];
    lastDoc: DocumentSnapshot | null;
    hasMore: boolean;
  }> {
    try {
      let q = query(collection(db, this.COLLECTION_NAME));

      // Apply filters
      if (options.filters) {
        const { city, gender, minPrice, maxPrice, minRating } = options.filters;

        if (city) {
          q = query(q, where('city', '==', city.toLowerCase()));
        }

        if (gender) {
          q = query(q, where('gender', 'in', [gender, 'unisex']));
        }

        if (minPrice !== undefined) {
          q = query(q, where('price', '>=', minPrice));
        }

        if (maxPrice !== undefined) {
          q = query(q, where('price', '<=', maxPrice));
        }

        if (minRating !== undefined) {
          q = query(q, where('rating', '>=', minRating));
        }
      }

      // Apply sorting
      if (options.sortBy) {
        switch (options.sortBy) {
          case 'price-low':
            q = query(q, orderBy('price', 'asc'));
            break;
          case 'price-high':
            q = query(q, orderBy('price', 'desc'));
            break;
          case 'rating':
            q = query(q, orderBy('rating', 'desc'));
            break;
          case 'newest':
            q = query(q, orderBy('createdAt', 'desc'));
            break;
        }
      } else {
        // Default sorting by rating
        q = query(q, orderBy('rating', 'desc'));
      }

      // Apply pagination
      if (options.lastDoc) {
        q = query(q, startAfter(options.lastDoc));
      }

      const limitCount = options.limit || 10;
      q = query(q, limit(limitCount + 1)); // Get one extra to check if there are more

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      
      const hasMore = docs.length > limitCount;
      const properties = docs.slice(0, limitCount).map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];

      const lastDoc = hasMore ? docs[limitCount - 1] : null;

      return { properties, lastDoc, hasMore };
    } catch (error) {
      console.error('Error getting properties:', error);
      throw new Error('Failed to fetch properties');
    }
  }

  // Get properties by city
  static async getPropertiesByCity(city: string): Promise<Property[]> {
    try {
      const { properties } = await this.getProperties({
        filters: { city: city.toLowerCase() },
        limit: 50
      });
      return properties;
    } catch (error) {
      console.error('Error getting properties by city:', error);
      throw new Error('Failed to fetch properties for this city');
    }
  }

  // Get single property by ID
  static async getPropertyById(id: string): Promise<Property | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Property;
      }

      return null;
    } catch (error) {
      console.error('Error getting property by ID:', error);
      throw new Error('Failed to fetch property details');
    }
  }

  // Add new property
  static async addProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date();
      const property: Omit<Property, 'id'> = {
        ...propertyData,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), property);
      return docRef.id;
    } catch (error) {
      console.error('Error adding property:', error);
      throw new Error('Failed to add property');
    }
  }

  // Update property
  static async updateProperty(id: string, updates: Partial<Property>): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating property:', error);
      throw new Error('Failed to update property');
    }
  }

  // Delete property
  static async deleteProperty(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw new Error('Failed to delete property');
    }
  }

  // Search properties by name or address
  static async searchProperties(searchTerm: string): Promise<Property[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation - for production, consider using Algolia or similar
      const { properties } = await this.getProperties({ limit: 100 });
      
      const searchTermLower = searchTerm.toLowerCase();
      return properties.filter(property => 
        property.name.toLowerCase().includes(searchTermLower) ||
        property.address.toLowerCase().includes(searchTermLower) ||
        property.city.toLowerCase().includes(searchTermLower)
      );
    } catch (error) {
      console.error('Error searching properties:', error);
      throw new Error('Failed to search properties');
    }
  }
}