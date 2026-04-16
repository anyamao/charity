import { LogIn, Menu } from "lucide-react";
import Link from "next/link";
function Header() {
  return (
    <div className="bg-white fixed z-20 rounded-full w-[90%] max-w-[1000px] flex items-center justify-between flex-row p-[10px] px-[40px]  h-[60px] mt-[20px] shadow-xs">
      <div className="flex items-center flex-row">
        <Link href="/" className="flex pointer flex-row items-center">
          <img src="/flowerch.png" className="w-[40px]" />
          <p className="text-pink-900 font-semibold ">РастимДобро</p>
        </Link>
        <div className="flex flex-row ml-[20px] bg-red-400 rounded-xl text-white font-semibold  border-pink-900 transition-all duration-300 px-[10px] py-[5px] items-center">
          <p className="text-[13px] ">Хочу помочь</p>
        </div>
      </div>

      <div className="w-[40%] bg-red-100 rounded-full flex items-center max-w-[500px] overflow-x-scroll h-[40px]">
        <input
          type="text"
          className="text-[12px] outline-none w-full text-red-800 px-[10px]"
          placeholder="Найти.."
        />
      </div>
      <div className="flex flex-row justify-between w-[120px]">
        <div className="flex flex-row bg-green-200 rounded-xl text-green-900 hover:text-green-200 hover:bg-green-700 transition-all duration-300 px-[10px] py-[5px] items-center">
          <p className="text-[13px] ">Войти</p>
          <LogIn className=" ml-[10px]  w-[15px] h-[15px]  " />
        </div>
        <Menu className="w-[15px] text-red-950 cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;
