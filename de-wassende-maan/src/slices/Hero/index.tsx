import ButtonLink from "@/components/ui/ButtonLink";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { cn } from "@/utils/cn";
import { hexToRGBA } from "@/utils/helpers";
import { ColorField, LinkField, NumberField, RichTextField } from "@prismicio/client";
import { Content, KeyTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  {/* Double hero */ }
  if (slice.variation === "heroDouble") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        <HeroContent
          imageUrl={slice.primary.image.url}
          textAlign={slice.primary.text_alignment}
          textColor={slice.primary.text_color}
          heading={slice.primary.heading}
          text={slice.primary.text}
          buttonLink={slice.primary.button_link}
          buttonText={slice.primary.button_text}
          btnRadius={slice.primary.button_border_radius || undefined}
          backgroundColor={slice.primary.first_hero_color_background}
          bgOpacity={slice.primary.first_hero_background_opacity}
          borderRadius={slice.primary.first_hero_border_radius}
        />
        <HeroContent
          imageUrl={slice.primary.second_hero_image.url}
          textAlign={slice.primary.second_hero_text_alignment}
          textColor={slice.primary.second_hero_text_color}
          heading={slice.primary.second_hero_heading}
          text={slice.primary.second_hero_text}
          buttonLink={slice.primary.second_hero_button_link}
          buttonText={slice.primary.second_hero_button_text}
          btnRadius={slice.primary.button_border_radius || undefined}
          backgroundColor={slice.primary.second_hero_color_background}
          bgOpacity={slice.primary.second_hero_background_opacity}
          borderRadius={slice.primary.second_hero_border_radius}
        />
      </section>
    )
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HeroContent
        imageUrl={slice.primary.image.url}
        textAlign={slice.primary.text_alignment}
        textColor={slice.primary.text_color}
        heading={slice.primary.heading}
        text={slice.primary.text}
        buttonLink={slice.primary.button_link}
        buttonText={slice.primary.button_text}
        className="aspect-[16/5]"
        contentClassName="container mx-auto max-w-[1300px] p-8 md:p-4"
        btnRadius={slice.primary.button_border_radius || undefined}
        backgroundColor={slice.primary.color_background}
        bgOpacity={slice.primary.background_opacity}
        borderRadius={slice.primary.border_radius}
      />
    </section>
  );
};

type HeroContentProps = {
  imageUrl: string | null | undefined;
  textAlign: string;
  textColor: string;
  heading: KeyTextField;
  text: RichTextField;
  buttonLink: LinkField;
  buttonText: KeyTextField;
  className?: string;
  contentClassName?: string;
  btnRadius?: number;
  backgroundColor?: ColorField;
  bgOpacity?: NumberField | undefined;
  borderRadius?: NumberField | undefined;
}

const HeroContent = ({
  imageUrl,
  textAlign,
  textColor,
  heading,
  text,
  buttonLink,
  buttonText,
  className,
  contentClassName,
  btnRadius = 16,
  backgroundColor,
  bgOpacity,
  borderRadius,
}: HeroContentProps): JSX.Element => {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={
        cn(
          "relative bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center",
          textAlign === "center" && "items-center text-center",
          textAlign === "left" && "items-start text-left",
          textAlign === "right" && "items-end text-right",
          className,
        )
      }
    >
      <div
        className={cn(
          "z-10 max-w-[500px] text-white p-8 md:p-16 flex flex-col ",
          textAlign === "center" && "items-center text-center",
          textAlign === "left" && "items-start text-left",
          textAlign === "right" && "items-end text-right",
          contentClassName,
        )}

      >
        <div
          className={
            cn(
              "w-fit",
              backgroundColor && "px-4 py-5",
            )
          }
          style={{
            backgroundColor: backgroundColor
              ? hexToRGBA(backgroundColor, bgOpacity ? bgOpacity / 100 : 1)
              : "transparent",
            borderRadius: borderRadius || 0
          }}
        >
          <Heading
            as="h1"
            variant="h1"
            className={
              cn(
                textColor === "dark" && "text-heading-secondary",
                textColor === "light" && "text-white",
                textAlign === "center" && "text-center",
                textAlign === "left" && "text-left",
                textAlign === "right" && "text-right",
              )
            }
          >
            {heading}
          </Heading>
          <PrismicRichText
            field={text}
            components={{
              paragraph: ({ children }) => (
                <p
                  className={
                    cn(
                      "text-lg mt-4 max-w-[600px]",
                      textColor === "dark" && "text-heading-secondary",
                      textColor === "light" && "text-white",
                    )
                  }
                >
                  {children}
                </p>
              )
            }}
          />
          {
            buttonLink.link_type !== "Any"
            && (
              <ButtonLink
                field={buttonLink}
                variant={textColor === "dark" ? "primary" : "secondary"}
                style={{
                  borderRadius: btnRadius
                }}
                className="mt-8 capitalize px-8 py-3"
              >
                {buttonText}
              </ButtonLink>
            )
          }
        </div>
      </div>

      {/* overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-5 rounded-2xl z-[0]"></div>
    </div>
  );
}

export default Hero;
