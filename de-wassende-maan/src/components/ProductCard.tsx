import Image from "next/image"
import Heading from "./ui/Heading"
import Badge from "./ui/Badge"
import Link from "next/link"
import Button from "./ui/Button"
import { IoIosHeartEmpty } from "react-icons/io"
import { Tooltip } from 'react-tooltip'

type ProductCardProps = {
  num: number
}

const ProductCard = ({ num }: ProductCardProps) => {

  return (
    <Link
      href="/product/1"
      className="rounded-2xl flex flex-col justify-between group relative"
    >
      <Badge
        variant="danger"
        className="absolute top-2 left-2 z-10 uppercase px-3 py-1 font-semibold text-xs select-none"
      >
        Sale
      </Badge>
      <div
        className="w-full rounded-2xl overflow-hidden aspect-[4/5.1] relative select-none"
      >
        <div className="w-full h-full relative">
          <Image
            src="https://projectdwm.vercel.app/_next/image?url=%2Fimages%2Fproduct%2F1000x1000.png&w=1080&q=75"
            alt="Product Image"
            width={1080}
            height={1080}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              alt="Product Image"
              width={1080}
              height={1080}
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100"
            />
          </div>
        </div>
        <div
          className="hidden lg:block"
        >
          {/* actions btns */}
          <div
            className="absolute -bottom-[72px] xl:-bottom-[60px] left-0 right-0 p-4 flex justify-between gap-4 group-hover:bottom-0 transition-all duration-500"
          >
            <Button
              variant="none"
              className="bg-primary-white w-full text-primary-black px-3 py-2 hover:text-primary-white duration-300 uppercase font-semibold text-sm rounded-full hover:bg-primary-black"
            >
              Buy Now
            </Button>
            <Button
              variant="none"
              className="bg-primary-white w-full text-primary-black px-3 py-2 hover:text-primary-white duration-300 uppercase font-semibold text-sm rounded-full hover:bg-primary-black"
            >
              Add to Cart
            </Button>
          </div>
          {/* like btn */}
          <Button
            variant="icon"
            className="absolute top-2 -right-[36px] z-10 duration-300 text-xl group-hover:right-2"
            data-tooltip-id={`like-btn-${num}`}
            data-tooltip-content="Add to Wishlist"
            data-tooltip-place='right'
          >
            <IoIosHeartEmpty />
            {/* tooltip */}
            <Tooltip
              id={`like-btn-${num}`}
              className="!px-4 !py-1 !text-sm !bg-primary-black !text-white !rounded-md !drop-shadow-md"
            />
          </Button>
        </div>
      </div>
      <div
        className="mt-2"
      >
        <Heading
          as="h3"
          variant="h4"
          className="text-primary-black font-medium capitalize line-clamp-1"
        >
          Tomato basil pasta
        </Heading>
        <div className="flex items-center gap-2 select-none">
          <span
            className="text-primary-green-light-dwm font-medium text-lg"
          >
            $12.99
          </span>
          <span
            className="text-gray-400 font-normal text-sm line-through"
          >
            $15.99
          </span>
          {/* discount */}
          <Badge variant="primary">
            -20%
          </Badge>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard