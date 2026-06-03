import React from 'react'

const CallToAction = () => {
  return (
    <section className="relative w-full bg-black py-24 px-6 overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/10 blur-[120px] rounded-full animate-[floatGlow_6s_ease-in-out_infinite]"></div>

      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/10 blur-[120px] rounded-full animate-[floatGlow_8s_ease-in-out_infinite]"></div>

      <div
        className="
          relative
          max-w-5xl
          mx-auto
          rounded-[32px]
          border
          border-zinc-900
          bg-[#050505]
          px-8
          md:px-16
          py-16
          text-center
          shadow-[0_0_40px_rgba(0,0,0,0.7)]
        "
      >

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

          <span className="text-xs font-medium text-green-400">
            Start Learning Today
          </span>
        </div>

        {/* Heading with Glow */}
        <div className="relative">

          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-yellow-400/20 to-green-500/20 blur-[80px] scale-125 rounded-full"></div>

          <h1
            className="
              relative
              z-10
              text-4xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
              drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]
            "
          >
            Learn Anything,
            <br />

            <span
              className="
                bg-gradient-to-r
                from-green-400
                via-yellow-400
                to-green-400
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_25px_rgba(34,197,94,0.7)]
              "
            >
              Anytime, Anywhere
            </span>
          </h1>

        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto mt-6 text-zinc-400 leading-relaxed">
          Master new skills, accelerate your career, and learn from
          industry experts through engaging courses designed for
          modern learners.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-10">

          {/* Get Started */}
          <button
            className="
              px-8
              py-4
              rounded-full
              bg-gradient-to-r
              from-green-400
              via-green-500
              to-emerald-500
              text-black
              font-semibold
              shadow-[0_0_25px_rgba(34,197,94,0.35)]
              hover:scale-105
              hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]
              transition-all
              duration-300 cursor-pointer
            "
          >
            Get Started
          </button>

          {/* Learn More */}
          <button
            className="
              group
              flex
              items-center
              gap-3
              px-6
              py-4
              rounded-full
              border
              
              bg-zinc-900/50
              
             border-green-500/40
              text-green-400
              hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]
              transition-all
              duration-300 cursor-pointer
            "
          >
            Learn More

            <span
              className="
                text-lg
                animate-[arrowMove_0.7s_ease-in-out_infinite]
              "
            >
              →
            </span>
          </button>

        </div>

      </div>
    </section>
  )
}

export default CallToAction