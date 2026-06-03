import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'

const CourseDetails = () => {
  const {id} = useParams()

  const [courseData,setCourseData] = useState(null)

  const {allcourses} = useContext(AppContext)

  const fetchCourseData = async()=>{
    let findCourse = allcourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  useEffect(()=>{
 fetchCourseData()
  },[])
  return (
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>

<div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>
 

     {/*left coloumn */}
  <div></div>
 

 {/* right coloumn */}

  <div></div>


    </div>
  )
}

export default CourseDetails
