import React, { useEffect, useState } from 'react'
import Loading from '../../Components/student/Loading'
import { dummyStudentEnrolled } from '../../assets/assets'
import { FaUserGraduate } from 'react-icons/fa'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const StudentsEnrolled = () => {

  const {backendUrl,getToken,isEducator} = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/educator/enrolled-students',
        {headers:{Authorization:`Bearer ${token}`}}
      )
      if(data.success){
        setEnrolledStudents(data.enrolledStudents.reverse())
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(isEducator)
    fetchEnrolledStudents()
  }, [isEducator])

  return enrolledStudents ? (
    <div className="min-h-screen p-4 md:p-8">

      {/* Heading */}
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
          Students Enrolled
        </h1>

        <p className="text-zinc-500 mt-3">
          Track all students enrolled in your courses.
        </p>
      </div>

      {/* Table Container */}
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
                <th className="hidden md:table-cell px-6 py-4 text-left text-zinc-400">
                  #
                </th>

                <th className="px-3 md:px-6 py-4 text-left text-zinc-400">
                  Student
                </th>

                <th className="px-3 md:px-6 py-4 text-left text-zinc-400">
                  Course
                </th>

                <th className="hidden md:table-cell px-6 py-4 text-left text-zinc-400">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>

              {enrolledStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-16 text-center">

                    <div className="flex flex-col items-center gap-4">

                      <FaUserGraduate className="text-5xl text-zinc-700" />

                      <p className="text-zinc-500">
                        No students enrolled yet.
                      </p>

                    </div>

                  </td>
                </tr>
              ) : (
                enrolledStudents.map((item, index) => (
                  <tr
                    key={`${item.student._id}-${index}`}
                    className="
                      border-b
                      border-zinc-800
                      hover:bg-zinc-900/60
                      transition-all
                      duration-300
                    "
                  >
                    {/* Index */}
                    <td className="hidden md:table-cell px-6 py-4 text-zinc-500">
                      {index + 1}
                    </td>

                    {/* Student */}
                    <td className="px-3 md:px-6 py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={item.student.imageUrl}
                          alt={item.student.name}
                          className="
                            w-10
                            h-10
                            rounded-full
                            object-cover
                            border
                            border-green-500/20
                          "
                        />

                        <div>
                          <p className="text-white font-medium">
                            {item.student.name}
                          </p>

                          {/* Mobile Date */}
                          <p className="md:hidden text-xs text-zinc-500 mt-1">
                            {new Date(
                              item.purchaseDate
                            ).toLocaleDateString()}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Course */}
                    <td className="px-3 md:px-6 py-4">

                      <span
                        className="
                          text-zinc-300
                          text-sm
                          md:text-base
                        "
                      >
                        {item.courseTitle}
                      </span>

                    </td>

                    {/* Desktop Date */}
                    <td className="hidden md:table-cell px-6 py-4 text-zinc-400">
                      {new Date(
                        item.purchaseDate
                      ).toLocaleDateString()}
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

export default StudentsEnrolled