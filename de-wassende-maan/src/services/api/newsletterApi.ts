import { NewsLetterType } from "../types/newsLetterType";

import axios from 'axios'

export const subscribeToNewsletter = async (form: NewsLetterType) => {
  const url = process.env.NEXT_PUBLIC_NEWS_API + '&name=' + form.name + '&email=' + form.email;
  const { data } = await axios.get(url);
  return data as { message: string }
}