"use client"

import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { cn } from "@/utils/cn";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Button from "@/components/ui/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

/**
 * Props for `HightLights`.
 */
export type HightLightsProps = SliceComponentProps<Content.HightLightsSlice>;

/**
 * Component for "HightLights" Slices.
 */
const HightLights = ({ slice }: HightLightsProps): JSX.Element => {

  if (slice.variation === "highlightsHeading3Column") {
    return (
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="section-py overflow-hidden"
      >
        <Heading
          as="h2"
          variant="h1"
          className="mb-8 md:mb-12 text-center text-heading-secondary capitalize"
        >
          {slice.primary.section_title}
        </Heading>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
        >
          {slice.items.map((item, index) => (
            <HightLightsSliceCardV2
              key={index}
              item={item as Content.HightLightsSliceHighlightsHeading3ColumnItem}
              slice={slice}
            />
          ))}
        </div>
      </Bounded>
    )
  }

  if (slice.variation === "highlightsHeading") {
    return (
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="section-py overflow-hidden"
      >
        <Heading
          as="h2"
          variant="h1"
          className="mb-8 md:mb-12 text-center text-heading-secondary capitalize"
        >
          {slice.primary.section_title}
        </Heading>
        <div
          className="relative"
        >
          <Swiper
            slidesPerView={1}
            modules={[Navigation]}
            loop
            navigation={
              {
                nextEl: '.swipe-button-next',
                prevEl: '.swipe-button-prev'
              }
            }
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                spaceBetween: 16
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32
              }
            }}
            className="relative py-4"
          >
            {slice.items.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!h-full"
              >
                <HightLightsHeadingSliceCard
                  item={item as Content.HightLightsSliceHighlightsHeadingItem}
                  slice={slice}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* custom navigation */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-1 -translate-x-1/2 z-20 hidden md:block"
          >
            <Button
              variant="none"
              className="swipe-button-prev bg-primary hover:bg-opacity-85 text-xl text-white p-2 rounded-full cursor-pointer"
            >
              <IoIosArrowBack />
            </Button>
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 right-1 translate-x-1/2 z-20 hidden md:block"
          >
            <Button
              variant="none"
              className="swipe-button-next bg-primary hover:bg-opacity-85 text-xl text-white p-2 rounded-full cursor-pointer"
            >
              <IoIosArrowForward />
            </Button>
          </div>
          {/* shadow right mobile */}
          <div
            className="absolute top-0 right-[-2px] sm:hidden select-none pointer-events-none h-full w-8 bg-gradient-to-r from-transparent to-primary-white z-10"
          />
        </div>
      </Bounded>
    )
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 md:gap-8">
        {slice.items.map((item, index) => (
          <HightLightsSliceCard
            key={index}
            item={item as Content.HightLightsSliceDefaultItem}
            slice={slice}
          />
        ))}
      </div>
    </Bounded>
  );
};

const HightLightsSliceCardV2 = ({ item, slice }: { item: Content.HightLightsSliceHighlightsHeading3ColumnItem, slice: Content.HightLightsSlice }) => {
  return (
    <PrismicNextLink
      field={item.link}
      style={{
        borderRadius: slice.primary.card_border_radius || 12,
      }}
      className={cn(
        "group block overflow-hidden aspect-[16/12] z-0 relative duration-300 transition-all",
      )}
    >
      <div
        className="z-0 w-full h-full"
      >
        <PrismicNextImage
          field={item.image}
          draggable={false}
          className="w-full h-full object-cover select-none group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      {/* text */}
      <div
        className="absolute bottom-1/2 transform translate-y-1/2 left-0 right-0 px-4 py-1.5 transition-all duration-300"
        style={{ backgroundColor: item.background_color || "#ffffff" }}
      >
        <PrismicRichText
          field={item.text}
          components={{
            heading3: ({ children }) => (
              <Heading
                as="h3"
                variant="h2"
                className={cn(
                  "font-semibold line-clamp-1 uppercase text-primary-black transition-colors duration-300",
                  item.text_alignment === "left" && "text-left",
                  item.text_alignment === "right" && "text-right",
                  item.text_alignment === "center" && "text-center",
                  item.text_color === "dark" ? "text-primary-black" : "text-white"
                )}
              >
                {children}
              </Heading>
            ),
          }}
        />
      </div>
    </PrismicNextLink>
  )
}

const HightLightsSliceCard = ({ item, slice}: { item: Content.HightLightsSliceDefaultItem, slice: Content.HightLightsSlice }) => {
  return (
    <PrismicNextLink
      field={item.link}
      style={{ backgroundColor: item.background_color || "#f3f4f6", borderRadius: slice.primary.card_border_radius || 16}}
      className={cn(
        "group relative min-h-[210px] overflow-hidden p-8 flex justify-start items-center text-center z-10",
        item.text_alignment === "left" && "justify-start text-left",
        item.text_alignment === "right" && "justify-end",
        item.text_alignment === "center" && "justify-center text-center",
      )}
    >
      <div
        className={
          cn(
            "absolute top-1/2 -right-16 transform -translate-y-1/2 rounded-full overflow-hidden z-0 w-[230px] h-[230px] group-hover:scale-110 transition-transform duration-300",
            item.text_alignment === "right" && "-left-16",
            item.text_alignment === "center" && "left-1/2 -translate-x-1/2 w-full h-full rounded-none",
          )
        }
      >
        <PrismicNextImage
          field={item.image}
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      </div>
      <div
        className="z-10 max-w-[80%]"
      >
        <PrismicRichText
          field={item.text}
          components={{
            heading3: ({ children }) => (
              <h3
                className={cn(
                  "text-2xl font-medium max-w-[210px]",
                  item.text_color === "dark" ? "text-primary-black" : "text-white"
                )}
              >
                {children}
              </h3>
            ),
          }}
        />
      </div>
    </PrismicNextLink>
  )
}

const HightLightsHeadingSliceCard = ({ item, slice }: { item: Content.HightLightsSliceHighlightsHeadingItem, slice: Content.HightLightsSlice }) => {

  return (
    <PrismicNextLink
      field={item.link}
      style={{
        borderRadius: slice.primary.card_border_radius || 12,
      }}
      className={cn(
        "group block overflow-hidden max-h-[300px] h-[210px] hover:drop-shadow-md shadow-sm z-0 relative border border-primary duration-300 hover:transform hover:-translate-y-2 transition-all",
      )}
    >
      <div className="aspect-[16/10] z-0">
        <PrismicNextImage
          field={item.image}
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      </div>
      <div
        className="px-6 py-3 z-10 bg-primary absolute bottom-0 left-0 right-0 text-white transition-all duration-300 group-hover:bg-heading-secondary"
      >
        <PrismicRichText
          field={item.text}
          components={{
            heading3: ({ children }) => (
              <Heading
                as="h3"
                variant="h3"
                className="font-semibold capitalize line-clamp-1 text-center text-primary-white transition-colors duration-300"
              >
                {children}
              </Heading>
            ),
          }}
        />
      </div>
    </PrismicNextLink>
  )
}

export default HightLights;
