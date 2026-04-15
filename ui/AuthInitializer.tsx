"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth";

export function AuthInitializer() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return null;
}
