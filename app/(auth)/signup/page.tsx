"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi, setAuthToken } from "@/lib/api"; // Add this import

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactType, setContactType] = useState<"phone" | "vk" | "telegram">(
    "phone",
  );
  const [contactValue, setContactValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!contactValue.trim()) {
      setError("Пожалуйста, укажите контактные данные");
      setLoading(false);
      return;
    }

    try {
      // ✅ Call FastAPI backend instead of Supabase
      const userData = await authApi.signup({
        email,
        password,
        name,
        lastname,
        city,
        date_of_birth: dateOfBirth,
        contact_type: contactType,
        contact_value: contactValue,
      });

      // Auto-login after signup
      const tokenData = await authApi.login(email, password);
      setAuthToken(tokenData.access_token);

      alert("Аккаунт успешно создан!");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Root: min-h-screen instead of h-full
    <div className="w-full min-h-[1300px] bg-red-900 flex  justify-center flex-row">
      {/* Left panel: min-h-screen + overflow-y-auto */}
      <div className="bg-white z-10 flex-1 min-h-[1300px] pt-[10px] px-[10px] max-w-[900px] overflow-y-auto">
        <div className="flex items-center">
          <img
            src="/flowerch.png"
            className="sm:w-[40px] sm:h-[40px] w-[30px] h-[30px]"
            alt="logo"
          />
          <Link
            href="/"
            className="sm:text-[20px] text-[17px] text-pink-900 font-semibold"
          >
            rastimdobro
          </Link>
        </div>

        {/* ✅ Content wrapper: use pb-10 to prevent cutoff */}
        <div className=" flex mt-[60px] items-center flex-col justify-center gap-4 px-4 pb-10">
          {/* Image container with fixed height to stabilize layout */}
          <div className="h-[300px] flex items-end justify-center">
            <img
              src="/mottihead.png"
              className="h-[300px] object-contain"
              alt="header"
            />
          </div>

          <p className="text-[20px] font-semibold text-pink-900 mt-[-70px] mb-[10px]">
            Добро пожаловать!
          </p>
          <p className="text-pink-900">Создай свой аккаунт</p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form
            onSubmit={handleSignup}
            className="flex flex-col items-center w-[80%] max-w-[350px] gap-3"
          >
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-pink-900 rounded-md p-2 mt-[15px] text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-pink-900 rounded-md p-2 mt-[15px] text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
              required
              minLength={6}
            />

            {/* Name + Lastname */}
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-pink-900 rounded-md p-2 text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
                required
              />
              <input
                type="text"
                placeholder="Фамилия"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="border border-pink-900 rounded-md p-2 text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
                required
              />
            </div>

            {/* City */}
            <input
              type="text"
              placeholder="Город"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-pink-900 rounded-md p-2 text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
              required
            />

            {/* Date of Birth */}
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="border border-pink-900 rounded-md p-2 text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
              required
              max={new Date().toISOString().split("T")[0]} // Prevent future dates
            />

            {/* Contact Method Selection */}
            <div className="flex gap-2 w-full">
              <label className="flex items-center gap-1 text-sm text-pink-900">
                <input
                  type="radio"
                  name="contactType"
                  value="phone"
                  checked={contactType === "phone"}
                  onChange={() => setContactType("phone")}
                  className="accent-pink-900"
                />
                Телефон
              </label>
              <label className="flex items-center gap-1 text-sm text-pink-900">
                <input
                  type="radio"
                  name="contactType"
                  value="vk"
                  checked={contactType === "vk"}
                  onChange={() => setContactType("vk")}
                  className="accent-pink-900"
                />
                VK
              </label>
              <label className="flex items-center gap-1 text-sm text-pink-900">
                <input
                  type="radio"
                  name="contactType"
                  value="telegram"
                  checked={contactType === "telegram"}
                  onChange={() => setContactType("telegram")}
                  className="accent-pink-900"
                />
                Telegram
              </label>
            </div>

            {/* Contact Value Input */}
            <input
              type="text"
              placeholder={
                contactType === "phone"
                  ? "+7 (___) ___-__-__"
                  : contactType === "vk"
                    ? "vk.com/id..."
                    : "@username"
              }
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              className="border border-pink-900 rounded-md p-2 text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex flex-row border text-white bg-pink-900 rounded-lg hover:bg-pink-800 transition-all duration-300 items-center cursor-pointer h-[50px] mt-[20px] justify-center disabled:opacity-50 w-full disabled:cursor-not-allowed"
            >
              {loading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Есть аккаунт?{" "}
            <Link href="/login" className="text-pink-900 hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block relative w-full min-h-[1300px] flex-1">
        <Image
          src="/rm295-mynt-22.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Right panel: hidden on mobile, fixed on desktop */}
    </div>
  );
}
