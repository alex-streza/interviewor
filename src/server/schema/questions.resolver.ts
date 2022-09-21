import { PrismaClient } from '@prisma/client'
import { pageSize } from 'src/api'
import { Arg, Int, Query, Resolver } from 'type-graphql'
import { Question } from './questions'

const prisma = new PrismaClient()

@Resolver(Question)
export class QuestionsResolver {
  @Query(() => [Question])
  async questionsByCategory(
    @Arg('category_id', () => Int, { nullable: true }) category_id: number,
    @Arg('page', () => Int, { nullable: true }) page?: number,
  ): Promise<Question[]> {
    return prisma.question.findMany({
      where: {
        category_id,
      },
      include: {
        category: true,
      },
      take: pageSize,
      skip: ((page ?? 1) - 1) * pageSize,
    })
  }

  @Query(() => [Question])
  async questions(): Promise<Question[]> {
    return prisma.question.findMany({
      include: {
        category: true,
      },
    })
  }
}
