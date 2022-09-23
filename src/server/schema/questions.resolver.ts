import { PrismaClient } from '@prisma/client'
import { pageSize } from 'src/api'
import { Arg, Int, Query, Resolver } from 'type-graphql'
import { Question } from './questions'

const prisma = new PrismaClient()
@Resolver(Question)
export class QuestionsResolver {
  @Query(() => [Question])
  async questionsByCategory(
    @Arg('category_id', () => Int, { nullable: true }) category_id = 1,
    @Arg('page', () => Int, { nullable: true }) page?: number,
  ): Promise<Question[]> {
    const questions = await prisma.question.findMany({
      where: {
        category_id,
      },
      include: {
        category: true,
      },
      take: pageSize,
      skip: ((page ?? 1) - 1) * pageSize,
    })

    return questions
  }

  @Query(() => [Question])
  async questions(): Promise<Question[]> {
    return prisma.question.findMany({
      include: {
        category: true,
      },
    })
  }

  @Query(() => String)
  async totalCount(): Promise<string> {
    const count = await prisma.question.count()
    return '+' + Math.floor(count / 10) * 10
  }
}
