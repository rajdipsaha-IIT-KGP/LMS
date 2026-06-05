import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../Components/student/Footers'

const MyEnrollments = () => {

  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate
  } = useContext(AppContext)

  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 3, totalLectures: 4 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 10 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 }
  ])

  return (
    <>
    <section className="min-h-screen bg-black text-white pt-24 px-4 md:px-10 lg:px-20 overflow-hidden">

      {/* Background Glow */}
      <div className="fixed left-0 top-32 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="fixed right-0 top-32 w-96 h-96 bg-yellow-400/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="mb-12">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

            <span className="text-xs text-green-400 font-medium">
              Learning Dashboard
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">

            My{" "}

            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              Enrollments
            </span>

          </h1>

          <p className="text-zinc-400 mt-4">
            Track your learning progress and continue your journey.
          </p>

        </div>

        {/* Empty State */}
        {enrolledCourses.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24">

            <div className="text-7xl mb-6">
              📚
            </div>

            <h2 className="text-3xl font-bold">
              No Enrollments Yet
            </h2>

            <p className="text-zinc-400 mt-3">
              Start learning by enrolling in your first course.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {enrolledCourses.map((course, index) => {

              const progress =
                progressArray[index]
                  ? (progressArray[index].lectureCompleted * 100) /
                    progressArray[index].totalLectures
                  : 0

              const completed =
                progressArray[index] &&
                progressArray[index].lectureCompleted ===
                  progressArray[index].totalLectures

              return (

                <div
                  key={index}
                  className="
                    group
                    p-[1px]
                    rounded-3xl
                    bg-gradient-to-r
                    from-green-500/20
                    via-yellow-400/20
                    to-green-500/20
                    hover:from-green-400/40
                    hover:via-yellow-300/40
                    hover:to-green-400/40
                    transition-all
                    duration-500
                  "
                >

                  <div
                    className="
                      bg-[#050505]
                      rounded-3xl
                      p-5
                      md:p-6
                      hover:bg-[#080808]
                      transition-all
                      duration-500
                    "
                  >

                    <div className="flex flex-col md:flex-row md:items-center gap-5">

                      {/* Thumbnail */}
                      <img
                        src={course.courseThumbnail}
                        alt=""
                        className="
                          w-full
                          md:w-48
                          h-28
                          object-cover
                          rounded-2xl
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />

                      {/* Content */}
                      <div className="flex-1">

                        <h2 className="text-xl font-semibold text-white">
                          {course.courseTitle}
                        </h2>

                        <p className="text-zinc-400 mt-2">
                          Duration: {calculateCourseDuration(course)}
                        </p>

                        {/* Progress */}
                        <div className="mt-5">

                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-400">
                              Progress
                            </span>

                            <span className="text-green-400 font-medium">
                              {Math.round(progress)}%
                            </span>
                          </div>

                          <Line
                            percent={progress}
                            strokeWidth={2}
                            strokeColor="#22c55e"
                            trailColor="#27272a"
                            className="rounded-full"
                          />

                        </div>

                        {/* Lectures */}
                        <p className="mt-3 text-sm text-zinc-500">
                          {progressArray[index]?.lectureCompleted || 0}
                          {" / "}
                          {progressArray[index]?.totalLectures || 0}
                          {" "}Lectures Completed
                        </p>

                      </div>

                      {/* Right Side */}
                      <div className="flex flex-col items-start md:items-end gap-4">

                        <span
                          className={`
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-medium
                            border
                            ${
                              completed
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }
                          `}
                        >
                          {completed ? 'Completed' : 'On Going'}
                        </span>

                        <button
                          onClick={() =>
                            navigate('/player/' + course._id)
                          }
                          className="
                            px-6
                            py-3
                            rounded-full
                            bg-gradient-to-r
                            from-green-400
                            via-green-500
                            to-emerald-500
                            text-black
                            font-semibold
                            hover:scale-105
                            transition-all
                            duration-300
                            shadow-[0_0_20px_rgba(34,197,94,0.25)]
                          "
                        >
                          Continue Learning →
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              )
            })}

          </div>

        )}

      </div>

    </section>
    <Footer/>
    </>
  )
}

export default MyEnrollments