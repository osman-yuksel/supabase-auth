"use client";

import "./globals.css";
import React, { useState, useEffect, useCallback } from "react";
import { Inter } from "next/font/google";
import { useAtom } from "jotai";
import { supabaseStore } from "@/components/supabaseStore";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [supabase] = useAtom(supabaseStore);
  const router = useRouter();
  const [user, setUser] = useState<string>("No user");

  const signInWithOAuth = async () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const signOut = async () => {
    supabase.auth.signOut();
  };

  //fetch user data once on mount
  useEffect(() => {
    const getuser = async () => {
      const { data, error } = await supabase.auth.getUser();
      return data.user;
    };

    getuser().then((user) => {
      setUser(user?.email ?? "No user");
    });
  }, [supabase]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user?.email ?? "No user");
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>{user}</h1>
        <button onClick={signInWithOAuth}>Sign in</button>
        <button onClick={signOut}>Sign out</button>
        {children}
      </body>
    </html>
  );
}
