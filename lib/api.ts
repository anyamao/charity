// lib/api.ts

// ✅ Определяем базовый URL в зависимости от окружения
const getApiUrl = () => {
  if (typeof window === "undefined") {
    // Сервер (в Docker): используем имя сервиса
    return process.env.API_INTERNAL_URL || "http://backend:8000";
  }
  // Клиент (браузер): относительный путь, Nginx проксирует /api → backend
  return process.env.NEXT_PUBLIC_API_URL || "/api";
};

// Types (оставь как есть)
export interface SignupData { /* ... */ }
export interface UserResponse { /* ... */ }
export interface TokenResponse { /* ... */ }

// ✅ Generic API fetch function — теперь использует getApiUrl()!
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const API_BASE = getApiUrl(); // ← ✅ ИСПОЛЬЗУЕМ ФУНКЦИЮ!
  
  // Убираем дубли /api, если endpoint уже содержит его
  const path = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
  const url = `${API_BASE}${path}`;
  
  // Отладка (удали после проверки)
  console.log(`[API] ${typeof window === 'undefined' ? 'SERVER' : 'CLIENT'} → ${url}`);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    cache: "no-store",
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = { fetch: apiFetch };

// ✅ Auth API methods
export const authApi = {
  signup: async (data: SignupData): Promise<UserResponse> => {
    return apiFetch("/api/v1/auth/signup", {  // ← теперь пойдёт через getApiUrl()
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  login: async (email: string, password: string): Promise<TokenResponse> => {
    const API_BASE = getApiUrl(); // ← ✅ И здесь!
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);
    
    const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Login failed" }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }
    return response.json();
  },
  
  getMe: async (): Promise<UserResponse> => {
    return apiFetch("/api/v1/auth/me");
  },
};

// Token helpers
export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") localStorage.setItem("token", token);
};
export const clearAuthToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem("token");
};
