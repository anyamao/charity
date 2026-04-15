"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToggleStore } from "@/stores/toggle-store";
import { Menu, CircleUser, Search, X } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { useUIStore } from "@/lib/store/ui";
import {
  User,
  LogIn,
  LogOut,
  SlidersHorizontal,
  UserRoundPen,
  GraduationCap,
  Smile,
  Trophy,
  MoonStar,
} from "lucide-react"; // or your own SVG icons
import Link from "next/link";
function Header() {
  const { MenuOn, toggleMenu } = useToggleStore();
  const { isAuthenticated, isLoading, setIsAuthenticated } = useAuthStore(); // ✅ Get setter
  const { showProfile, toggleShowProfile, setShowProfile } = useUIStore(); // ✅

  const router = useRouter();
  // ✅ Logout handler
  const handleLogout = async () => {
    const supabase = createClient();

    try {
      // 1. Sign out from Supabase
      await supabase.auth.signOut();

      // 2. Update Zustand store (instant UI feedback)
      setIsAuthenticated(false);

      // 3. Close profile dropdown
      setShowProfile(false);

      // 4. Redirect to home
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full fixed h-[70px] bg-white border-b-[1px]  border-gray-200 flex items-center justify-between md:px-[30px] px-[10px] flex-row">
      <div className="flex items-center">
        <div className=" flex items-center">
          <img
            src="/flowerch.png"
            className="sm:w-[40px] sm:h-[40px]  w-[30px] h-[30px]"
          />
          <Link
            href="/"
            className="sm:text-[20px] hidden sm:block text-[17px] text-pink-900 font-semibold"
          >
            rastimdobro
          </Link>
        </div>

        <div
          onClick={toggleMenu}
          className={`flex flex-row ${MenuOn ? "bg-pink-900 text-white" : "bg-pink-200 text-pink-900"}  items-center cursor-pointer  transition-all duration-300  ml-[10px] sm:ml-[40px] w-[70px] h-[28px] justify-center  rounded-md`}
        >
          <Menu
            className={`w-[15px] h-[15px] ${MenuOn ? "hidden" : "block"}  `}
          />
          <X className={`w-[15px] h-[15px] ${MenuOn ? "block" : "hidden"}  `} />

          <p className="text-[12px] ml-[5px]  font-semibold">Меню</p>
        </div>
      </div>

      <div className="flex items-center flex-row">
        <div className="flex flex-row border-[1px] ml-[15px] mr-[5px] transition-all duration-300 hover:bg-pink-900 hover:text-white text-pink-900 border-pink-900 items-center cursor-pointer w-[80px] h-[28px] justify-center rounded-md">
          <p className="text-[12px] font-semibold">Связаться</p>
        </div>
        <div className="hover:bg-pink-900 h-[32px] cursor-pointer w-[32px] hover:text-white text-pink-900   rounded-md transition-all duration:300  sm:mr-[20px] mr-[5px]">
          <Search className="w-[15px] h-[15px]  sm:mr-[20px] mr-[5px] mt-[8px] ml-[7px]  " />
        </div>

        {isAuthenticated ? (
          <img
            className="w-[40px] mt-[5px] cursor-pointer rounded-full"
            src="/mottihead.png"
            onClick={toggleShowProfile}
          />
        ) : (
          <Link
            href="/login"
            className="flex flex-row bg-pink-200 items-center cursor-pointer transition-all duration-1 hover:opacity-80 w-[75px] h-[28px] justify-center rounded-md"
          >
            <CircleUser className="w-[15px] h-[15px] text-pink-900" />

            <p className="text-[12px] ml-[5px] text-pink-900 font-semibold">
              Войти
            </p>
          </Link>
        )}
      </div>

      {showProfile && (
        <div className="cursor-pointer p-[15px]  bg-white z-80 border-[1px] border-gray-300 w-[250px] h-[270px] fixed  right-0 top-0 mt-[60px] mr-[10px] sm:mt-[70px] shadow-md flex flex-col items-center text-black   rounded-xl ">
          <div className="flex flex-row hidden items-center py-[10px] border-b-[1px] w-full border-gray-300 "></div>
          <div className="flex flex-row items-center py-[10px] px-[10px] border-b-[1px] h-[60px] w-full border-gray-300 ">
            <button className="flex items-center " onClick={handleLogout}>
              <LogOut className="w-[17px] h-[17px] text-red-600" />
              <span className="ml-[10px] text-[12px]">Выйти</span>
            </button>
          </div>
          <div className="flex flex-row items-center py-[5px] px-[10px] border-b-[1px] h-[50px] w-full border-gray-300 ">
            <a className="flex items-center " href="/profile-settings">
              <UserRoundPen className="w-[17px] h-[17px] text-gray-500" />
              <span className="ml-[10px] text-[12px]">Настройки</span>
            </a>
          </div>
          <div className="flex flex-row items-center py-[5px] px-[10px] border-b-[1px] h-[50px] w-full border-gray-300 ">
            <a className="flex items-center " href="/profile-page">
              <MoonStar className="w-[17px] h-[17px] text-gray-500" />
              <span className="ml-[10px] text-[12px]">
                Поставить темную тему
              </span>
            </a>
          </div>

          <div className="flex flex-row items-center py-[5px] px-[10px] border-b-[1px] h-[50px] w-full border-gray-300 ">
            <Link className="flex items-center " href="/profile-page">
              <User className="w-[17px] h-[17px] text-gray-500" />
              <span className="ml-[10px] text-[12px]">Профиль</span>
            </Link>
          </div>
          <div className="flex flex-row cursor-pointer items-center py-[5px] px-[10px]  h-[50px] w-full border-gray-300 flex flex-row items-center py-[5px] px-[10px] border-b-[1px] h-[50px] w-full border-gray-300 ">
            <a className="flex items-center ">
              <Smile className="w-[17px] h-[17px] text-gray-500" />
              <span className="ml-[10px] text-[12px]">Мои активности</span>
            </a>
          </div>
          <div className="flex flex-row items-center py-[5px] px-[10px]  h-[50px] w-full border-gray-300 ">
            <a className="flex items-center ">
              <Trophy className="w-[17px] h-[17px] text-gray-500" />
              <span className="ml-[10px] text-[12px]">Мои достижения</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
