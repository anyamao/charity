"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userEmail = localStorage.getItem("user_email");

    // ✅ Проверяем, нужно ли вообще обновлять
    const shouldBeAuthenticated = !!token;

    if (isAuthenticated !== shouldBeAuthenticated) {
      setIsAuthenticated(shouldBeAuthenticated);
    }

    if (email !== userEmail) {
      setEmail(userEmail);
    }

    if (loading) {
      setLoading(false);
    }
  }, []); // Пустой массив = только при монтировании

  const login = (token: string, userEmail: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_email", userEmail);
    setIsAuthenticated(true);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    setIsAuthenticated(false);
    setEmail(null);
  };

  return { isAuthenticated, email, loading, login, logout };
}
