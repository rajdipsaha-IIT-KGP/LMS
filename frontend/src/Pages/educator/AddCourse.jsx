import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const AddCourse = () => {
  const quillRef = useRef(null)
  const editorRef = useRef(null)
  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const {backendUrl,getToken} = useContext(AppContext)
  const [loading,setLoading] = useState(false)
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  useEffect(() => {
  if (!quillRef.current && editorRef.current) {
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
    });

    console.log("Quill initialized");
  }
}, []);


  const handleChapter = (action,chapterId)=>{
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const handleSubmit = async(e)=>{
       e.preventDefault();
       try {
        setLoading(true)
        if(!image)
          toast.error("Thumbnail Required")
        const courseData = {
          courseTitle,
          courseDescription : quillRef.current.root.innerHTML,
          coursePrice:Number(coursePrice),
          discount:Number(discount),
          courseContent:chapters,
        }
        const formData = new FormData()
        formData.append('courseData',JSON.stringify(courseData))
        formData.append('image',image)

        const token = await getToken()
        const {data} = await axios.post(backendUrl + '/api/educator/add-course',formData,
          {headers:{Authorization:`Bearer ${token}`}}
        )
        if(data.success){
          toast.success(data.message)
          setCourseTitle("")
          setCoursePrice(0)
          setDiscount(0)
          setImage(null)
          setChapters([])
         quillRef.current.root.innerHTML = ""
        }
        else{
          toast.error(data.message)
        }
       } catch (error) {
         toast.error(error.message)
       }
       finally{
        setLoading(false)
       }
  }
 useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);


  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  return (
  <div className="min-h-screen overflow-y-auto p-4 md:p-8 bg-black text-white relative">

    {/* Background Glow */}
    <div className="fixed left-0 top-40 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full pointer-events-none"></div>

    <div className="fixed right-0 top-40 w-96 h-96 bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none"></div>

    {/* Heading */}
    <div className="mb-8 relative z-10">
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
        Add Course
      </h1>

      <p className="text-zinc-500 mt-2">
        Create and publish a new course for your students.
      </p>
    </div>

    <form
      onSubmit={(e) => handleSubmit(e)}
      className="
        relative
        z-10
        flex
        flex-col
        gap-6
        max-w-5xl
        w-full
        text-zinc-300
        bg-[#050505]
        border
        border-zinc-800
        rounded-3xl
        p-6
        md:p-8
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
      "
    >

      {/* Course Title */}
      <div className="flex flex-col gap-2">
        <p className="text-zinc-400 font-medium">
          Course Title
        </p>

        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Enter course title..."
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            text-white
            outline-none
            focus:border-green-500
            transition-all
          "
          required
        />
      </div>

      {/* Description */}
<div className="flex flex-col gap-2">
  <p className="text-zinc-400 font-medium text-lg">
    Course Description
  </p>

  <div
    className="
      rounded-2xl
      overflow-hidden
      border
      border-zinc-800
      bg-zinc-900
      shadow-[0_0_20px_rgba(0,0,0,0.4)]
    "
  >
    <div
      ref={editorRef}
      className="
        min-h-[300px]
        text-white
      "
    ></div>
  </div>
</div>

      {/* Price + Thumbnail */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Price */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-400 font-medium">
            Course Price
          </p>

          <input
            type="number"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            placeholder="0"
            className="
              bg-zinc-900
              border
              border-zinc-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-green-500
            "
            required
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-2">
          <p className="text-zinc-400 font-medium">
            Course Thumbnail
          </p>

          <label
            htmlFor="thumbnailImage"
            className="
              flex
              items-center
              gap-4
              cursor-pointer
            "
          >
            <div
              className="
                p-4
                rounded-2xl
                bg-gradient-to-r
                from-green-500/20
                to-yellow-500/20
                border
                border-green-500/20
              "
            >
              <img
                src={assets.file_upload_icon}
                alt=""
                className="w-6 h-6"
              />
            </div>

            <input
              type="file"
              id="thumbnailImage"
              hidden
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="
                  h-16
                  rounded-xl
                  border
                  border-zinc-700
                "
              />
            )}
          </label>
        </div>

      </div>

      {/* Discount */}
      <div className="flex flex-col gap-2 max-w-xs">
        <p className="text-zinc-400 font-medium">
          Discount %
        </p>

        <input
          type="number"
          min={0}
          max={100}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="0"
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-xl
            px-4
            py-3
            text-white
            outline-none
            focus:border-green-500
          "
          required
        />
      </div>

      {/* adding chapters and lectures */}
<div className="mt-4">

  {chapters.map((chapter, chapterIndex) => (
    <div
      key={chapterIndex}
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        mb-4
        overflow-hidden
      "
    >
      {/* Chapter Header */}
      <div
        className="
          flex
          justify-between
          items-center
          p-4
          border-b
          border-zinc-800
          hover:bg-zinc-800/40
          transition-all
        "
      >
        <div className="flex items-center gap-3">
          <img
            src={assets.dropdown_icon}
            alt=""
            width={14}
            onClick={() => {
              handleChapter('toggle', chapter.chapterId)
            }}
            className={`
              cursor-pointer
              transition-all
              ${chapter.collapsed && '-rotate-90'}
            `}
          />

          <span className="font-semibold text-white">
            Chapter {chapterIndex + 1} : {chapter.chapterTitle}
          </span>
        </div>

        <div className="flex items-center gap-4">

          <span className="text-zinc-500 text-sm">
            {chapter.chapterContent.length} Lectures
          </span>

          <img
            src={assets.cross_icon}
            alt=""
            className="cursor-pointer w-4 hover:scale-110 transition-all"
            onClick={() => {
              handleChapter('remove', chapter.chapterId)
            }}
          />

        </div>
      </div>

      {/* Chapter Content */}
      {!chapter.collapsed && (
        <div className="p-4">

          {chapter.chapterContent.map(
            (lecture, lectureIndex) => (
              <div
                key={lectureIndex}
                className="
                  flex
                  justify-between
                  items-center
                  p-3
                  mb-3
                  rounded-xl
                  bg-zinc-800/40
                  border
                  border-zinc-700
                "
              >
                <div className="flex flex-col gap-1">

                  <span className="text-white font-medium">
                    {lectureIndex + 1}. {lecture.lectureTitle}
                  </span>

                  <div className="flex flex-wrap gap-3 text-sm text-zinc-400">

                    <span>
                      ⏱ {lecture.lectureDuration} mins
                    </span>

                    <a
                      href={lecture.lectureUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      Lecture Link
                    </a>

                    <span
                      className={`
                        ${
                          lecture.isPreviewFree
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }
                      `}
                    >
                      {lecture.isPreviewFree
                        ? 'Free Preview'
                        : 'Paid'}
                    </span>

                  </div>
                </div>

                <img
                  src={assets.cross_icon}
                  alt=""
                  className="
                    cursor-pointer
                    w-4
                    hover:scale-110
                    transition-all
                  "
                  onClick={() => {
                    handleLecture(
                      'remove',
                      chapter.chapterId,
                      lectureIndex
                    )
                  }}
                />
              </div>
            )
          )}

          {/* Add Lecture */}
          <div
            onClick={() => {
              handleLecture(
                'add',
                chapter.chapterId
              )
            }}
            className="
              inline-flex
              px-4
              py-2
              rounded-xl
              cursor-pointer
              mt-2
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
              hover:bg-green-500/20
              transition-all
            "
          >
            + Add Lecture
          </div>

        </div>
      )}
    </div>
  ))}

  {/* Add Chapter */}
  <div
    onClick={() => handleChapter('add')}
    className="
      flex
      justify-center
      items-center
      py-4
      rounded-2xl
      cursor-pointer
      border
      border-dashed
      border-green-500/30
      bg-green-500/5
      text-green-400
      hover:bg-green-500/10
      transition-all
    "
  >
    + Add Chapter
  </div>

  {/* Popup */}
  {showPopup && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div
        className="
          bg-[#050505]
          border
          border-zinc-800
          text-white
          p-6
          rounded-3xl
          relative
          w-full
          max-w-md
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
        "
      >
        <h2 className="text-2xl font-bold mb-5">
          Add Lecture
        </h2>

        <div className="mb-4">
          <p className="mb-2 text-zinc-400">
            Lecture Title
          </p>

          <input
            type="text"
            value={lectureDetails.lectureTitle}
            onChange={(e) =>
              setLectureDetails({
                ...lectureDetails,
                lectureTitle: e.target.value,
              })
            }
            className="
              w-full
              bg-zinc-900
              border
              border-zinc-700
              rounded-xl
              px-4
              py-3
            "
          />
        </div>

        <div className="mb-4">
          <p className="mb-2 text-zinc-400">
            Duration (minutes)
          </p>

          <input
            type="number"
            value={lectureDetails.lectureDuration}
            onChange={(e) =>
              setLectureDetails({
                ...lectureDetails,
                lectureDuration: e.target.value,
              })
            }
            className="
              w-full
              bg-zinc-900
              border
              border-zinc-700
              rounded-xl
              px-4
              py-3
            "
          />
        </div>

        <div className="mb-4">
          <p className="mb-2 text-zinc-400">
            Lecture URL
          </p>

          <input
            type="text"
            value={lectureDetails.lectureUrl}
            onChange={(e) =>
              setLectureDetails({
                ...lectureDetails,
                lectureUrl: e.target.value,
              })
            }
            className="
              w-full
              bg-zinc-900
              border
              border-zinc-700
              rounded-xl
              px-4
              py-3
            "
          />
        </div>

        <div className="flex items-center gap-3 my-5">
          <input
            type="checkbox"
            checked={lectureDetails.isPreviewFree}
            onChange={(e) =>
              setLectureDetails({
                ...lectureDetails,
                isPreviewFree: e.target.checked,
              })
            }
            className="scale-125"
          />

          <p>Free Preview</p>
        </div>

        <button
          type="button"
          onClick={() => {
            addLecture()
          }}
          className="
            w-full
            py-3
            rounded-xl
            font-medium
            bg-gradient-to-r
            from-green-500
            via-yellow-400
            to-green-500
            text-black
            hover:scale-[1.02]
            transition-all
          "
        >
          Add Lecture
        </button>

        <img
          src={assets.cross_icon}
          alt=""
          onClick={() => setShowPopup(false)}
          className="
            absolute
            top-5
            right-5
            w-4
            cursor-pointer
          "
        />
      </div>

    </div>
  )}
</div>
      {/* Submit Button */}
     <button
  type="submit"
  disabled={loading}
  className="w-full py-4 mt-6 rounded-2xl font-semibold flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r
          from-green-500
          via-yellow-400
          to-green-500 text-black hover:scale-[1.02]
          transition-all
          duration-300
          shadow-[0_0_20px_rgba(34,197,94,0.25)]"
>
  {loading && (
    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
  )}

  {loading ? "Adding Course..." : "Add Course"}
</button>

    </form>
  </div>
)
}

export default AddCourse
