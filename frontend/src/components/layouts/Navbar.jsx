import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  // close mobile menu after click
  const handleNavigate = () => setOpenSideMenu(false);

  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu((o) => !o)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">hematYUK</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 bg-white z-20">
          <SideMenu onNavigate={handleNavigate} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
