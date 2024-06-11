"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import Paragraph from "@/components/ui/Paragraph"
import { TestimonialDocument } from "../../../prismicio-types"
import { PrismicNextImage } from "@prismicio/next"

type TestimonialsListProps = {
  testimonials: TestimonialDocument[]
}

const TestimonialsList = ({ testimonials }: TestimonialsListProps) => {

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      loop
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      breakpoints={{
        0: {
          spaceBetween: 16,
          slidesPerView: 1.05
        },
        768: {
          spaceBetween: 24,
          slidesPerView: 1.5
        },
        1024: {
          spaceBetween: 32,
          slidesPerView: 2.75
        },
      }}
      className="py-10 md:py-14"
    >
      {
        testimonials.map((testimonial) => (
          <SwiperSlide
            key={testimonial.id}
          >
            <TestimonialCard
              testimonial={testimonial}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}


const TestimonialCard = ({ testimonial }: { testimonial: TestimonialDocument }) => {

  return (
    <div className="bg-white select-none cursor-grab">
      <div className="flex items-center gap-4">
        <div
          className="w-28 h-28 rounded-xl overflow-hidden"
        >
          <PrismicNextImage
            field={testimonial.data.image}
            width={150}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>
        <Paragraph
          size="lg"
          className="text-primary-green-dark-dwm flex-1"
        >
          {testimonial.data.comment}
        </Paragraph>
      </div>
      <div
        className="flex items-center gap-4 mt-4"
      >
        <div
          className="w-10 h-10 rounded-full overflow-hidden"
        >
          <PrismicNextImage
            field={testimonial.data.avatar}
            width={60}
            height={60}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <Paragraph
            className="text-primary-green-dark-dwm font-semibold"
          >
            {testimonial.data.full_name}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsList