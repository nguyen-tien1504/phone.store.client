import React from "react";
import logo from "../../../img/Navbar/navbarbanner.png";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 bg-[#4f4f4f] h-full">
      <img src={logo} alt="" className="w-[9%]"/>
      <p className="font-bold text-2xl text-white">Admin</p>
    </div>
  );
};

export default Navbar;
