"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { SESSION_TIMEOUT_MS } from "@/lib/session";

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!user) return;

    let timer: NodeJS.Timeout;
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        void signOutUser();
      }, SESSION_TIMEOUT_MS);
    };

    resetTimer();
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [user]);

  return <AuthContext.Provider value={{ user, signIn, signOutUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
