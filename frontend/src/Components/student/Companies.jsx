import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <section className="relative w-full bg-black py-20 md:py-24 px-4 overflow-hidden">

      {/* Background Aurora */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/10 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

          <span className="text-xs font-medium text-green-400">
            Trusted by 50,000+ learners
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mb-12 md:mb-14">

          <p className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] md:tracking-[0.35em] text-zinc-500">
            Trusted by learners from
          </p>

          {/* Animated Line */}
          <div className="relative w-52 md:w-72 h-[2px] bg-zinc-900 mt-5 overflow-hidden rounded-full">
            <div
              className="
                absolute
                top-0
                h-full
                w-20 md:w-24
                bg-green-500
                shadow-[0_0_15px_#22c55e]
                animate-[bounceLine_3s_ease-in-out_infinite]
              "
            />
          </div>
        </div>

        {/* Companies Card */}
        <div
          className="
            relative
            grid
            grid-cols-2
            md:flex
            items-center
            justify-items-center
            md:justify-center
            gap-y-8
            gap-x-6
            md:gap-20
            bg-[#050505]
            border
            border-zinc-900
            rounded-3xl
            px-6
            md:px-8
            py-10
            md:py-12
            shadow-[0_0_40px_rgba(0,0,0,0.8)]
          "
        >
          <img
            src={assets.microsoft_logo}
            alt="Microsoft"
            className="
              h-7
              md:h-10
              w-auto
              animate-[float_4s_ease-in-out_infinite]
              hover:scale-110
              transition-all
            "
          />

          <img
            src={assets.walmart_logo}
            alt="Walmart"
            className="
              h-7
              md:h-10
              w-auto
              animate-[float_4.5s_ease-in-out_infinite]
              hover:scale-110
              transition-all
            "
          />

          <img
            src={assets.adobe_logo}
            alt="Adobe"
            className="
              h-7
              md:h-10
              w-auto
              animate-[float_5s_ease-in-out_infinite]
              hover:scale-110
              transition-all
            "
          />

          <img
            src={assets.paypal_logo}
            alt="Paypal"
            className="
              h-7
              md:h-10
              w-auto
              animate-[float_4.2s_ease-in-out_infinite]
              hover:scale-110
              transition-all
            "
          />
             <img
            src={assets.google_logo}
            alt="google"
            className="
              h-12
              md:h-16
              w-auto
              animate-[float_4.2s_ease-in-out_infinite]
              hover:scale-110
              transition-all
            "
          />
        </div>

      </div>
    </section>
  )
}

export default Companies