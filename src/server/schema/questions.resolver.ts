import { PrismaClient, Question as QuestionType } from '@prisma/client'
import { pageSize as defaultPageSize } from 'src/api'
import { Arg, Int, Query, Resolver } from 'type-graphql'
import { prisma } from './client'
import { Question } from './questions'

export class QuestionsResolver {
  @Query(() => [Question])
  async questionsByCategory(
    @Arg('category_ids', () => [Int], { nullable: true })
    category_ids = [1, 2, 3, 4, 5, 6],
    @Arg('page', () => Int, { nullable: true }) page?: number,
    @Arg('page_size', () => Int, { nullable: true })
    page_size = defaultPageSize,
    @Arg('search', () => String, { nullable: true }) search = '',
  ): Promise<QuestionType[]> {
    const questions = await prisma.question.findMany({
      where: {
        category_id: {
          in: category_ids,
        },
        AND: {
          text: {
            contains: search,
          },
        },
      },
      include: {
        category: true,
      },
      take: page_size,
      skip: ((page ?? 1) - 1) * page_size,
    })

    return questions
  }

  @Query(() => [Question])
  async questions(): Promise<QuestionType[]> {
    return prisma.question.findMany({
      include: {
        category: true,
      },
    })
  }

  @Query(() => Int)
  async totalCount(
    @Arg('category_ids', () => [Int], { nullable: true })
    category_ids = [1, 2, 3, 4, 5, 6],
    @Arg('search', () => String, { nullable: true }) search = '',
  ): Promise<number> {
    const count = await prisma.question.count({
      where: {
        category_id: {
          in: category_ids,
        },
        AND: {
          text: {
            contains: search,
          },
        },
      },
    })
    return count
  }
}
