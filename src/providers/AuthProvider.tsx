"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/userTypes";
import { AuthService } from "@/services/AuthService";

interface AuthContextType {
  user: User | null; // false indicates loading state
  authInitialized: boolean; // true indicates auth state is initialized
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (userData) => {
      try {
        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      } finally {
        setAuthInitialized(true); // Set auth state as initialized after the first check
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
