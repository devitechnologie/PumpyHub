import { NextFontWithVariable } from "next/dist/compiled/@next/font"
import {
  Instrument_Sans,
  Poppins,
  DM_Sans,
  Roboto,
  Rubik,
  Open_Sans,
  Montserrat,
  Lora,
  PT_Serif,
  DM_Serif_Text,
  Bitter,
  Bodoni_Moda,
  Josefin_Slab,
  BioRhyme,
} from "next/font/google"
import LocalFont from 'next/font/local'

const playwriteNGModern = LocalFont({
  src: '../fonts/PlaywriteNGModern-VariableFont_wght.ttf',
  variable: '--font-paragraph',
})

const playwriteAustraliaVictoria = LocalFont({
  src: '../fonts/PlaywriteAUVIC-VariableFont_wght.ttf',
  variable: '--font-paragraph',
})

const playwriteItaliaModerna = LocalFont({
  src: '../fonts/PlaywriteITModerna-VariableFont_wght.ttf',
  variable: '--font-paragraph',
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-paragraph',
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: '--font-paragraph',
  weight: ['100', '300', '400', '500', '700', '900'],
})

const rubik = Rubik({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const lora = Lora({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const ptSerif = PT_Serif({
  subsets: ["latin"],
  variable: '--font-paragraph',
  weight: ['400', '700'],
})

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: '--font-paragraph',
  weight: ['400'],
})

const bitter = Bitter({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const bioRhyme = BioRhyme({
  subsets: ["latin"],
  variable: '--font-paragraph',
})

const fonts = {
  instrumentSans,
  openSans,
  poppins,
  dmSans,
  roboto,
  rubik,
  montserrat,
  lora,
  ptSerif,
  dmSerifText,
  bitter,
  bodoniModa,
  josefinSlab,
  bioRhyme,
  playwriteNGModern,
  playwriteAustraliaVictoria,
  playwriteItaliaModerna,
}

export type FontName = keyof typeof fonts

export const getFont = (fontName: FontName | undefined | null): NextFontWithVariable => {
  return fonts[fontName || "instrumentSans"]
}