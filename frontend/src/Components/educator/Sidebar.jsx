import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

import {
  FaChartPie,
  FaPlusSquare,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa";

const SideBar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/educator",
      icon: FaChartPie,
    },
    {
      name: "Add Course",
      path: "/educator/add-course",
      icon: FaPlusSquare,
    },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: FaLayerGroup,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: FaUsers,
    },
  ];

  return (
    isEducator && (
      <aside
        className=" md:w-72 w-20 min-h-screen bg-[#050505] border-r border-zinc-800 flex flex-col sticky top-0 overflow-hidden
        "
      >
        {/* Background Glow */}
        <div className="absolute top-20 left-0 w-52 h-52 bg-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="px-6 py-8 hidden md:block relative">

          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Educator Panel
          </p>


          <div
            className=" mt-4 h-[2px] bg-zinc-900 rounded-full overflow-hidden
            "
          >
            <div
              className=" h-full w-20 bg-gradient-to-r from-green-400 to-yellow-400 animate-pulse
              "
            />
          </div>

        </div>

        {/* Menu */}
        <div className="flex flex-col gap-3 px-3 relative">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/educator"}
                className={({ isActive }) =>
                  ` group relative flex items-center md:flex-row flex-col gap-4 px-4 py-4 rounded-2xl overflow-hidden transition-all duration-500
                  
                  ${
                    isActive
                      ? ` bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-green-500/10 border border-green-500/20 shadow-[0_0_25px_rgba(34,197,94,0.15)] ` : ` border border-transparent hover:border-zinc-700 hover:bg-zinc-900/70
                      `
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Indicator */}
                    {isActive && (
                      <div
                        className=" absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-full bg-gradient-to-b from-green-400 to-yellow-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]
                        "
                      />
                    )}

                    {/* Icon */}
                    <Icon
                      className={` text-2xl transition-all duration-500
                        ${
                          isActive
                            ? ` text-green-400 scale-110 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)] ` : ` text-zinc-400 group-hover:text-yellow-400 group-hover:scale-110
                            `
                        }
                      `}
                    />

                    {/* Text */}
                    <span
                      className={`
                        hidden
                        md:block
                        font-medium
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "text-white"
                            : "text-zinc-400 group-hover:text-white"
                        }
                      `}
                    >
                      {item.name}
                    </span>

                    {/* Hover Glow */}
                    <div
                      className=" absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-green-500/5 via-transparent to-yellow-500/5 pointer-events-none
                      "
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Card */}
        <div className="mt-auto p-4 hidden md:block">

          <div
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900/40
              backdrop-blur-xl
              p-5
            "
          >
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Status
            </p>

            <div className="flex items-center gap-3 mt-3">

              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              <span className="text-green-400 font-medium">
                Educator Active
              </span>

            </div>

            <p className="text-zinc-500 text-sm mt-3">
              Manage courses, students and analytics from one place.
            </p>

          </div>

        </div>

      </aside>
    )
  );
};

export default SideBar;