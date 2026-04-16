








const getApiUrl = () => {
  // Если код выполняется на сервере (в контейнере)
  if (typeof window === 'undefined') {
    // Внутри Docker используем имя сервиса
    return process.env.API_INTERNAL_URL || 'http://backend:8000';
  }
  // Если в браузере — используем публичный IP
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};



const API_URL =   getApiUrl();

// Types
export interface SignupData {
  email: string;
  password: string;
  name: string;
  lastname: string;
  city: string;
  date_of_birth: string;
  contact_type: "phone" | "vk" | "telegram";
  contact_value: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  lastname: string | null;
  city: string | null;
  contact_type: string | null;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// Generic API fetch function
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    cache: "no-store",
    ...options,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

// Generic API object for any endpoint
export const api = {
  fetch: apiFetch,
};

// Auth API methods
export const authApi = {
  signup: async (data: SignupData): Promise<UserResponse> => {
    return apiFetch<UserResponse>("/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login: async (email: string, password: string): Promise<TokenResponse> => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: "Login failed" }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  },

  getMe: async (): Promise<UserResponse> => {
    return apiFetch<UserResponse>("/api/v1/auth/me");
  },
};

// Token helpers
export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
