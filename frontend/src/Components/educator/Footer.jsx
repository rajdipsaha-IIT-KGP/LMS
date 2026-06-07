import React from 'react'
import { assets } from '../../assets/assets'

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer
      className="
        w-full
        border-t
        border-zinc-800
        bg-[#050505]
        px-6
        md:px-10
        py-5
      "
    >
      <div
        className="
          flex
          flex-col-reverse
          md:flex-row
          items-center
          justify-between
          gap-5
        "
      >
        {/* Left Side */}
        <div className="flex items-center gap-4">

          <img
            className="hidden md:block w-28"
            src={assets.logo_dark}
            alt="logo"
          />

          <div className="hidden md:block h-8 w-px bg-zinc-700"></div>

          <p className="text-zinc-500 text-xs md:text-sm text-center">
            Copyright © 2026. All Rights Reserved.
          </p>

        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">

          <a
            href="#"
            className="
              w-10
              h-10
              rounded-full
              bg-zinc-900
              border
              border-zinc-800
              flex
              items-center
              justify-center
              text-zinc-400
              hover:text-blue-500
              hover:border-blue-500/30
              hover:scale-110
              transition-all
              duration-300
            "
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="
              w-10
              h-10
              rounded-full
              bg-zinc-900
              border
              border-zinc-800
              flex
              items-center
              justify-center
              text-zinc-400
              hover:text-sky-400
              hover:border-sky-400/30
              hover:scale-110
              transition-all
              duration-300
            "
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            className="
              w-10
              h-10
              rounded-full
              bg-zinc-900
              border
              border-zinc-800
              flex
              items-center
              justify-center
              text-zinc-400
              hover:text-pink-500
              hover:border-pink-500/30
              hover:scale-110
              transition-all
              duration-300
            "
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="
              w-10
              h-10
              rounded-full
              bg-zinc-900
              border
              border-zinc-800
              flex
              items-center
              justify-center
              text-zinc-400
              hover:text-green-400
              hover:border-green-400/30
              hover:scale-110
              transition-all
              duration-300
            "
          >
            <FaGithub />
          </a>

        </div>
      </div>
    </footer>
  )
}

export default Footer