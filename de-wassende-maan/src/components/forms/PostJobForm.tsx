"use client"

import { FileUploader } from "react-drag-drop-files"
import { RiUpload2Line } from "react-icons/ri"
import { useForm, Controller } from "react-hook-form"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import Button from "../ui/Button"
import Input from "../ui/Input"
import { TJobPost } from "@/services/types/jobPostType"
import Paragraph from "../ui/Paragraph"
import { useJobs } from "@/services/queries/useJobs"
import alertToast from "@/utils/customToast/alertToast"

type PostJobFormProps = {
  jobUID: string
  reply_to: string | null
  cc: string | null
}

const PostJobForm = ({ jobUID, reply_to, cc }: PostJobFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
    getValues
  } = useForm<TJobPost & { acceptTerms: boolean }>()
  const { mutateAsync: submitForm, isLoading } = useJobs()

  const onSubmit = async (data: TJobPost) => {
    data.jobUID = jobUID
    const formData = new FormData()
    formData.append('file', data.file as File)
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('message', data.message)
    formData.append('jobUID', data.jobUID)
    if (reply_to) formData.append('reply_to', reply_to)
    if (cc) formData.append('cc', cc)

    submitForm(formData, {
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
      id="job-form"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      method="post"
    >
      <div
        className="w-full grid gap-4 sm:grid-cols-2 sm:gap-6"
      >
        <div>
          {/* nom */}
          <Input
            type="text"
            placeholder="Nom*"
            className="py-3 w-full"
            {...register('firstName', {
              required: 'This field is required',
              minLength: { value: 2, message: 'This field must be at least 2 characters long' }
            })}
            validation={errors.firstName ? true : false}
          />
          {/* error message */}
          {errors.firstName && (
            <Paragraph
              className="text-red-500"
            >
              {errors.firstName.message}
            </Paragraph>
          )}
        </div>
        <div>
          {/* prenom */}
          <Input
            type="text"
            placeholder="Prenom*"
            className="py-3 w-full"
            {...register('lastName', {
              required: 'This field is required',
              minLength: { value: 2, message: 'This field must be at least 2 characters long' }
            })}
            validation={errors.lastName ? true : false}
          />
          {/* error message */}
          {errors.lastName && (
            <Paragraph
              className="text-red-500"
            >
              {errors.lastName.message}
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
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
              required: 'This field is required',
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
        <div className="col-span-2">
          {/* message */}
          <textarea
            placeholder="Your message*"
            className={`w-full input ${errors.message ? 'error' : ''}`}
            rows={7}
            {...register('message', {
              required: 'This field is required',
              minLength: { value: 10, message: 'This field must be at least 10 characters long' }
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
          <label
            className="block text-sm font-medium text-primary-dark mb-2"
          >
            Add your resume* (PDF, DOC, DOCX)
          </label>
          <div className="w-fit">
            <Controller
              name="file"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FileUploader
                  // handleChange={(files: File) => setFile(files)}
                  types={['pdf', 'doc', 'docx']}
                  multiple={false}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                  name="file"
                  handleChange={(files: File) => field.onChange(files)}
                >
                  <div
                    className="flex items-center gap-3 border border-dashed border-primary-dark rounded-xl p-1 pr-3 cursor-pointer"
                  >
                    <Button
                      variant="outlined"
                      className="text-sm flex items-center gap-2"
                    >
                      <RiUpload2Line
                        className="text-base"
                      />
                      <span>
                        Upload File
                      </span>
                    </Button>
                    {
                      getValues('file') ? (
                        <span>
                          {getValues('file')?.name}
                        </span>
                      ) : (
                        <span>
                          Or drop file
                        </span>
                      )
                    }
                  </div>
                </FileUploader>
              )}
            />
            {/* <FileUploader
              // handleChange={(files: File) => setFile(files)}
              types={['pdf', 'doc', 'docx']}
              multiple={false}
              maxFileSize={10000000}
              minFileSize={0}
              clickable
              {...register('file', { required: 'This field is required' })}
            >
              <div
                className="flex items-center gap-3 border border-dashed border-primary-dark rounded-xl p-1 pr-3 cursor-pointer"
              >
                <Button
                  variant="outlined"
                  className="text-sm flex items-center gap-2"
                >
                  <RiUpload2Line
                    className="text-base"
                  />
                  <span>
                    Upload File
                  </span>
                </Button>
                {
                  file ? (
                    <span>
                      {file.name}
                    </span>
                  ) : (
                    <span>
                      Or drop file
                    </span>
                  )
                }
              </div>
            </FileUploader> */}
            {/* error message */}
            {errors.file && (
              <Paragraph
                className="text-red-500"
              >
                {errors.file.message}
              </Paragraph>
            )}
          </div>
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
          Submit Application
        </span>
        {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </Button>
    </form>
  )
}

export default PostJobForm