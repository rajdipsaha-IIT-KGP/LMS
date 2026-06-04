import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B]">
      <div className="flex flex-col items-center gap-5">

        {/* Spinner */}
        <div
          className="
            w-14
            h-14
            rounded-full
            border-4
            border-zinc-800
            border-t-green-400
            border-r-yellow-400
            animate-spin
          "
        />

        {/* Text */}
        <p className="text-zinc-400 text-sm tracking-wider">
          Loading...
        </p>

      </div>
    </div>
  )
}

export default Loading