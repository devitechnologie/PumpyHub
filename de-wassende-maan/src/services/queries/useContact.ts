import { useMutation } from 'react-query'

import { submitContactForm } from '../api/contactForm'

export const useContact = () => {
  return useMutation(submitContactForm)
}