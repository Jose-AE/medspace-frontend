import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { UserService } from "./UserService";
import { User, UserRegistrationData } from "@/types/userTypes";
import { auth } from "@/lib/firebase/firebaseApp";
import { getCookieServer } from "@/lib/getCookieServer";


export class AuthService {
  static USER_COOKIE_NAME = "__current_user";
  static USER_TOKEN_COOKIE_NAME = "__user_token";

  static async setAuthCookies(
    user: User | null = null,
    token: string | null = null
  ) {
    if (user) {
      await setCookie(this.USER_COOKIE_NAME, user);
    } else {
      await deleteCookie(this.USER_COOKIE_NAME);
    }

    if (token) {
      await setCookie(this.USER_TOKEN_COOKIE_NAME, token);
    } else {
      await deleteCookie(this.USER_TOKEN_COOKIE_NAME);
    }
  }

  // Subscribe to auth state changes
  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (fibUser) => {
      if (!fibUser) {
        await this.setAuthCookies(null, null); // Delete session cookie if user is not authenticated
        return callback(null); // No user is signed in
      }

      let userProfile: User | null = null;

      try {
        if (fibUser.metadata.creationTime === fibUser.metadata.lastSignInTime) {
          // User is newly created, wait a bit before fetch profile from API so that it can be created in the database
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        userProfile = await UserService.fetchCurrentUserProfile();
        await this.setAuthCookies(userProfile, await fibUser.getIdToken()); // Set cookies with user profile and token
      } catch (error) {
        console.error(
          "[AuthService]: Error fetching user profile from API",
          error
        );
        await this.signOut();
      }

      callback(userProfile); // Call the original callback
    });
  }

  // Get Firebase auth token for API calls to custom backend
  static async getIdToken(): Promise<string | undefined> {
    try {
      if (typeof window != "undefined") {
        // ClientSide: return the token directly
        const user = auth.currentUser;
        if (!user)
          throw new Error(
            "[ClientSide] Tried to get IdToken with no authenticated user"
          );

        return await user.getIdToken();
      } else {
        // ServerSide: get the token from cookies
        const token = await getCookieServer(this.USER_TOKEN_COOKIE_NAME);
        if (!token)
          throw new Error(
            "[ServerSide] Tried to get IdToken with no authenticated user"
          );
        return token; // Return the token from cookies if available
      }
    } catch (error) {
      console.error("[AuthService] getIdToken error:", error);
      return undefined; // Return null on error
    }
  }

  // Register a new user with email and password
  static async registerUserWithEmailAndPassword(
    email: string,
    password: string,
    userData: UserRegistrationData
  ): Promise<void> {
    let userCredential;

    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await UserService.createUserProfile(userData);

      //// Wait a bit to ensure user is created in the database and cookies are set
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("[AuthService]: Error creating user", error);

      // Rollback: delete Firebase user if DB user creation fails
      if (userCredential?.user) {
        try {
          console.warn("[AuthService]: Rolling back Firebase user creation");
          await userCredential.user.delete();
        } catch (deleteError) {
          console.error(
            "[AuthService]: Failed to rollback Firebase user",
            deleteError
          );
        }
      }

      throw error;
    }
  }

  // Sign in with email and password
  static async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait a bit to ensure user cookies are set
    } catch (error) {
      console.error("[AuthService] Error signing in:", error);
      throw error; // Optionally, rethrow or return a custom error message
    }
  }

  // Get auth headers for API requests (includes Firebase token)
  static async getAuthHeaders(): Promise<Record<string, string>> {
    try {
      const token = await this.getIdToken();
      return {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true', // <-- This is the key
      };
    } catch (error) {
      console.error("Get auth headers error:", error);
      return {}; // Return empty headers on error};
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  }
}
