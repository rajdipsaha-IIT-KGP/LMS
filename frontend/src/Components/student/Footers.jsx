import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="relative w-full bg-black overflow-hidden pt-6">

      {/* Top Divider */}
      <div className="w-full flex justify-center">
        <div className="h-px w-[90%] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      </div>

      {/* Background Glow */}
      <div className="absolute left-0 bottom-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute right-0 top-0 w-72 h-72 bg-yellow-400/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Logo Section */}
          <div>

            <img
              src={assets.logo_dark}
              alt="logo"
              className="h-10"
            />

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
              Empowering learners worldwide with high-quality courses,
              expert instructors, and a community designed for growth.
            </p>

          </div>

          {/* Links */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-6">
              Company
            </h3>

            <ul className="space-y-4">

              <li>
                <a
                  href="#"
                  className="
                    text-zinc-400
                    hover:text-green-400
                    transition-colors
                  "
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-zinc-400
                    hover:text-green-400
                    transition-colors
                  "
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-zinc-400
                    hover:text-green-400
                    transition-colors
                  "
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="
                    text-zinc-400
                    hover:text-green-400
                    transition-colors
                  "
                >
                  Privacy Policy
                </a>
              </li>

            </ul>

          </div>

          {/* Newsletter */}
          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

              <span className="text-xs font-medium text-green-400">
                Newsletter
              </span>
            </div>

            <h3 className="text-white font-semibold text-lg">
              Stay Updated
            </h3>

            <p className="text-zinc-400 mt-4 leading-relaxed">
              Get the latest courses, resources, and learning tips
              delivered directly to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1
                  bg-[#050505]
                  border
                  border-zinc-800
                  rounded-full
                  px-5
                  py-3
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  focus:border-green-500/50
                  transition-all
                "
              />

              <button
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-gradient-to-r
                  from-green-400
                  via-green-500
                  to-emerald-500
                  text-black
                  font-semibold
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-[0_0_20px_rgba(34,197,94,0.25)]
                "
              >
                Subscribe
              </button>

            </div>

          </div>

        </div>

        {/* Bottom Divider */}
        <div className="mt-14 h-px bg-zinc-900"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">

          <p className="text-zinc-500 text-sm">
            © 2026 EduPlatform. All rights reserved.
          </p>

         

        </div>

      </div>

    </footer>
  )
}

export default Footer