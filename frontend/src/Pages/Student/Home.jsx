import React from 'react';
import Hero from '../../Components/student/Hero';
import Companies from '../../Components/student/Companies';
import CoursesSection from '../../Components/student/CoursesSection';

const Home = () => { 
  return ( 
    <main 
      className="
        flex 
        flex-col 
        w-full 
        min-h-screen 
        bg-black 
        text-white 
        selection:bg-emerald-500/30 
        selection:text-emerald-200
      "
    >
      <Hero /> 
      <Companies /> 
      <div className="w-full flex justify-center py-2">
  <div className="h-px w-[95%] bg-gradient-to-r from-transparent via-green-400/70 to-transparent shadow-[0_0_12px_rgba(34,197,94,0.3)]"></div>
</div>
      <CoursesSection/>
    </main> 
  );
};

export default Home;