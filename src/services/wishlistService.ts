import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Wishlist } from '../types';

export class WishlistService {
  private static readonly COLLECTION_NAME = 'wishlists';

  // Add property to wishlist
  static async addToWishlist(userId: string, propertyId: string): Promise<string> {
    try {
      // Check if already in wishlist
      const existing = await this.isInWishlist(userId, propertyId);
      if (existing) {
        throw new Error('Property is already in your wishlist');
      }

      const wishlistItem: Omit<Wishlist, 'id'> = {
        userId,
        propertyId,
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), wishlistItem);
      return docRef.id;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  // Remove property from wishlist
  static async removeFromWishlist(userId: string, propertyId: string): Promise<void> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        where('propertyId', '==', propertyId)
      );

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = doc(db, this.COLLECTION_NAME, querySnapshot.docs[0].id);
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw new Error('Failed to remove from wishlist');
    }
  }

  // Check if property is in user's wishlist
  static async isInWishlist(userId: string, propertyId: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        where('propertyId', '==', propertyId)
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      return false;
    }
  }

  // Get user's wishlist
  static async getUserWishlist(userId: string): Promise<Wishlist[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Wishlist[];
    } catch (error) {
      console.error('Error getting user wishlist:', error);
      throw new Error('Failed to fetch wishlist');
    }
  }

  // Get wishlist property IDs for a user
  static async getUserWishlistPropertyIds(userId: string): Promise<string[]> {
    try {
      const wishlist = await this.getUserWishlist(userId);
      return wishlist.map(item => item.propertyId);
    } catch (error) {
      console.error('Error getting wishlist property IDs:', error);
      return [];
    }
  }
}