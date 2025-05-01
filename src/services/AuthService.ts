import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { UserService } from "./UserService";
import { UserRegistrationData } from "@/types/userTypes";
import { auth } from "@/lib/firebase/clientApp";

export class AuthService {
  //
  private static async setSessionCookie(user: FirebaseUser | null) {
    if (user) {
      const idToken = await user.getIdToken();
      await setCookie("__session", idToken);
    } else {
      await deleteCookie("__session");
    }
  }

  private static checkIfClientSide() {
    if (typeof window === "undefined") {
      throw new Error("This method can only be called on the client side.");
    }
  }

  static isGuest() {
    this.checkIfClientSide();

    return !auth.currentUser;
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

      await this.setSessionCookie(userCredential.user);
    } catch (error) {
      console.error("[AuthService]: Error creating user", error);

      // Rollback: delete Firebase user if DB user creation fails
      if (userCredential?.user) {
        try {
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
      const res = await signInWithEmailAndPassword(auth, email, password);
      await this.setSessionCookie(res.user);
    } catch (error) {
      console.error("[AuthService] Error signing in:", error);
      throw error; // Optionally, rethrow or return a custom error message
    }
  }

  // Get Firebase auth token for API calls to custom backend
  static async getIdToken(): Promise<string> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      return await user.getIdToken();
    } catch (error) {
      console.error("Get token error:", error);
      throw error;
    }
  }

  // Get auth headers for API requests (includes Firebase token)
  static async getAuthHeaders(
    contentType: string = "application/json"
  ): Promise<Record<string, string>> {
    try {
      const token = await this.getIdToken();
      return {
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`
      };
    } catch (error) {
      console.error("Get auth headers error:", error);
      return { "Content-Type": contentType };
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
      await this.setSessionCookie(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  static async getCurrentUserClientSide() {
    this.checkIfClientSide();

    const user = auth.currentUser;
    if (!user) return null;

    // Now calling UserService to get user data
    const data = await UserService.getSelf(await user.getIdToken());
    return data;
  }
}
