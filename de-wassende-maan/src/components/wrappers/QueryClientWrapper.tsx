"use client"

import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

type QueryClientWrapperProps = {
  children: React.ReactNode
}

const QueryClientWrapper = ({ children }: QueryClientWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryClientWrapper