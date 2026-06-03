import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import Coursecard from './Coursecard'

const CoursesSection = () => {
  const { allcourses } = useContext(AppContext)

  return (
    <section className="w-full bg-black py-24 px-4">

      <div className="max-w-7xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-green-400 font-medium">
            Top Rated Courses
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Learn from the{' '}
          <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            best
          </span>
        </h2>

        <p className="text-zinc-400 max-w-2xl mx-auto mt-5 leading-relaxed">
          Discover our top-rated courses across various categories.
          From coding and design to business and wellness,
          our courses are crafted to deliver real results.
        </p>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {allcourses.slice(0, 4).map((course, index) => (
            <Coursecard
              key={index}
              course={course}
            />
          ))}
        </div>

        {/* Button */}
        <div className="mt-14">
          <Link
            to={'/course-list'}
            onClick={() => scrollTo(0, 0)}
           className="
inline-flex
items-center
justify-center
px-8
py-4

bg-white/5
backdrop-blur-md
border
border-green-400
bg-gradient-to-r
from-green-400
to-yellow-400
bg-clip-text
text-transparent
font-semibold
text-lg
shadow-[0_8px_32px_rgba(0,0,0,0.35)]
hover:border-green-500
hover:bg-green-500/10
hover:text-green-400
hover:scale-105
transition-all
duration-300
"
          >
            Show All Courses
          </Link>
        </div>

      </div>
    </section>
  )
}

export default CoursesSection