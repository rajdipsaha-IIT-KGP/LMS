import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0)
  const [hover, setHover] = useState(0)

  const handleRating = (value) => {
    setRating(value)

    if (onRate) {
      onRate(value)
    }
  }

  useEffect(() => {
    if (initialRating !== undefined) {
      setRating(initialRating)
    }
  }, [initialRating])

  return (
    <div className="flex items-center gap-2">

      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1

        return (
          <FaStar
            key={index}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className={` cursor-pointer text-2xl transition-all duration-300 hover:scale-125
              ${
                starValue <= (hover || rating)
                  ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]'
                  : 'text-zinc-700'
              }
            `}
          />
        )
      })}

      <span className="ml-2 text-zinc-400 text-sm">
        {rating > 0 ? `${rating}/5` : 'Rate'}
      </span>

    </div>
  )
}

export default Rating