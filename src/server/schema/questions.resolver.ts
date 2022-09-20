import { PrismaClient } from '@prisma/client'
import { Arg, Query, Resolver } from 'type-graphql'
import { Question } from './questions'

const prisma = new PrismaClient()

@Resolver(Question)
export class QuestionsResolver {
  @Query(() => [Question])
  questionsByCategory(
    @Arg('category', () => String) category: string,
  ): Promise<Question[]> {
    return prisma.question.findMany({
      where: {
        category: category,
      },
      take: 5,
    })
  }

  @Query(() => [Question])
  questions(): Promise<Question[]> {
    return prisma.question.findMany()
  }
}
