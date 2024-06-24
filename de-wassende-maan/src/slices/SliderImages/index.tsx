"use client"

import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import { cn } from "@/utils/cn"
import ButtonLink from "@/components/ui/ButtonLink"
import { hexToRGBA } from "@/utils/helpers"

/**
 * Props for `HomeSlider`.
 */
export type HomeSliderProps = SliceComponentProps<Content.HomeSliderSlice>

/**
 * Component for "HomeSlider" Slices.
 */
const HomeSlider = ({ slice }: HomeSliderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Swiper
        slidesPerView={1}
        loop
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
      >
        {/* double data */}
        {slice.items.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="2xl:h-[820px] xl:h-[740px] lg:h-[680px] md:h-[580px] sm:h-[500px] h-[420px] w-full relative"
            >
              <PrismicNextImage
                field={item.slider_image}
                className="w-full h-full object-cover"
              />
              <div
                className={
                  cn(
                    "app-container absolute inset-0 z-10 flex flex-col justify-center items-start",
                    item.text_alignment === "center" && "items-center text-center",
                    item.text_alignment === "right" && "items-end",
                  )
                }
              >
                <div
                  className={cn(
                    "max-w-[650px] text-primary-black",
                    item.text_color === "light" && "text-white",
                    item.color_background && "px-4 py-5"
                  )}
                  style={{
                    backgroundColor: item.color_background
                      ? hexToRGBA(item.color_background, item.background_opacity ? item.background_opacity / 100 : 1)
                      : "transparent",
                    borderRadius: item.border_radius || 0
                  }}
                >
                  <h1
                    className="text-5xl md:text-[84px] leading-none font-medium capitalize"
                  >
                    {item.title}
                  </h1>
                  <p
                    className="mt-4 text-xl md:text-2xl font-medium"
                  >
                    {item.subtitle}
                  </p>
                  <ButtonLink
                    style={{
                      borderRadius: slice.primary.border_radius || 12
                    }}
                    className={
                      cn(
                        "px-8 py-3 mt-8 bg-primary-black text-white hover:bg-button-primary-hover transition-all drop-shadow-lg duration-300 font-medium",
                        item.text_color === "light" && "bg-white text-primary-black hover:bg-primary-black hover:text-white")
                    }
                    field={item.button_link}
                  >
                    {item.button_text}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HomeSlider
