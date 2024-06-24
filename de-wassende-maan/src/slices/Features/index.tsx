import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Bounded from "@/components/wrappers/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

// Local SVG icons
const IconsSVG = {
  phone: '/images/call-chat.svg',
  box: '/images/refund.svg',
  check: '/images/verified.svg',
  shipping: '/images/shipping.svg',
}

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-footer-bg"
    >
      <Bounded
        as="div"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 section-py"
      >
        {
          slice.items.map((item, index) => (
            <CardInfo key={index} item={item} />
          ))
        }
      </Bounded>
    </section>
  );
};

const CardInfo = ({ item }: { item: Content.FeaturesSliceDefaultItem }) => {
  return (
    <div
      className="flex flex-col items-center space-y-4"
    >
      <Image
        src={IconsSVG[item.icon]}
        alt={item.icon}
        className="w-20 h-20"
        width={240}
        height={240}
      />
      <Heading
        as="h3"
        variant="h3"
        className="text-xl font-semibold text-center text-primary-black">
        {item.title}
      </Heading>
      <Paragraph
        className="text-base md:text-sm text-center text-gray-600"
      >
        {item.text}
      </Paragraph>
    </div>
  );
}

export default Features;
