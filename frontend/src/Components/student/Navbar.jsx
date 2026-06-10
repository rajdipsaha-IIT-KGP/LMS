import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const {navigate,isEducator,backendUrl,setIsEducator,getToken} = useContext(AppContext)
  const location = useLocation();
  
  const isCourseListsPage =
    location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();


  const becomeEducator = async () => {
    try {
      if(isEducator){
        navigate('/educator')
        return;
      }
      const token = await getToken()

      const { data } = await axios.get(backendUrl+'/api/educator/update-role',{headers:{Authorization:`Bearer ${token}`}})

      if(data.success)
      {
        setIsEducator(true)
        toast.success(data.message)

      }
      else{
        toast.error("error becoming an educator")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
   <nav
  className="
  sticky top-0 z-50
  h-20
  flex items-center justify-between
  px-4 sm:px-8 lg:px-16
  bg-black
  border-b border-zinc-800
  "
>
      {/* Logo */}
      <Link to="/">
        <img onClick={()=>navigate('/')}
          src={assets.logo_dark}
          alt="logo"
          className="w-30 sm:w-20   lg:w-30 brightness-110"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {user && (
          <div className="flex items-center gap-4 text-gray-300">
            <button className="font-medium hover:text-green-400 transition duration-300 cursor-pointer" onClick={
              becomeEducator
            }>
              {!isEducator ? 'Become Educator':'Educator Dashboard'} 
            </button>

            <span className="text-gray-600">|</span>

            <Link
              to="/my-enrollments"
              className="font-medium hover:text-green-400 transition duration-300"
            >
              My Enrollments
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="
              bg-green-500
              hover:bg-green-400
              text-black
              font-semibold
              px-6
              py-3
              rounded-full
              shadow-lg
              shadow-green-500/20
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-3 text-sm">
        {user && (
          <div className="flex items-center gap-2 text-gray-300">
            <button className="hover:text-green-400 transition" onClick={becomeEducator}>
               {!isEducator ? 'Become Educator':'Educator Dashboard'} 
            </button>

            <span className="text-gray-600">|</span>

            <Link
              to="/my-enrollments"
              className="hover:text-green-400 transition"
            >
              Enrollments
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="
              p-2
              rounded-full
              bg-white/5
              hover:bg-white/10
              transition
            "
          >
            <img
              src={assets.user_icon}
              alt=""
              className="w-6 h-6 invert"
            />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;