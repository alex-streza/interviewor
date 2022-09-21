import { CategoriesResolver } from '@server/schema/categories.resolver'
import { QuestionsResolver } from '@server/schema/questions.resolver'
import { RoomsResolver } from '@server/schema/rooms.resolver'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

const schema = await buildSchema({
  resolvers: [QuestionsResolver, CategoriesResolver, RoomsResolver],
})

const server = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false,
  },
}

const startServer = server.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}
