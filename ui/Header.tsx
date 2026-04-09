"use client";

import { useToggleStore } from "@/stores/toggle-store";
import { Menu, CircleUser, Search, X } from "lucide-react";
import Link from "next/link";
function Header() {
  const { MenuOn, toggleMenu } = useToggleStore();
  return (
    <div className="w-full h-[70px] bg-white border-b-[1px]  border-gray-200 flex items-center justify-between md:px-[30px] px-[10px] flex-row">
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
        <Link
          href="/login"
          className="flex flex-row bg-pink-200 items-center cursor-pointer transition-all duration-1 hover:opacity-80 w-[75px] h-[28px] justify-center rounded-md"
        >
          <CircleUser className="w-[15px] h-[15px] text-pink-900" />

          <p className="text-[12px] ml-[5px] text-pink-900 font-semibold">
            Войти
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
