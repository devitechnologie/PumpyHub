import emailjs from '@emailjs/browser'
import axios from 'axios'

export const submitJobForm = async (form: FormData) => {
  const { data } = await axios.post('/api/job', form)
  const res = await emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string,
    process.env.NEXT_PUBLIC_EMAIL_JOB_TEMPLATE_ID as string,
    {
      file: data.fileUrl,
      email: form.get('email') as string,
      firstName: form.get('firstName') as string,
      lastName: form.get('lastName') as string,
      phone: form.get('phone') as string,
      message: form.get('message') as string,
      jobUID: form.get('jobUID') as string,
      reply_to: form.get('email') as string,
      cc: form.get('cc') as string,
    },
    process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string
  )

  return res
}