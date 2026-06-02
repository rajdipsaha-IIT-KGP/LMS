import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Coursecard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)

  const rating = calculateRating(course)

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => scrollTo(0, 0)}
      className="
        group
        p-[1px]
        rounded-3xl
        bg-gradient-to-r
        from-green-500/20
        via-yellow-400/20
        to-green-500/40
        hover:from-green-400
        hover:via-yellow-300
        hover:to-green-400
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_0_30px_rgba(234,179,8,0.25)]
      "
    >
      <div
        className="
          bg-[#050505]
          rounded-3xl
          overflow-hidden
          h-full
          shadow-[0_0_20px_rgba(0,0,0,0.5)]
        "
      >
        {/* Thumbnail */}
        <div className="overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="
              w-full
              h-52
              object-cover
              group-hover:scale-110
              transition-transform
              duration-700
            "
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-lg line-clamp-2">
            {course.courseTitle}
          </h3>

          <p className="text-zinc-400 text-sm mt-2">
            {course.educator.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <p className="text-yellow-400 font-medium">
              {rating.toFixed(1)}
            </p>

            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                if (i < Math.floor(rating)) {
                  return (
                    <FaStar
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                    />
                  )
                }

                if (i < rating) {
                  return (
                    <FaStarHalfAlt
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                    />
                  )
                }

                return (
                  <FaRegStar
                    key={i}
                    className="w-4 h-4 text-zinc-700"
                  />
                )
              })}
            </div>

            <p className="text-zinc-500 text-sm">
              ({course.courseRatings.length})
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-2xl font-bold text-green-400">
              {currency}
              {(
                course.coursePrice -
                (course.discount * course.coursePrice) / 100
              ).toFixed(2)}
            </p>

            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">
              Bestseller
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Coursecard