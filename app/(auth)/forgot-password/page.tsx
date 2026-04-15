"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const handleResetPasswprd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // Where user lands after clicking email link
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[1300px] flex  justify-center flex-row">
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
        <div className=" flex mt-[200px] items-center flex-col justify-center gap-4 px-4 pb-10">
          {/* Image container with fixed height to stabilize layout */}
          <div className="h-[300px] flex items-end justify-center">
            <img
              src="/mottihead.png"
              className="h-[300px] object-contain"
              alt="header"
            />
          </div>

          <p className="text-[20px] font-semibold text-pink-900 mt-[-70px] mb-[10px]">
            Восстановление пароля
          </p>
          <p className="text-pink-900">
            Введите ваш email, и мы отправим вам инструкцию по восстановлению
          </p>
          {success && (
            <p className="text-green-600 text-sm text-center bg-green-50 px-4 py-2 rounded-md">
              ✅ Письмо отправлено на <strong>{email}</strong>.<br />
              Проверьте папку «Спам», если не видите его.
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form
            onSubmit={handleResetPasswprd}
            className="flex flex-col items-center w-[80%] max-w-[350px] gap-3"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-pink-900 rounded-md p-2 text-pink-900 focus:outline-none focus:ring-2 w-full focus:ring-pink-900"
              required
            />
            <div className="w-full flex justify-end">
              <a
                className="font-semibold text-red-900 text-[12px]"
                href="/login"
              >
                {" "}
                ВСпомнили пароль?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex flex-row border text-white bg-pink-900 rounded-lg hover:bg-pink-800 transition-all duration-300 items-center cursor-pointer h-[50px] justify-center disabled:opacity-50 w-full disabled:cursor-not-allowed"
            >
              <p className="text-[14px] font-semibold">
                {loading ? "Отправляем..." : "Отправлено"}
              </p>
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Нет аккаунта?{" "}
            <Link href="/signup" className="text-pink-900 hover:underline">
              Зарегистрироваться
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
    </div>
  );
}
