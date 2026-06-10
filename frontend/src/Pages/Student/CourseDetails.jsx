import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import Loading from '../../Components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../Components/student/Footers'
import YouTube from 'react-youtube'
import axios from 'axios'
import { toast } from 'react-toastify'

const CourseDetails = () => {
  const {id} = useParams()
  const [openChapter, setOpenChapter] = useState([]);
  const [courseData,setCourseData] = useState(null)
  const [isAlreadyEnrolled,setIsAlreadyEnrolled] = useState(false)
  const [playerData,setPlayerData] = useState(null)

  const {allcourses,calculateRating,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures,currency,backendUrl,userData,getToken } = useContext(AppContext)
 const rating = courseData ? calculateRating(courseData) : 0;

 const getYoutubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    return parsedUrl.searchParams.get("v");
  } catch {
    return null;
  }
};

 //FUNCTION FOR FETCHING COURSE DETAILS
  const fetchCourseData = async()=>{
    try {
      const { data } = await axios.get(backendUrl + '/api/course/' + id)
      if(data.success){
        setCourseData(data.courseData)
      }else{
        toast.error("Error in fetching course details")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



  // FUNCTION FOR ENROLLING THE COURSE
  const enrollCourse = async () => {
    try {
       if(!userData)
        return toast.warning("Login to enroll")
       if(isAlreadyEnrolled)
        return toast.warning("Already Enrolled")
       
       const token = await getToken()

       const {data} = await axios.post(backendUrl + '/api/user/purchase',
        {courseId:courseData._id},{headers:{Authorization:`Bearer ${token}`}}
       )

       if(data.success){
        const {session_url} = data
        window.location.replace(session_url)
       }
       else{
          toast.error(data.message)
       }

    } catch (error) {
      toast.error(error.message)
    }
  }



  useEffect(() => {
  if(allcourses.length > 0){
    fetchCourseData()
  }
}, [allcourses, id])

useEffect(() => {
  if(courseData && userData)
    setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
}, [userData,courseData])
 return courseData ? (
  <>
    <div className="relative min-h-screen bg-[#09090B] text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-yellow-500/5 to-transparent"></div>

      <div className="relative flex md:flex-row flex-col gap-12 justify-between items-start max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-24">

        {/* Left Column */}
        <div className="flex-1">

          {/* Course Title */}
          <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-r from-green-400 to-yellow-400">
            <div className="bg-[#09090B] rounded-2xl px-6 py-4">
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                {courseData.courseTitle}
              </h1>
            </div>
          </div>

          {/* Description */}
          <p
            className="mt-8 text-zinc-400 leading-relaxed text-base md:text-lg"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* Reviews and Ratings */}
          <div className="flex items-center gap-3 mt-8">

            <span className="text-yellow-400 font-semibold text-lg">
              {rating.toFixed(1)}
            </span>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => {
                if (i < Math.floor(rating)) {
                  return (
                    <FaStar
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                    />
                  );
                }

                if (i < rating) {
                  return (
                    <FaStarHalfAlt
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                    />
                  );
                }

                return (
                  <FaRegStar
                    key={i}
                    className="w-4 h-4 text-zinc-600"
                  />
                );
              })}
            </div>

            <span className="text-zinc-500">
              ({courseData.courseRatings.length} Reviews)
            </span>
            <p className='text-zinc-500'>{courseData.enrolledStudents.length} students enrolled</p>
          </div>

      <p className='text-sm pt-3'>Course By <span className='text-yellow-300'>{courseData.educator.name}</span></p>
         

         {/*----------------------------------- course structure -----------------------------------------------*/}
        
<div className="pt-10">
  <h2 className="text-2xl font-semibold text-white mb-5">
    Course Structure
  </h2>

  <div className="space-y-4">
    {courseData.courseContent.map((chapter, index) => (
      <div
        key={index}
        className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm"
      >
        <div
          onClick={() =>
          {
            if(openChapter.includes(index)){
              setOpenChapter(openChapter.filter(i=> i!==index))
            }
            else{
              setOpenChapter([...openChapter,index])
            }
          }
          }
          className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-zinc-800/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <img
              src={assets.down_arrow_icon}
              alt=""
              className={`w-4 transition-transform duration-300 ${
                openChapter.includes(index) 
                  ? "rotate-180"
                  : ""
              }`}
            />

            <p className="font-medium text-white">
              {chapter.chapterTitle}
            </p>
          </div>

          <p className="text-sm text-zinc-400">
            {chapter.chapterContent.length} Lectures •{" "}
            {calculateChapterTime(chapter)}
          </p>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            openChapter.includes(index)
              ? "max-h-[1000px]"
              : "max-h-0"
          }`}
        >
          <div className="border-t border-zinc-800">
            {chapter.chapterContent.map((lecture, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 cursor-pointer" onClick={()=>{
                  if(lecture.isPreviewFree){
                    setPlayerData({
                      videoId:getYoutubeVideoId(lecture.lectureUrl)
                    })
            
                  }
                  else
                  {
                    setPlayerData(null)
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={assets.play_icon}
                    alt=""
                    className="w-4 h-4"
                  />

                  <p className="text-zinc-300 text-sm">
                    {lecture.lectureTitle}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  {lecture.isPreviewFree && (
                    <span  onClick = {()=>{
                      setPlayerData({
                        videoId:getYoutubeVideoId(lecture.lectureUrl)
                      })
                    }}className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 cursor-pointer">
                      Preview 
                    </span>
                  )}

                  <span className="text-zinc-500">
                    {humanizeDuration(
                      lecture.lectureDuration *
                        60 *
                        1000,
                      {
                        units: ["h", "m"],
                      }
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-6 text-zinc-400 text-sm">
    {courseData.courseContent.length} Chapters •{" "}
    {calculateNoOfLectures(courseData)} Lectures •{" "}
    {calculateCourseDuration(courseData)}
  </div>
</div>

{/* ------------------------------course description------------------------- */}
  <div className="mt-12 group animate-fadeIn">
  
  {/* Heading */}
  <div className="inline-block p-[1px] rounded-xl bg-gradient-to-r from-green-400 to-yellow-400 hover:scale-105 transition-all duration-300">
    <div className="bg-[#09090B] rounded-xl px-5 py-3">
      <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
        Course Description
      </h3>
    </div>
  </div>

  {/* Description Card */}
  <div
    className="
      mt-6
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900/60
      backdrop-blur-sm
      p-6
      shadow-lg
      shadow-black/20
      hover:border-green-400/40
      hover:shadow-green-500/10
      hover:-translate-y-1
      transition-all
      duration-500
    "
  >
    <div
      className="  text-zinc-300  leading-8  text-base  md:text-lg  [&_ul]:list-disc  [&_ul]:pl-6  [&_li]:mb-2  [&_strong]:text-white  [&_h1]:text-white  [&_h2]:text-white  [&_h3]:text-white
      "
      dangerouslySetInnerHTML={{
        __html: courseData.courseDescription,
      }}
    />
  </div>

</div>
        </div>

        {/*------------------------------Right Column-------------------------------*/}

<div
  className="
    max-w-[420px]
    w-full
    rounded-3xl
    overflow-hidden
    border
    border-zinc-800
    bg-zinc-900/80
    backdrop-blur-md
    shadow-2xl
    shadow-black/40
    hover:border-green-400/30
    hover:-translate-y-1
    hover:shadow-green-500/10
    transition-all
    duration-500
  "
>
  {/* Thumbnail / Video */}
  <div className="w-full aspect-video overflow-hidden bg-black">
    {playerData ? (
      <YouTube
        videoId={playerData.videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
          },
        }}
        iframeClassName="w-full aspect-video"
      />
    ) : (
      <img
        src={courseData.courseThumbnail}
        alt=""
        className="
          w-full
          h-full
          object-cover
          hover:scale-105
          transition-transform
          duration-700
        "
      />
    )}
  </div>

  <div className="p-6">

    {/* Time Left */}
    <div className="flex items-center gap-2 mb-5">
      <img
        className="w-4 animate-pulse"
        src={assets.time_clock_icon}
        alt=""
      />

      <p className="text-red-400 text-sm font-medium">
        <span className="font-bold">5 Days</span> Left At This Price!
      </p>
    </div>

    {/* Price Section */}
    <div className="flex items-center gap-3 flex-wrap">
      <p
        className="
          text-4xl
          font-bold
          bg-gradient-to-r
          from-green-400
          to-yellow-400
          bg-clip-text
          text-transparent
        "
      >
        {currency}
        {(
          courseData.coursePrice -
          (courseData.discount *
            courseData.coursePrice) /
            100
        ).toFixed(2)}
      </p>

      <p className="text-zinc-500 line-through text-lg">
        {currency}
        {courseData.coursePrice}
      </p>

      <span
        className="
          px-3
          py-1
          rounded-full
          bg-yellow-500/20
          border
          border-yellow-500/20
          text-yellow-400
          text-sm
          font-medium
        "
      >
        {courseData.discount}% OFF
      </span>
    </div>

    {/* Stats */}
    <div
      className="
        flex
        items-center
        gap-4
        pt-5
        text-zinc-400
        text-sm
      "
    >
      <div className="flex items-center gap-1 hover:text-green-400 transition-colors">
        <img
          src={assets.star}
          alt="star icon"
          className="w-4 h-4"
        />
        <p>{calculateRating(courseData).toFixed(1)}</p>
      </div>

      <div className="h-4 w-px bg-zinc-700"></div>

      <div className="flex items-center gap-1 hover:text-green-400 transition-colors">
        <img
          src={assets.time_clock_icon}
          alt="clock icon"
        />
        <p>{calculateCourseDuration(courseData)}</p>
      </div>

      <div className="h-4 w-px bg-zinc-700"></div>

      <div className="flex items-center gap-1 hover:text-green-400 transition-colors">
        <img
          src={assets.lesson_icon}
          alt="lesson icon"
        />
        <p>{calculateNoOfLectures(courseData)} Lessons</p>
      </div>
    </div>

    {/* Enroll Button */}
    <button
      className="
        mt-6
        w-full
        py-3.5
        rounded-xl
        font-semibold
        bg-gradient-to-r
        from-green-400
        to-yellow-400
        text-black
        hover:scale-[1.02]
        hover:shadow-lg
        hover:shadow-green-500/20
        transition-all
        duration-300
      "
      onClick={enrollCourse}
    >
      {isAlreadyEnrolled
        ? "Already Enrolled"
        : "Enroll Now"}
    </button>

    {/* What's Included */}
    <div
      className="
        mt-8
        rounded-2xl
        border
        border-zinc-800
        bg-black/20
        p-5
      "
    >
      <p
        className="
          text-lg
          font-semibold
          bg-gradient-to-r
          from-green-400
          to-yellow-400
          bg-clip-text
          text-transparent
        "
      >
        What's in the course?
      </p>

      <ul
        className="
          mt-4
          space-y-3
          text-zinc-400
          text-sm
        "
      >
        <li>✓ Lifetime access with free updates.</li>
        <li>✓ Step-by-step, hands-on project guidance.</li>
        <li>✓ Downloadable resources and source code.</li>
        <li>✓ Quizzes to test your knowledge.</li>
        <li>✓ Certificate of completion.</li>
      </ul>
    </div>

  </div>
</div>




      </div>
    </div>
    
<Footer/>
   
  
  </>
) : (
  <Loading />
);
}

export default CourseDetails
