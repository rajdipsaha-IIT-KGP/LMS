import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import {useAuth,useUser} from '@clerk/react'
export const AppContext = createContext()

export const AppContextProvider = (props)=>{

const currency = import.meta.env.VITE_CURRENCY
const navigate = useNavigate();
const [allcourses,setAllcourses] = useState([])
const [isEducator,setIsEducator] = useState(true)
const [enrolledCourses,setEnrolledCourses] = useState([])

const {getToken} = useAuth()
const {user} = useUser()

//fetch all courses

const fetchAllCourses = async()=>{
   setAllcourses(dummyCourses)
}

// Function calculating avg rating of courses

const calculateRating = (course) => {
  if (!course || !course.courseRatings) return 0;

  if (course.courseRatings.length === 0) return 0;

  let totalRating = 0;

  course.courseRatings.forEach((rating) => {
    totalRating += rating.rating;
  });

  return totalRating / course.courseRatings.length;
};

// Calculate Course Chapter Time

const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture)=>(
      time += lecture.lectureDuration
    ))
    return humanizeDuration(time*60*1000,{units:["h","m"]} )
}

//Function to calculate Course Duration

const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter)=>(
        chapter.chapterContent.map((lecture)=>
        time += lecture.lectureDuration
        ) 
    ))
    return humanizeDuration(time*60*1000,{units:["h","m"]} )
}

//Function to calculate total number of lecture in Course 

const calculateNoOfLectures = (course) => {
  if (!course?.courseContent) return 0;

  let totalLectures = 0;

  course.courseContent.forEach(chapter => {
    totalLectures += chapter.chapterContent?.length || 0;
  });

  return totalLectures;
};

//Fetch user enrolled courses

const fetchUserEnrolledCourses = async()=>{
  setEnrolledCourses(dummyCourses)
}

  useEffect(()=>{
 fetchAllCourses()
 fetchUserEnrolledCourses()
  },[])

const logToken = async()=>{
  const token = await getToken()
  console.log(await getToken())
   const res = await fetch(
    "http://localhost:8000/api/educator/update-role",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);
}


  useEffect(()=>{
     if(user)
      logToken()
  },[user])
    const value = {
         currency , allcourses , navigate ,calculateRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures,enrolledCourses,setEnrolledCourses,fetchUserEnrolledCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}