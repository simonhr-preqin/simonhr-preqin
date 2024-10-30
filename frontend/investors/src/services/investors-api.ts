import { QueryClient } from "@tanstack/react-query"
import { INVESTORS_API_URL } from "../utils/config"

const defaultQueryFn = async ({ queryKey }) => {
  const response = await fetch(
    `${INVESTORS_API_URL}${queryKey[0]}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json()
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})
