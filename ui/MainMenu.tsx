"use client";

import { useToggleStore } from "@/stores/toggle-store";

function MainMenu() {
  const { MenuOn, toggleMenu } = useToggleStore();
  return (
    <main
      className={`relative bg-black w-full min-h-full ${MenuOn ? "block" : "hidden"}`}
    >
      <div className="w-full absolute h-[100px] bg-white p-[20px]">menu</div>
    </main>
  );
}

export default MainMenu;
