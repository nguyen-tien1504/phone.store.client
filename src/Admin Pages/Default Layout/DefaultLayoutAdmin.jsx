import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const DefaultLayoutAdmin = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex h-fit">
        <div className="w-[250px]  bg-[#333]">
          <Sidebar />
        </div>
        <div className="w-full p-8 bg-slate-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayoutAdmin;
