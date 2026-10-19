import React from "react";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <div>
      <div>Navbar</div>
      <Outlet />
    </div>
  );
};

export default MainLayouts;
