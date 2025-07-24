import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

function admin() {
  return (
    <div className="bg-gray-200 flex pt-16">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default admin;
