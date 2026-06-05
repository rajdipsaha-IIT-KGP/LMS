import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../Components/student/Footers'
import Rating from '../../Components/student/Rating'

const Player = () => {
  const { courseId } = useParams()

  const [openChapter, setOpenChapter] = useState([])
  const [courseData, setCourseData] = useState(null)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  const {
    allcourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
    enrolledCourses,
  } = useContext(AppContext)

  const getCourseData = async () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course)
      }
    })
  }

  useEffect(() => {
    if (allcourses.length > 0) {
      getCourseData()
    }
  }, [enrolledCourses])
 console.log(playerData)
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">

        {/* Background Glow */}
        <div className="fixed left-0 top-32 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="fixed right-0 top-32 w-96 h-96 bg-yellow-400/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 pt-24">

          {/* Header */}
          <div className="mb-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

              <span className="text-xs font-medium text-green-400">
                Learning Dashboard
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold">

              Course{' '}

              <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                Structure
              </span>

            </h1>

            <p className="text-zinc-400 mt-4">
              Browse all chapters and continue learning.
            </p>

          </div>

          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10">

            {/* LEFT COLUMN */}
            <div>

              <div className="space-y-5">

                {courseData?.courseContent?.map((chapter, index) => (
                  
                  <div
                    key={index}
                    className="
                      rounded-3xl overflow-hidden border border-zinc-800 bg-[#050505] hover:border-green-500/20 transition-all duration-300
                    "
                  >

                    {/* Chapter Header */}
                    <div
                      onClick={() => {
                        if (openChapter.includes(index)) {
                          setOpenChapter(
                            openChapter.filter((i) => i !== index)
                          )
                        } else {
                          setOpenChapter([
                            ...openChapter,
                            index,
                          ])
                        }
                      }}
                      className=" flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-zinc-900/50 transition-all
"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={assets.down_arrow_icon}
                          alt=""
                          className={`w-4 transition-transform duration-300 ${
                            openChapter.includes(index)
                              ? 'rotate-180'
                              : ''
                          }`}
                        />

                        <p className="font-medium text-white text-lg">
                          {chapter.chapterTitle}
                        </p>

                      </div>

                      <p className="text-sm text-zinc-400">
                        {chapter.chapterContent.length} Lectures •{' '}
                        {calculateChapterTime(chapter)}
                      </p>

                    </div>

                    {/* Chapter Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openChapter.includes(index)
                          ? 'max-h-[1000px]'
                          : 'max-h-0'
                      }`}
                    >

                      <div className="border-t border-zinc-800">

                        {chapter.chapterContent.map((lecture, i) => (

                          <div
                            key={i}
                            onClick={() => {
                              console.log("Lecture clicked")
                             console.log(lecture)
                              if (lecture.lectureUrl) {
                                setPlayerData({
                                  ...lecture,chapter : index + 1,lecture:i+1,videoId:lecture.lectureUrl.split('/').pop()

                                })
                              } else {
                                setPlayerData(null)
                              }
                            }}
                            className="
                              flex
                              items-center
                              justify-between
                              px-6
                              py-4
                              cursor-pointer
                              hover:bg-gradient-to-r
                              hover:from-green-500/5
                              hover:to-yellow-500/5
                              transition-all
                              duration-300
                            "
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

                              {lecture.lectureUrl && (
                                <span
                                  onClick={() => {
                                    console.log("Lecture clicked")
                                   console.log(lecture)
                                    setPlayerData({
                                      ...lecture,chapter : index + 1,lecture:i+1,videoId:lecture.lectureUrl.split('/').pop()
                                    })
                                  }}
                                  className=" px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all
                                  "
                                >
                                  Watch
                                </span>
                              )}

                              <span className="text-zinc-500">
                                {humanizeDuration(
                                  lecture.lectureDuration *
                                    60 *
                                    1000,
                                  {
                                    units: ['h', 'm'],
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
            <div className="mt-12 p-6 rounded-3xl border border-zinc-800 bg-[#050505]">

  <div className="flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold text-white">
        Rate This Course
      </h2>

      <p className="text-zinc-400 text-sm mt-1">
        Share your experience with other learners
      </p>
    </div>

    <Rating initialRating={0} />
  </div>

</div>
            </div>

            {/* RIGHT COLUMN PLACEHOLDER */}
         <div
  className=" sticky top-24 h-fit rounded-3xl overflow-hidden border border-zinc-800 bg-[#050505] shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-green-500/20 transition-all duration-500
  "
>

  {/* Video Section */}
  <div className="relative overflow-hidden">

    {/* Glow */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500/5 via-transparent to-yellow-500/5 pointer-events-none z-10"></div>

    {playerData ? (

   <div
  className=" bg-[#050505] rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-green-500/20 transition-all duration-500
  "
>
  <YouTube
    videoId={playerData.videoId}
    opts={{
      playerVars: {
        autoplay: 0,
      },
    }}
    iframeClassName="w-full aspect-video"
  />

  <div className="p-5">

    <div className="flex items-center justify-between gap-4">

      <div>
        <p className="text-xs uppercase tracking-wider text-green-400 mb-1">
          Now Playing
        </p>

        <p className="text-white font-medium text-lg">
          {playerData.chapter}.{playerData.lecture}{" "}
          {playerData.lectureTitle}
        </p>
      </div>

      <button
        className={`
          px-4
          py-2
          rounded-full
          text-sm
          font-medium
          transition-all
          duration-300
          ${
            false
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20"
          }
        `}
      >
        {false ? "Completed" : "Mark Complete"}
      </button>

    </div>

  </div>
</div>

    ) : (

      <div className="relative group overflow-hidden">

        <img
          src={courseData?.courseThumbnail}
          alt=""
          className=" w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700
          "
        />

        <div
          className=" absolute  flex items-center justify-center
          "
        >
          
        </div>

      </div>

    )}

  </div>

  {/* Content */}
  <div className="p-6">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

      <span className="text-xs text-green-400 font-medium">
        Continue Learning
      </span>
    </div>

    {/* Title */}
    <h2 className="text-2xl font-bold text-white leading-tight">
      {courseData?.courseTitle}
    </h2>

    {/* Current Lecture */}
    {playerData && (
      <div className="mt-5 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">

        <p className="text-xs text-zinc-500 uppercase tracking-wider">
          Currently Watching
        </p>

        <h3 className="text-white font-medium mt-2">
          {playerData.lectureTitle}
        </h3>

        <p className="text-green-400 text-sm mt-1">
          Chapter {playerData.chapter} • Lecture {playerData.lecture}
        </p>

      </div>
    )}

    {/* Stats */}
    <div className="mt-6 space-y-4">

      <div className="flex items-center justify-between">

        <span className="text-zinc-500">
          Duration
        </span>

        <span className="text-white font-medium">
          {courseData &&
            calculateCourseDuration(courseData)}
        </span>

      </div>

      <div className="flex items-center justify-between">

        <span className="text-zinc-500">
          Lectures
        </span>

        <span className="text-white font-medium">
          {courseData &&
            calculateNoOfLectures(courseData)}
        </span>

      </div>

      <div className="flex items-center justify-between">

        <span className="text-zinc-500">
          Rating
        </span>

        <span className="text-yellow-400 font-medium">
          ⭐ {courseData &&
            calculateRating(courseData)}
        </span>

      </div>

    </div>

 

    {/* Button */}
    <button
      className=" mt-8 w-full py-4 rounded-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 text-black font-semibold shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:scale-105 hover:shadow-[0_0_35px_rgba(34,197,94,0.45)] transition-all duration-300
      "
    >
      Continue Course →
    </button>

  </div>

</div>

          </div>

        </div>

      </div>
      <Footer/>
    </>
  )
}

export default Player