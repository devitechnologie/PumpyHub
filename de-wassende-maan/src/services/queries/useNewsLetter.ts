import { useMutation } from 'react-query'

import { subscribeToNewsletter } from '@/services/api/newsletterApi'

export const useNewsLetter = () => {
  return useMutation(subscribeToNewsletter)
}