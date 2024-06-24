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
})

const playwriteAustraliaVictoria = LocalFont({
  src: '../fonts/PlaywriteAUVIC-VariableFont_wght.ttf',
})

const playwriteItaliaModerna = LocalFont({
  src: '../fonts/PlaywriteITModerna-VariableFont_wght.ttf',
})

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

const lora = Lora({
  subsets: ["latin"],
  variable: '--font-lora',
})

const ptSerif = PT_Serif({
  subsets: ["latin"],
  variable: '--font-pt-serif',
  weight: ['400', '700'],
})

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: '--font-dm-serif-text',
  weight: ['400'],
})

const bitter = Bitter({
  subsets: ["latin"],
  variable: '--font-bitter',
})

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: '--font-bodoni-moda',
})

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  variable: '--font-josefin-slab',
})

const bioRhyme = BioRhyme({
  subsets: ["latin"],
  variable: '--font-bio-rhyme',
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

type FontName = keyof typeof fonts

export const getFont = (fontName: FontName | undefined | null) => {
  return fonts[fontName || "instrumentSans"]
}