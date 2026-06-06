import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/react";

const Navbar = () => {
  const EducatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-[#050505]/90
        backdrop-blur-xl
        border-b
        border-zinc-800
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

        {/* Logo */}
        <Link to="/" className="group">
          <img
            src={assets.logo_dark}
            alt="logo"
            className="
              w-28
              lg:w-36
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <div className="hidden sm:block text-right">
            <p className="text-zinc-500 text-xs uppercase tracking-wider">
              Educator Dashboard
            </p>

            <h3 className="text-white font-semibold">
              Hi, {user ? user.fullName : "Developer"} 👋
            </h3>
          </div>

          <div
            className="
              p-[1px]
              rounded-full
              bg-gradient-to-r
              from-green-400
              via-yellow-400
              to-green-400
            "
          >
            <div className="bg-[#050505] rounded-full">
              {user ? (
                <UserButton />
              ) : (
                <img
                  src={assets.profile_img}
                  alt=""
                  className="
                    w-10
                    h-10
                    rounded-full
                    object-cover
                  "
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;