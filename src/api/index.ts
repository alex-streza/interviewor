import { QueryClient } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../types/generated/graphql'

const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/graphql',
)
export const {
  getQuestions,
  getQuestionsByCategory,
  getCategories,
  getNewRoomId,
  getTotalCount,
} = getSdk(gqlClient)

export const pageSize = 25

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})
