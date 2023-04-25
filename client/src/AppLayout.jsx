import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const AppLayout = (props) =>
  props ? (
    <>
      <Navbar />
      <div className='container'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : null;

export default AppLayout;
