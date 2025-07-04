import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  collegeName: string;
  gender: 'male' | 'female';
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  // Sign up new user
  static async signup(data: SignupData): Promise<{ user: FirebaseUser; userData: User }> {
    try {
      console.log('Starting signup process for:', data.email);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      
      const firebaseUser = userCredential.user;
      console.log('Firebase user created:', firebaseUser.uid);
      
      // Update display name
      await updateProfile(firebaseUser, {
        displayName: data.fullName
      });
      console.log('Display name updated');

      // Create user document in Firestore
      const userData: User = {
        id: firebaseUser.uid,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        collegeName: data.collegeName,
        gender: data.gender,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      console.log('User document created in Firestore');

      return { user: firebaseUser, userData };
    } catch (error: any) {
      console.error('Signup error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Login user
  static async login(data: LoginData): Promise<{ user: FirebaseUser; userData: User }> {
    try {
      console.log('Starting login process for:', data.email);
      
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      
      const firebaseUser = userCredential.user;
      console.log('Firebase user logged in:', firebaseUser.uid);
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        console.error('User document not found in Firestore');
        throw new Error('User data not found');
      }

      const userData = userDoc.data() as User;
      console.log('User data retrieved from Firestore');

      return { user: firebaseUser, userData };
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  }

  // Get current user data
  static async getCurrentUserData(): Promise<User | null> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log('No current user found');
        return null;
      }

      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      
      if (!userDoc.exists()) {
        console.log('User document not found in Firestore');
        return null;
      }

      return userDoc.data() as User;
    } catch (error) {
      console.error('Get current user data error:', error);
      return null;
    }
  }

  // Helper method to get user-friendly error messages
  private static getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please use a different email or try logging in.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/configuration-not-found':
        return 'Firebase configuration error. Please contact support.';
      default:
        console.error('Unknown auth error code:', errorCode);
        return 'An error occurred. Please try again.';
    }
  }
}