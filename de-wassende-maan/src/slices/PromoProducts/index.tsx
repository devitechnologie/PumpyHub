"use client"

import Bounded from "@/components/wrappers/Bounded";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "@/components/ui/Button";

/**
 * Props for `PromoProducts`.
 */
export type PromoProductsProps =
  SliceComponentProps<Content.PromoProductsSlice>;

/**
 * Component for "PromoProducts" Slices.
 */
const PromoProducts = ({ slice }: PromoProductsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('All')
  const tabs = ['All', 'Bluberry', 'Strawberry', 'Mango', 'Snacks', 'Drinks', 'Meals',]

  const handleTabClick = (type: string) => {
    setActiveTab(type);
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <div className="w-full overflow-x-auto">
        <TabsBar tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <div
        className="md:mt-16 mt-8 relative"
      >
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.product-button-next',
            prevEl: '.product-button-prev'
          }}
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {[...Array(8)].map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCard
                num={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* custom navigation */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-1 -translate-x-1/2 z-20"
        >
          <Button
            variant="none"
            className="product-button-prev bg-primary-white hover:bg-opacity-85 text-2xl text-primary-black p-2 shadow-card-border rounded-full cursor-pointer"
          >
            <IoIosArrowBack
              className="transform -translate-x-[1px]"
            />
          </Button>
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 right-1 translate-x-1/2 z-20"
        >
          <Button
            variant="none"
            className="product-button-next bg-primary-white hover:bg-opacity-85 text-2xl text-primary-black p-2 shadow-card-border rounded-full cursor-pointer"
          >
            <IoIosArrowForward
              className="transform translate-x-[1px]"
            />
          </Button>
        </div>
      </div>
    </Bounded>
  );
};

const TabsBar = ({ tabs, activeTab, handleTabClick }: { tabs: string[], activeTab: string, handleTabClick: (type: string) => void }) => {
  return (
    <div className="text-center bg-primary-surface rounded-2xl w-fit mx-auto">
      <div className="flex items-center gap-2 p-1">
        {
          tabs.map((type) => (
            <div
              key={type}
              className={
                cn(
                  "uppercase font-medium text-sm relative text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-primary-black",
                  activeTab === type ? "text-primary-black" : "text-primary-secondary"
                )
              }
              onClick={() => handleTabClick(type)}
            >
              {activeTab === type && (
                <motion.div layoutId='active-pill' className='absolute inset-0 rounded-2xl bg-white drop-shadow-md'></motion.div>
              )}
              <span className='relative text-button-uppercase z-[1]'>
                {type}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PromoProducts;
