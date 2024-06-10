import axios from 'axios'
import emailjs from '@emailjs/browser'

import { TContactUs } from '../types/contactUsType'

export const submitContactForm = async (form: TContactUs) => {
  axios.post('/api/contact', form)
    .then((response) => {
      console.log("success mailchimp response")
    }).catch((error) => {
      console.log(error)
    })
  const res = await emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string,
    process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string,
    form,
    process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string
  )

  return res
}