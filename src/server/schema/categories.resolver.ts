import { Query, Resolver } from 'type-graphql'
import { Category } from './categories'
import { prisma } from './client'

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    const categories = await prisma.category.findMany()
    const data = []

    for (const category of categories) {
      data.push({
        ...category,
        count: await prisma.question.count({
          where: {
            category_id: category.id,
          },
        }),
      })
    }

    return data
  }
}
