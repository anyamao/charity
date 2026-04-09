"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
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
            Сброс пароля
          </p>
          <p className="text-pink-900">Введите ваш новый пароль</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {success ? (
            <p className="text-green-600">
              ✅ Пароль обновлён! Перенаправляем...
            </p>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <input
                type="password"
                placeholder="Новый пароль (мин. 6 символов)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-pink-900 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-900"
                required
                minLength={6}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-900 text-white py-2 rounded-lg hover:bg-pink-800 disabled:opacity-50"
              >
                {loading ? "Сохранение..." : "Сохранить пароль"}
              </button>
            </form>
          )}
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
