"use client"

import { useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  const onSubmit = async (data: TContactUs) => {
    if (reply_to) data.reply_to = reply_to
    if (cc) data.cc = cc
    submitForm(data, {
      onSuccess: () => {
        alertToast('success', t('contact_form.success_message'))
        reset()
      },
      onError: (error) => {
        alertToast('error', t('error_message'))
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
          className="mb-4 text-heading-secondary"
        >
          {t('contact_form.title')}
        </Heading>
        <Paragraph
          className="mb-6"
        >
          {t('contact_form.description')}
        </Paragraph>
      </div>
      <div
        className="w-full grid gap-4 sm:grid-cols-2 sm:gap-6"
      >
        <div>
          {/* fullName */}
          <Input
            type="text"
            placeholder={t('forms.full_name')}
            className="py-3 w-full"
            {...register('fullName', {
              required: t('errors.required'),
              minLength: {
                value: 3,
                message: t('errors.min_length', { min: 3 })
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
            placeholder={t('forms.email')}
            className="py-3 w-full"
            {...register('email', {
              required:  t('errors.required'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i,
                message: t('errors.invalid_email')
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
            placeholder={t('forms.phone')}
            className="py-3 w-full"
            {...register('phone', {
              required:  t('errors.required'),
              pattern: {
                value: /^[0-9]*$/i,
                message: t('errors.invalid_phone')
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
            placeholder={t('forms.subject')}
            className="py-3 w-full"
            {...register('subject', {
              required: t('errors.required'),
              minLength: {
                value: 3,
                message: t('errors.min_length', { min: 3 })
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
            placeholder={t('forms.message')}
            className={`"w-full input ${errors.message ? 'error' : ''}`}
            rows={7}
            {...register('message', {
              required:  t('errors.required'),
              minLength: {
                value: 10,
                message: t('errors.min_length', { min: 10 })
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
              {...register('acceptTerms', { required: t('errors.accept_terms') })}
              validation={errors.acceptTerms ? true : false}
            />
            <label
              htmlFor="terms"
              className="text-sm select-none"
            >
              {t('contact_form.accept_terms')}
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
        {t('submit_message')} 
        </span>
        {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </Button>
    </form>
  )
}

export default ContactForm