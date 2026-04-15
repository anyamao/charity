"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { Loader2, Save, Upload, X, User } from "lucide-react";

// Simple type for user profile - matches your `users` table
type UserProfile = {
  name: string;
  lastname: string;
  city: string;
  date_of_birth: string;
  contact_type: "phone" | "vk" | "telegram";
  contact_value: string;
  about: string;
  status: string;
  avatar_url: string | null;
};

export default function ProfileSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    lastname: "",
    city: "",
    date_of_birth: "",
    contact_type: "phone",
    contact_value: "",
    about: "",
    status: "",
    avatar_url: null,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClient();
  const { isAuthenticated, isLoaded } = useAuthStore();
  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          router.push("/signin");
          return;
        }
        if (!isLoaded) {
          return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <Loader2 className="animate-spin w-8 h-8 text-pink-900" />
            </div>
          );
        }
        const { data, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          throw profileError;
        }

        if (data) {
          setProfile({
            name: data.name || "",
            lastname: data.lastname || "",
            city: data.city || "",
            date_of_birth: data.date_of_birth || "",
            contact_type: data.contact_type || "phone",
            contact_value: data.contact_value || "",
            about: data.about || "",
            status: data.status || "",
            avatar_url: data.avatar_url || null,
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Не удалось загрузить профиль");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, router, isLoaded, supabase]);

  // Handle avatar file selection (preview only - no upload for now)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Выберите изображение (JPG, PNG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Максимальный размер: 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Remove avatar preview
  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Save profile changes
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Не авторизован");

      // Validate
      if (!profile.name.trim() || !profile.lastname.trim()) {
        throw new Error("Имя и фамилия обязательны");
      }
      if (!profile.contact_value.trim()) {
        throw new Error("Контактные данные обязательны");
      }

      const { error } = await supabase
        .from("users")
        .update({
          name: profile.name.trim(),
          lastname: profile.lastname.trim(),
          city: profile.city.trim(),
          date_of_birth: profile.date_of_birth || null,
          contact_type: profile.contact_type,
          contact_value: profile.contact_value.trim(),
          about: profile.about.trim(),
          status: profile.status.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Loader2 className="animate-spin w-8 h-8 mx-auto mb-4 text-pink-900" />
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }
  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin w-8 h-8 text-pink-900" />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-pink-900 mb-6">
          Настройки профиля
        </h1>

        {/* Messages */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
            <Save size={16} /> Сохранено!
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow">
                {avatarPreview || profile.avatar_url ? (
                  <img
                    src={avatarPreview || profile.avatar_url || ""}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="animate-spin w-6 h-6 text-white" />
                </div>
              )}
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-pink-900 text-white rounded-lg hover:bg-pink-800 text-sm">
                <Upload size={14} />
                <span>Изменить</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              {(avatarPreview || profile.avatar_url) && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="ml-2 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <X size={14} /> Удалить
                </button>
              )}
              <p className="text-xs text-gray-500 mt-1">До 5MB</p>
            </div>
          </div>

          {/* Name + Lastname */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя *
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Фамилия *
              </label>
              <input
                type="text"
                value={profile.lastname}
                onChange={(e) =>
                  setProfile({ ...profile, lastname: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
                required
              />
            </div>
          </div>

          {/* City + DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Город
              </label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) =>
                  setProfile({ ...profile, city: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата рождения
              </label>
              <input
                type="date"
                value={profile.date_of_birth}
                onChange={(e) =>
                  setProfile({ ...profile, date_of_birth: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Контакт
            </label>
            <div className="flex gap-4 mb-3">
              {(["phone", "vk", "telegram"] as const).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="contact_type"
                    value={type}
                    checked={profile.contact_type === type}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        contact_type: e.target.value as
                          | "phone"
                          | "vk"
                          | "telegram",
                      })
                    }
                    className="w-4 h-4 text-pink-900"
                  />
                  <span className="text-sm">
                    {type === "phone"
                      ? "Телефон"
                      : type === "vk"
                        ? "VK"
                        : "Telegram"}
                  </span>
                </label>
              ))}
            </div>
            <input
              type="text"
              value={profile.contact_value}
              onChange={(e) =>
                setProfile({ ...profile, contact_value: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
              placeholder={
                profile.contact_type === "phone"
                  ? "+7 (___) ___-__-__"
                  : profile.contact_type === "vk"
                    ? "vk.com/id..."
                    : "@username"
              }
              required
            />
          </div>

          {/* Status + About */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Статус
              </label>
              <input
                type="text"
                value={profile.status}
                onChange={(e) =>
                  setProfile({ ...profile, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900"
                placeholder="О чём вы думаете?"
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                О себе
              </label>
              <textarea
                value={profile.about}
                onChange={(e) =>
                  setProfile({ ...profile, about: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-900 resize-none"
                placeholder="Расскажите о себе..."
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {profile.about.length}/500
              </p>
            </div>
          </div>

          {/* Email (read-only) */}
          <div className="pt-4 border-t">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm">
              Загружается...
            </div>
          </div>

          {/* Save */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-900 text-white rounded-lg hover:bg-pink-800 transition-colors font-medium disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span>Сохранение...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Сохранить</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
