import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Searchbar = ({data}) => {
 
  const navigate = useNavigate();
  const [input,setInput] = useState(data ? data : "")

  const onSearchHandler = (e) => {
  e.preventDefault();

  navigate('/course-list/' + input);
};

  return (
    <form onSubmit={ onSearchHandler}
      className="
        max-w-2xl
        w-full
        md:h-16
        h-14
        flex
        items-center
        bg-zinc-900/80
        backdrop-blur-xl
        border
        border-zinc-700
        rounded-2xl
        overflow-hidden
        shadow-lg
        shadow-black/40
        transition-all
        duration-300
        hover:border-green-500/50
        hover:shadow-green-500/10
      "
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="w-12 px-4 opacity-70 invert"
      />

      <input value = {input} onChange={(e)=>{
    setInput(e.target.value)
      }}
        type="text"
        placeholder="Search For Courses"
        className="
          flex-1
          h-full
          bg-transparent
          text-white
          placeholder:text-gray-500
          outline-none
          text-base
        "
      />

      <button
        type="submit"
        className="
          h-full
          px-8
          bg-gradient-to-r from-green-400 to-yellow-400 
          text-black
          font-semibold
          transition-all
          duration-300
          hover:bg-green-400
          hover:px-10
          active:scale-95
        "
      >
        Search
      </button>
    </form>
  )
}

export default Searchbar