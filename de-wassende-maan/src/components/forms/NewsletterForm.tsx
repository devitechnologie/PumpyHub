"use client"

import { useForm, Controller } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

import Button from '../ui/Button'
import Input from '../ui/Input'
import Badge from '../ui/Badge'
import { cn } from '@/utils/cn'
import { useNewsLetter } from '@/services/queries/useNewsLetter'
import alertToast from '@/utils/customToast/alertToast'

type NewsletterFormProps = {
  placeholderText: string
  buttonText: string
  footerVariant?: boolean
}

type TFormValues = {
  email: string
}

const NewsletterForm = ({ placeholderText, buttonText, footerVariant }: NewsletterFormProps) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm<TFormValues>()
  const { mutateAsync: subscribeToNewsletter, isLoading } = useNewsLetter()
  const { t } = useTranslation()

  const onSubmit = async (data: TFormValues) => {
    subscribeToNewsletter(
      { email: data.email, name: data.email },
      {
        onSuccess: () => {
          alertToast('success', t('newsletter_form.success_message'))
        },
        onError: (error) => {
          alertToast('warning', t('newsletter_form.already_subscribed'))
          console.log(error)
        }
      })
    reset()
  }

  if (footerVariant) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='relative'>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: t('errors.email'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i,
                message: t('errors.invalid_email')
              }
            }}
            render={({ field }) => (
              <Input
                variant="secondary"
                placeholder={placeholderText}
                className={cn('w-full rounded-xl py-3', errors.email && 'focus:ring-red-500 ring-red-500 ring-1')}
                {...field}
              />
            )}
          />
          <div className="h-full absolute right-0 top-0 p-1">
            <Button
              variant="secondary"
              isLoading={isLoading}
              className="px-6 py-2 uppercase text-sm h-full rounded-xl bg-button-trinary hover:bg-button-trinary-hover flex items-center gap-2"
              disabled={isLoading}
            >
              <FaArrowRightLong />
              {
                isLoading && <AiOutlineLoading3Quarters className="animate-spin" />
              }
            </Button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='relative'>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: t('errors.email'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i,
              message: t('errors.invalid_email')
            }
          }}
          render={({ field }) => (
            <Input
              variant="secondary"
              placeholder={placeholderText}
              className={cn('w-full rounded-xl py-3', errors.email && 'focus:ring-red-500 ring-red-500 ring-1')}
              {...field}
            />
          )}
        />
        <div className="h-full absolute right-0 top-0 p-1">
          <Button
            variant="secondary"
            isLoading={isLoading}
            className="px-6 py-2 uppercase text-sm h-full rounded-xl bg-button-trinary hover:bg-button-trinary-hover flex items-center gap-2"
            disabled={isLoading}
          >
            {buttonText}
            {
              isLoading && <AiOutlineLoading3Quarters className="animate-spin" />
            }
          </Button>
        </div>
      </div>
      {errors.email && (
        <Badge
          variant="danger"
          className="mt-2 w-[150px] mx-auto"
        >
          {errors.email.message}
        </Badge>
      )}
    </form>
  )
}

export default NewsletterForm