import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../Components/student/Loading'
import { FaBookOpen } from 'react-icons/fa'

const MyCourses = () => {
  const { allcourses } = useContext(AppContext)

  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    setCourses(allcourses)
  }

  useEffect(() => {
    fetchEducatorCourses()
  }, [allcourses])

  return courses ? (
    <div className="min-h-screen p-4 md:p-8">

      {/* Header */}
      <div className="mb-10">
        <h1
          className="
            text-4xl
            md:text-5xl
            font-bold
            bg-gradient-to-r
            from-green-400
            via-yellow-400
            to-green-400
            bg-clip-text
            text-transparent
          "
        >
          My Courses
        </h1>

        <p className="text-zinc-500 mt-3">
          Manage and monitor all your published courses.
        </p>
      </div>

      {/* Table Card */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-zinc-800
          bg-[#050505]
          shadow-[0_0_30px_rgba(0,0,0,0.5)]
        "
      >
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-900 border-b border-zinc-800">
              <tr>
                <th className="px-3 md:px-6 py-4 text-left text-zinc-400">
                  Course
                </th>

                <th className="hidden md:table-cell px-6 py-4 text-left text-zinc-400">
                  Students
                </th>

                <th className="px-3 md:px-6 py-4 text-left text-zinc-400">
                  Published
                </th>
              </tr>
            </thead>

            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-4">

                      <FaBookOpen className="text-5xl text-zinc-700" />

                      <p className="text-zinc-500">
                        No courses found.
                      </p>

                    </div>
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr
                    key={course._id}
                    className="
                      border-b
                      border-zinc-800
                      hover:bg-zinc-900/60
                      transition-all
                      duration-300
                    "
                  >
                    {/* Course */}
                    <td className="px-3 md:px-6 py-4">

                      <div className="flex items-center gap-3 md:gap-4">

                        <div className="overflow-hidden rounded-xl flex-shrink-0">
                          <img
                            src={course.courseThumbnail}
                            alt={course.courseTitle}
                            className=" w-16 h-10 md:w-24 md:h-14 object-cover transition-all duration-500 hover:scale-110
                            "
                          />
                        </div>

                        <div className="min-w-0">

                          <p
                            className="
                              text-white
                              font-medium
                              text-sm
                              md:text-base
                              truncate
                            "
                          >
                            {course.courseTitle}
                          </p>

                          <p
                            className="
                              text-zinc-500
                              text-xs
                              md:text-sm
                            "
                          >
                            ID: {course._id.slice(0, 8)}
                          </p>

                          {/* Mobile Students */}
                          <div className="md:hidden mt-2">
                            <span
                              className="
                                px-2
                                py-1
                                rounded-full
                                bg-green-500/10
                                border
                                border-green-500/20
                                text-green-400
                                text-xs
                              "
                            >
                              {course.enrolledStudents.length} Students
                            </span>
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* Desktop Students */}
                    <td className="hidden md:table-cell px-6 py-4">
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          bg-green-500/10
                          border
                          border-green-500/20
                          text-green-400
                          text-sm
                        "
                      >
                        {course.enrolledStudents.length} Students
                      </span>
                    </td>

                    {/* Published Date */}
                    <td
                      className="
                        px-3
                        md:px-6
                        py-4
                        text-zinc-400
                        text-xs
                        md:text-sm
                        whitespace-nowrap
                      "
                    >
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>

      {/* Ambient Glow */}
      <div className="relative mt-16 h-32">
        <div className="absolute left-1/4 w-60 h-60 bg-green-500/10 blur-[120px] rounded-full"></div>

        <div className="absolute right-1/4 w-60 h-60 bg-yellow-500/10 blur-[120px] rounded-full"></div>
      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default MyCourses