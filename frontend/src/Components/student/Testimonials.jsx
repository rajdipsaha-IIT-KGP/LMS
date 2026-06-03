import React from 'react'
import { dummyTestimonial } from '../../assets/assets'
import { FaStar } from 'react-icons/fa'

const TestimonialsSection = () => {
  return (
    <section className="w-full bg-black py-24 px-4">

      <div className="max-w-7xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-green-400 font-medium">
            Student Reviews
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What Our{' '}
          <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Learners Say
          </span>
        </h2>

        <p className="text-zinc-400 max-w-3xl mx-auto mt-5 leading-relaxed">
          Hear from our learners as they share their journeys,
          achievements, and how our platform helped them
          unlock new opportunities.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className="
                relative
                p-[1px]
                rounded-3xl
                overflow-hidden
                animate-[borderRotate_4s_linear_infinite]
                bg-[linear-gradient(90deg,#22c55e,#facc15,#22c55e)]
              "
            >
              <div
                className="
                  h-full
                  bg-[#050505]
                  rounded-3xl
                  overflow-hidden
                  backdrop-blur-xl
                "
              >
                {/* Profile */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-zinc-900">

                  <img
                    className="h-14 w-14 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />

                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg">
                      {testimonial.name}
                    </h3>

                    <p className="text-zinc-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(testimonial.rating)
                            ? 'text-yellow-400'
                            : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-5 text-zinc-400 leading-relaxed">
                    {testimonial.feedback}
                  </p>

           

                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection