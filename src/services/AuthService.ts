import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { UserService } from "./UserService";
import { CreateUserProfileData, User } from "@/types/userTypes";
import { auth } from "@/lib/firebase/firebaseApp";
import { getCookieServer } from "@/lib/getCookieServer";
import { logInfo } from "@/lib/logUtil";

export class AuthService {
  static USER_COOKIE_NAME = "__current_user";
  static USER_TOKEN_COOKIE_NAME = "__user_token";

  static async setAuthCookies(
    user: User | null = null,
    token: string | null = null
  ) {
    logInfo("[AuthService]: Setting auth cookies", {
      hasUser: !!user,
      hasToken: !!token
    });

    if (user) {
      await setCookie(this.USER_COOKIE_NAME, user);
      logInfo("[AuthService]: User cookie set successfully");
    } else {
      await deleteCookie(this.USER_COOKIE_NAME);
      logInfo("[AuthService]: User cookie deleted");
    }

    if (token) {
      await setCookie(this.USER_TOKEN_COOKIE_NAME, token);
      logInfo("[AuthService]: Token cookie set successfully");
    } else {
      await deleteCookie(this.USER_TOKEN_COOKIE_NAME);
      logInfo("[AuthService]: Token cookie deleted");
    }
  }

  // Subscribe to auth state changes
  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    logInfo("[AuthService]: Setting up auth state listener");

    return onAuthStateChanged(auth, async (fibUser) => {
      logInfo("[AuthService]: Auth state changed", {
        hasFirebaseUser: !!fibUser
      });

      if (!fibUser) {
        logInfo(
          "[AuthService]: No Firebase user, clearing cookies and calling callback with null"
        );
        await this.setAuthCookies(null, null); // Delete session cookie if user is not authenticated
        return callback(null); // No user is signed in
      }

      logInfo("[AuthService]: Firebase user found, fetching user profile");
      let userProfile: User | null = null;

      try {
        if (fibUser.metadata.creationTime === fibUser.metadata.lastSignInTime) {
          logInfo(
            "[AuthService]: New user detected, waiting 1 second before profile fetch"
          );
          // User is newly created, wait a bit before fetch profile from API so that it can be created in the database
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        logInfo("[AuthService]: Fetching user profile from API");
        userProfile = await UserService.fetchCurrentUserProfile();
        logInfo("[AuthService]: User profile fetched successfully", {
          userId: userProfile?.id
        });

        const token = await fibUser.getIdToken();
        logInfo("[AuthService]: Firebase token obtained, setting cookies");
        await this.setAuthCookies(userProfile, token); // Set cookies with user profile and token
        logInfo(
          "[AuthService]: Cookies set, calling callback with user profile"
        );
      } catch (error) {
        console.error(
          "[AuthService]: Error fetching user profile from API",
          error
        );
        logInfo("[AuthService]: Error occurred, signing out user");
        await this.signOut();
      }

      callback(userProfile); // Call the original callback
    });
  }

  // Get Firebase auth token for API calls to custom backend
  static async getIdToken(): Promise<string | undefined> {
    logInfo("[AuthService]: Getting ID token");

    try {
      if (typeof window != "undefined") {
        logInfo("[AuthService]: Client-side token retrieval");
        // ClientSide: return the token directly
        const user = auth.currentUser;
        if (!user) {
          logInfo("[AuthService]: No current user on client-side");
          throw new Error(
            "[ClientSide] Tried to get IdToken with no authenticated user"
          );
        }

        logInfo("[AuthService]: Getting token from Firebase user");
        const token = await user.getIdToken();
        logInfo("[AuthService]: Client-side token obtained successfully");
        return token;
      } else {
        logInfo("[AuthService]: Server-side token retrieval");
        // ServerSide: get the token from cookies
        const token = await getCookieServer(this.USER_TOKEN_COOKIE_NAME);
        if (!token) {
          logInfo("[AuthService]: No token found in server-side cookies");
          throw new Error(
            "[ServerSide] Tried to get IdToken with no authenticated user"
          );
        }
        logInfo("[AuthService]: Server-side token obtained from cookies");
        return token; // Return the token from cookies if available
      }
    } catch (error) {
      console.error("[AuthService] getIdToken error:", error);
      logInfo("[AuthService]: Error getting ID token, returning undefined");
      return undefined; // Return null on error
    }
  }

  // Register a new user with email and password
  static async registerUserWithEmailAndPassword(
    password: string,
    userData: CreateUserProfileData
  ): Promise<void> {
    logInfo("[AuthService]: Starting user registration", {
      email: userData.email
    });
    let userCredential;

    try {
      logInfo("[AuthService]: Creating Firebase user");
      userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        password
      );
      logInfo("[AuthService]: Firebase user created successfully");

      logInfo("[AuthService]: Creating user profile in database");
      await UserService.createUserProfile(userData);
      logInfo("[AuthService]: User profile created in database");

      logInfo("[AuthService]: Waiting 1 second for database consistency");
      //// Wait a bit to ensure user is created in the database and cookies are set
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logInfo("[AuthService]: User registration completed successfully");
    } catch (error) {
      console.error("[AuthService]: Error creating user", error);
      logInfo("[AuthService]: Error during registration, attempting rollback");

      // Rollback: delete Firebase user if DB user creation fails
      if (userCredential?.user) {
        try {
          console.warn("[AuthService]: Rolling back Firebase user creation");
          logInfo("[AuthService]: Deleting Firebase user due to error");
          await userCredential.user.delete();
          logInfo("[AuthService]: Firebase user rollback completed");
        } catch (deleteError) {
          console.error(
            "[AuthService]: Failed to rollback Firebase user",
            deleteError
          );
          logInfo("[AuthService]: Failed to rollback Firebase user");
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
    logInfo("[AuthService]: Starting sign in", { email });

    try {
      logInfo("[AuthService]: Calling Firebase signInWithEmailAndPassword");
      await signInWithEmailAndPassword(auth, email, password);
      logInfo(
        "[AuthService]: Firebase sign in successful, waiting for cookies"
      );

      // Check if user is immediately available
      const currentUser = auth.currentUser;
      logInfo("[AuthService]: Checking current user after sign in", {
        hasCurrentUser: !!currentUser,
        userId: currentUser?.uid
      });

      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait a bit to ensure user cookies are set

      // Check again after timeout
      const currentUserAfterWait = auth.currentUser;
      logInfo("[AuthService]: Checking current user after wait", {
        hasCurrentUser: !!currentUserAfterWait,
        userId: currentUserAfterWait?.uid
      });

      logInfo("[AuthService]: Sign in process completed");
    } catch (error) {
      console.error("[AuthService] Error signing in:", error);
      logInfo("[AuthService]: Sign in failed", error);
      throw error; // Optionally, rethrow or return a custom error message
    }
  }

  // Get auth headers for API requests (includes Firebase token)
  static async getAuthHeaders(): Promise<Record<string, string>> {
    logInfo("[AuthService]: Getting auth headers");

    try {
      const token = await this.getIdToken();
      logInfo("[AuthService]: Auth headers created successfully", {
        hasToken: !!token
      });
      return {
        Authorization: `Bearer ${token}`
      };
    } catch (error) {
      console.error("Get auth headers error:", error);
      logInfo("[AuthService]: Error getting auth headers, returning empty");
      return {}; // Return empty headers on error};
    }
  }

  static async signOut() {
    logInfo("[AuthService]: Starting sign out");

    try {
      await signOut(auth);
      logInfo("[AuthService]: Sign out completed successfully");
    } catch (error) {
      console.error("Error signing out", error);
      logInfo("[AuthService]: Error during sign out", error);
    }
  }
}
