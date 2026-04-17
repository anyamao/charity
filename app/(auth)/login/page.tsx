// frontend/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Ошибка входа");
      }

      // ✅ Успех — сохраняем токен и перенаправляем
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_email", data.email); // опционально

      alert("✅ Вход успешен!");
      router.push("/"); // или router.push('/profile') если есть личный кабинет

      // 🔁 Обновляем страницу, чтобы подтянулся авторизованный статус
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col relative">
      <div className="bg-white p-8 w-[500px] mt-[-100px] rounded-xl shadow-lg">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Войти в аккаунт</h2>
          <p className="mt-2 text-sm text-gray-600">
            Нет аккаунта?{" "}
            <Link
              href="/signup"
              className="font-medium text-pink-600 hover:text-blue-500"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ошибка */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Поля */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        {/* Ссылка "Забыли пароль?" (опционально) */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() =>
              alert("Функция восстановления пароля будет добавлена позже")
            }
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Забыли пароль?
          </button>
        </div>
      </div>
    </div>
  );
}
