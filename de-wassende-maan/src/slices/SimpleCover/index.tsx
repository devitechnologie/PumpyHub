import initTranslations from "@/app/i18n";
import Heading from "@/components/ui/Heading";
import { getShortLocale } from "@/utils/helpers";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

/**
 * Props for `SimpleCover`.
 */
export type SimpleCoverProps = SliceComponentProps<Content.SimpleCoverSlice, { lang?: string }>

/**
 * Component for "SimpleCover" Slices.
 */
const SimpleCover = async ({ slice, context }: SimpleCoverProps): Promise<JSX.Element> => {
  const { t } = await initTranslations(getShortLocale(context.lang as string), ['*'], null, null)

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={{
        backgroundColor: slice.primary.background_color || '#f7f5f0',
      }}
      className="section-py flex items-center flex-col gap-2 justify-center w-full"
    >
      <Heading
        as="h1"
        variant="h1"
        className="leading-snug font-semibold text-center"
      >
        {slice.primary.title}
      </Heading>
      <div className="flex gap-2 items-center justify-center text-sm">
        <Link
          href="/"
          passHref
          aria-label="Home page"
        >
          {
            t('home_page')
          }
        </Link>
        <IoIosArrowForward className="-mb-0.5 text-gray-400 text-sm" />
        <span className="text-gray-400">
          {slice.primary.title}
        </span>
      </div>
    </section>
  );
};

export default SimpleCover;
