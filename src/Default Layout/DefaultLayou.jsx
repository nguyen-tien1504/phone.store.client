import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const DefaultLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
