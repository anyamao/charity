const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    cache: 'no-store',
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export const authApi = {
  signup: ( {
    email: string;
    password: string;
    name: string;
    lastname: string;
    city: string;
    date_of_birth: string;
    contact_type: 'phone' | 'vk' | 'telegram';
    contact_value: string;
  }) => apiFetch('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (email: string, password: string) => {
    // OAuth2PasswordRequestForm expects form-urlencoded, not JSON
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    return fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    }).then(async (res) => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: 'Login failed' }));
        throw new Error(error.detail || `HTTP ${res.status}`);
      }
      return res.json();
    });
  },
  
  getMe: () => apiFetch('/api/v1/auth/me'),
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};
