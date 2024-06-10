export type TJobPost = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  jobUID: string
  file?: File | null
  reply_to?: string
  cc?: string
}