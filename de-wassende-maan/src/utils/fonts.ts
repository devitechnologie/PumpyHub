import { Instrument_Sans, Poppins, DM_Sans, Roboto, Rubik, Open_Sans, Montserrat} from "next/font/google"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: '--font-instrument-sans',
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: '--font-open-sans',
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans',
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
})

const rubik = Rubik({
  subsets: ["latin"],
  variable: '--font-rubik',
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
})

const fonts = {
  instrumentSans,
  openSans,
  poppins,
  dmSans,
  roboto,
  rubik,
  montserrat,
}

type FontName = keyof typeof fonts

export const getFont = (fontName: FontName | undefined | null) => {
  return fonts[fontName || "instrumentSans"]
}