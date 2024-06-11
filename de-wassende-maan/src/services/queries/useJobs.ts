import { useMutation } from 'react-query'

import { submitJobForm } from '../api/jobsForm'

export const useJobs = () => {
  return useMutation(submitJobForm)
}