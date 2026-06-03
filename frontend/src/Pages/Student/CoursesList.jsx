import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Searchbar from '../../Components/student/Searchbar'
import { useParams } from 'react-router-dom'
import Coursecard from '../../Components/student/Coursecard'
import Footer from '../../Components/student/Footers'

const CoursesList = () => {
  const { navigate, allcourses } = useContext(AppContext)
  const { input } = useParams()

  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    let tempCourses = []

    if (allcourses && allcourses.length > 0) {
      tempCourses = allcourses.slice()
    }

    input
      ? setFilteredCourse(
          tempCourses.filter((item) =>
            item.courseTitle
              .toLowerCase()
              .includes(input.toLowerCase())
          )
        )
      : setFilteredCourse(tempCourses)
  }, [allcourses, input])

  return (
    <>
    <section className="min-h-screen bg-black text-white pt-24 px-4 md:px-10 lg:px-20">

      {/* Hero/Header */}
      <div className="max-w-7xl mx-auto">

        <div className="relative">

          {/* Background Glow */}
          <div className="absolute left-0 top-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full"></div>

          <div className="absolute right-0 top-0 w-72 h-72 bg-yellow-400/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            {/* Heading */}
            <div className="relative inline-block">

              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-yellow-400/20 to-green-500/20 blur-[70px] scale-150 rounded-full"></div>

              <h1 className="relative text-4xl md:text-6xl font-bold text-white">
                Explore Our{" "}
                <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Courses
                </span>
              </h1>

            </div>

            {/* Breadcrumb */}
            <p className="mt-5 text-zinc-400">

              <span
                onClick={() => navigate('/')}
                className="cursor-pointer hover:text-green-400 transition-colors"
              >
                Home
              </span>

              <span className="mx-2 text-zinc-600">/</span>

              <span onClick={() => navigate('/course-list')} className='cursor-pointer hover:text-green-500'>All Courses</span>

              {input && (
                <>
                  <span className="mx-2 text-zinc-600">/</span>

                  <span className="text-green-400">
                    {input}
                  </span>
                </>
              )}
            </p>

          </div>

        </div>

        {/* Searchbar */}
        <div className="mt-10 flex justify-center">
          <Searchbar data={input} />
        </div>

        {/* Results Count */}
        <div className="mt-12">
          <p className="text-zinc-500">
            {filteredCourse.length} Course
            {filteredCourse.length !== 1 ? 's' : ''} Found
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourse.length > 0 ? (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-8
              mt-8
              pb-20
            "
          >
            {filteredCourse.map((course, index) => (
              <Coursecard
                key={index}
                course={course}
              />
            ))}
          </div>

        ) : (

          /* No Courses Found */

          <div className="flex flex-col items-center justify-center py-28">

            <div className="relative">

              <div className="absolute inset-0 bg-green-500/10 blur-[80px] rounded-full"></div>

              <div className="relative text-8xl">
                🔍
              </div>

            </div>

            <h2 className="mt-8 text-3xl md:text-4xl font-bold text-white">
              No Courses Found
            </h2>

            <p className="mt-4 text-zinc-400 text-center max-w-lg leading-relaxed">
              We couldn't find any courses matching
              <span className="text-green-400">
                {" "} "{input}"{" "}
              </span>
              .
              Try another search term or browse all available courses.
            </p>

            <button
              onClick={() => navigate('/course-list')}
              className="
                mt-8
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
                duration-300
              "
            >
              Browse All Courses
            </button>

          </div>

        )}

      </div>

    </section>
    <Footer/>
    </>
  )
}

export default CoursesList