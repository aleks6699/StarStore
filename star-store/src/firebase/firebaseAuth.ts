import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "./firebaseСonfig";


class AuthService {
  private auth: Auth;
  private googleProvider: GoogleAuthProvider;

  constructor(auth: Auth, googleProvider: GoogleAuthProvider) {
    this.auth = auth;
    this.googleProvider = googleProvider;
  }

  async loginUser(email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async logoutUser(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }

  async registerUser(email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<User> {
    try {
      const result: UserCredential = await signInWithPopup(
        this.auth,
        this.googleProvider
      );
      return result.user;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  }
}

export const authService = new AuthService(auth, googleProvider);