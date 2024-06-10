import ButtonLink from "@/components/ui/ButtonLink";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { cn } from "@/utils/cn";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import Link from "next/link";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

const IconsImages= {
  farming: "/images/farming.png",
  bee: "/images/bee.png",
}

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <div
        className={
          cn(
            "relative text-white text-center py-10 md:py-[50px] px-8 rounded-3xl space-y-4 z-0",
            slice.primary.color === "dark" ? "bg-primary-green-dark-dwm" : "bg-primary-lime"
          )
        }
      >
        <Heading
          as="h2"
          variant="h1"
          className={
            cn(
              "max-w-[500px] mx-auto capitalize",
              slice.primary.color === "dark" ? "text-white" : "text-primary-green-dark-dwm"
            )
          }
        >
          {slice.primary.heading}
        </Heading>
        <PrismicRichText
          field={slice.primary.text}
          components={{
            paragraph: ({ children }) => (
              <p
                className={
                  cn(
                    "text-lg leading-relaxed mb-4 max-w-[500px] mx-auto",
                    slice.primary.color === "dark" ? "text-white" : "text-primary-green-dark-dwm"
                  )
                }
              >
                {children}
              </p>
            ),
            hyperlink: ({ children, node }) => {
              return (
                <Link
                  href={node.data.url || "#"}
                  className="text-primary-green hover:underline"
                >
                  {children}
                </Link>
              );
            }
          }}
        />
        <ButtonLink
          variant={slice.primary.color === "dark" ? "secondary" : "primary"}
          field={slice.primary.button_link}
          className="capitalize rounded-2xl px-8 py-3 drop-shadow-lg hover:drop-shadow-lg"
        >
          {slice.primary.button_text}
        </ButtonLink>
        <div
          className="absolute bottom-0 right-2 hidden md:block z-[-1] xl:z-0"
        >
          <Image 
            src={IconsImages[slice.primary.icon]}
            alt="Icon"
            draggable={false}
            width={544}
            height={384}
            className="select-none w-80 h-56 object-contain object-bottom"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default CallToAction;
