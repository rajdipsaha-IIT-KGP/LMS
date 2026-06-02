import React from 'react'
import { assets } from '../../assets/assets'
import Searchbar from './Searchbar'

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen pt-24 md:pt-40 px-6 space-y-8 text-center bg-black overflow-hidden">

      {/* Main Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-[300px] md:h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
{/* Strong Green Glow */}
<div className="absolute left-[10%] top-[30%] w-[450px] h-[450px] bg-emerald-500/25 blur-[180px] rounded-full pointer-events-none"></div>

<div className="absolute left-[20%] top-[35%] w-[250px] h-[250px] bg-green-400/30 blur-[120px] rounded-full pointer-events-none"></div>

{/* Strong Yellow Glow */}
<div className="absolute right-[10%] top-[30%] w-[450px] h-[450px] bg-yellow-400/25 blur-[180px] rounded-full pointer-events-none"></div>

<div className="absolute right-[20%] top-[35%] w-[250px] h-[250px] bg-amber-300/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Heading Section */}
      <div className="relative flex justify-center items-center">

        <h1 className="relative z-10 md:text-home-heading-large text-home-heading-small font-extrabold text-white max-w-4xl mx-auto leading-tight md:leading-[1.15] tracking-tight">
          Empower your future with the courses designed to{' '}
          <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            fit your choice.
          </span>

          <img
            src={assets.sketch}
            alt="sketch"
            className="md:block hidden absolute -bottom-6 -right-6 lg:-right-12 w-32 lg:w-40 opacity-70 brightness-125"
          />
        </h1>

      </div>

      {/* Desktop Subtitle */}
      <p className="hidden md:block text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
        We bring together world-class instructors, interactive content,
        and a supportive community to help you achieve your personal and
        professional goals.
      </p>

      {/* Mobile Subtitle */}
      <p className="md:hidden text-zinc-400 max-w-sm mx-auto text-base leading-relaxed">
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>

      {/* Searchbar */}
      <div className="pt-4 md:pt-6 w-full flex justify-center relative z-10">
        <Searchbar />
      </div>

    </div>
  )
}

export default Hero