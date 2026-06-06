import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../Components/student/Loading'
import { dummyDashboardData } from '../../assets/assets'

import {
  FaUsers,
  FaBookOpen,
  FaIndianRupeeSign,
} from 'react-icons/fa6'

const Dashboard = () => {
  const { currency } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return dashboardData ? (
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
          Dashboard Overview
        </h1>

        <p className="text-zinc-500 mt-3">
          Monitor your courses, students and earnings.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {/* Enrollments */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-[#050505]
            p-6
            hover:-translate-y-2
            hover:border-green-500/30
            transition-all
            duration-500
          "
        >
          <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm">
                Total Enrollments
              </p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {dashboardData.totalEnrollments !== undefined
                  ? dashboardData.totalEnrollments
                  : dashboardData.enrolledStudentsData.length}
              </h2>
            </div>

            <div
              className="
                h-16
                w-16
                rounded-2xl
                bg-green-500/10
                flex
                items-center
                justify-center
              "
            >
              <FaUsers className="text-3xl text-green-400" />
            </div>
          </div>
        </div>

        {/* Courses */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-[#050505]
            p-6
            hover:-translate-y-2
            hover:border-yellow-500/30
            transition-all
            duration-500
          "
        >
          <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm">
                Total Courses
              </p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {dashboardData.totalCourses}
              </h2>
            </div>

            <div
              className="
                h-16
                w-16
                rounded-2xl
                bg-yellow-500/10
                flex
                items-center
                justify-center
              "
            >
              <FaBookOpen className="text-3xl text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-[#050505]
            p-6
            hover:-translate-y-2
            hover:border-green-500/30
            transition-all
            duration-500
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm">
                Total Earnings
              </p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {currency}
                {Math.floor(dashboardData.totalEarnings)}
              </h2>
            </div>

            <div
              className="
                h-16
                w-16
                rounded-2xl
                bg-green-500/10
                flex
                items-center
                justify-center
              "
            >
              <FaIndianRupeeSign className="text-3xl text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Enrollments */}
      <div className="mt-12">

        <div className="flex items-center justify-between mb-5">

          <h2
            className="
              text-2xl
              md:text-3xl
              font-bold
              bg-gradient-to-r
              from-green-400
              via-yellow-400
              to-green-400
              bg-clip-text
              text-transparent
            "
          >
            Latest Enrollments
          </h2>

          <span className="text-zinc-500 text-sm">
            {dashboardData.enrolledStudentsData.length} Students
          </span>

        </div>

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-[#050505]
            shadow-[0_0_30px_rgba(0,0,0,0.4)]
          "
        >
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-zinc-900 border-b border-zinc-800">
                <tr>
                  <th className="px-5 py-4 text-left text-zinc-400">
                    #
                  </th>

                  <th className="px-5 py-4 text-left text-zinc-400">
                    Student
                  </th>

                  <th className="px-5 py-4 text-left text-zinc-400">
                    Course
                  </th>
                </tr>
              </thead>

              <tbody>
                {dashboardData.enrolledStudentsData
                  .slice(0, 10)
                  .map((item, index) => (
                    <tr
                      key={`${item?.student?._id} - ${item?.courseTitle}` || index}
                      className="
                        border-b
                        border-zinc-800
                        hover:bg-zinc-900/60
                        transition-all
                        duration-300
                      "
                    >
                      <td className="px-5 py-4 text-zinc-500">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          {item.student?.imageUrl ? (
                            <img
                              src={item.student.imageUrl}
                              alt=""
                              className="
                                w-10
                                h-10
                                rounded-full
                                object-cover
                                border
                                border-zinc-700
                              "
                            />
                          ) : (
                            <div
                              className="
                                w-10
                                h-10
                                rounded-full
                                bg-zinc-800
                              "
                            />
                          )}

                          <span className="text-white">
                            {item.student?.name ||
                              'Unknown Student'}
                          </span>

                        </div>
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        {item.courseTitle}
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>

            {dashboardData.enrolledStudentsData.length === 0 && (
              <div className="py-10 text-center text-zinc-500">
                No enrollments yet.
              </div>
            )}

          </div>
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

export default Dashboard