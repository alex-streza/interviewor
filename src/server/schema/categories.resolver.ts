import { PrismaClient } from '@prisma/client'
import { Query, Resolver } from 'type-graphql'
import { Category } from './categories'

const prisma = new PrismaClient()

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return prisma.category.findMany()
  }
}
