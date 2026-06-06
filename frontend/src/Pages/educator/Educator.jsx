import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/educator/Navbar";
import SideBar from "../../Components/educator/Sidebar";
import Footer from "../../Components/educator/Footer";

const Educator = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Background Glow */}
      <div className="fixed left-0 top-32 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="fixed right-0 top-32 w-96 h-96 bg-yellow-400/10 blur-[150px] rounded-full pointer-events-none"></div>

      <Navbar />

      {/* Sidebar + Content */}
      <div className="flex">

        <SideBar />

        <main className="flex-1 relative z-10 px-4 md:px-8 py-8 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
<Footer/>
    </div>
  );
};

export default Educator;