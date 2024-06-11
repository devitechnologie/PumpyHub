"use client"

import { useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import Button from "../ui/Button"
import Heading from "../ui/Heading"
import Input from "../ui/Input"
import Paragraph from "../ui/Paragraph"
import { useContact } from '@/services/queries/useContact'
import alertToast from '@/utils/customToast/alertToast'
import { TContactUs } from '@/services/types/contactUsType'

type TContactForm = {
  reply_to: string | null
  cc: string | null
}

const ContactForm = ({ reply_to, cc }: TContactForm) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<TContactUs & { acceptTerms: boolean }>()
  const { mutateAsync: submitForm, isLoading } = useContact()

  const onSubmit = async (data: TContactUs) => {
    if (reply_to) data.reply_to = reply_to
    if (cc) data.cc = cc
    submitForm(data, {
      onSuccess: () => {
        alertToast('success', 'Message sent successfully')
        reset()
      },
      onError: (error) => {
        alertToast('error', 'An error occurred. Please try again later')
        console.log(error)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Heading
          as="h2"
          variant="h1"
          className="mb-4 text-primary-green-dark-dwm"
        >
          Send us a message
        </Heading>
        <Paragraph
          className="mb-6"
        >
          Fill out the form below and well get back to you as soon as possible.
        </Paragraph>
      </div>
      <div
        className="w-full grid gap-4 sm:grid-cols-2 sm:gap-6"
      >
        <div>
          {/* fullName */}
          <Input
            type="text"
            placeholder="Your name*"
            className="py-3 w-full"
            {...register('fullName', {
              required: 'Full name is required',
              minLength: {
                value: 3,
                message: 'Full name should have at least 3 characters'
              }
            })}
            validation={errors.fullName ? true : false}
          />
          {/* error message */}
          {errors.fullName && (
            <Paragraph
              className="text-red-500"
            >
              {errors.fullName.message}
            </Paragraph>
          )}
        </div>
        <div>
          {/* email */}
          <Input
            type="email"
            placeholder="Your email*"
            className="py-3 w-full"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i,
                message: 'Invalid email address'
              }
            })}
            validation={errors.email ? true : false}
          />
          {/* error message */}
          {errors.email && (
            <Paragraph
              className="text-red-500"
            >
              {errors.email.message}
            </Paragraph>
          )}
        </div>
        <div>
          {/* phone */}
          <Input
            type="tel"
            placeholder="Your phone number*"
            className="py-3 w-full"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]*$/i,
                message: 'Invalid phone number'
              }
            })}
            validation={errors.phone ? true : false}
          />
          {/* error message */}
          {errors.phone && (
            <Paragraph
              className="text-red-500"
            >
              {errors.phone.message}
            </Paragraph>
          )}
        </div>
        <div>
          {/* subject */}
          <Input
            type="text"
            placeholder="Subject*"
            className="py-3 w-full"
            {...register('subject', {
              required: 'Subject is required',
              minLength: {
                value: 3,
                message: 'Subject should have at least 3 characters'
              }
            })}
            validation={errors.subject ? true : false}
          />
          {/* error message */}
          {errors.subject && (
            <Paragraph
              className="text-red-500"
            >
              {errors.subject.message}
            </Paragraph>
          )}
        </div>
        <div className="col-span-2">
          {/* message */}
          <textarea
            placeholder="Your message*"
            className={`"w-full input ${errors.message ? 'error' : ''}`}
            rows={7}
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message should have at least 10 characters'
              }
            })}
          />
          {/* error message */}
          {errors.message && (
            <Paragraph
              className="text-red-500"
            >
              {errors.message.message}
            </Paragraph>
          )}
        </div>
        <div className="col-span-2">
          {/* checkbox */}
          <div
            className="flex items-center gap-2 text-sm"
          >
            <Input
              type="checkbox"
              id="terms"
              className="rounded-sm w-4 h-4"
              {...register('acceptTerms', { required: 'This field is required' })}
              validation={errors.acceptTerms ? true : false}
            />
            <label
              htmlFor="terms"
              className="text-sm select-none"
            >
              On submitting this form, you agree to the information provided being used in accordance with our privacy policy.
            </label>
          </div>
          {/* error message */}
          {errors.acceptTerms && (
            <Paragraph
              className="text-red-500"
            >
              {errors.acceptTerms.message}
            </Paragraph>
          )}
        </div>
      </div>
      {/* button submit */}
      <Button
        type="submit"
        className="mt-6 rounded-2xl py-3 px-6 flex items-center gap-2"
        disabled={isLoading}
        isLoading={isLoading}
      >
        <span>
          Submit message
        </span>
        {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </Button>
    </form>
  )
}

export default ContactForm