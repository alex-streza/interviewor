import { Category } from './categories'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Question {
  @Field(() => ID)
  id!: number

  @Field()
  text!: string

  @Field()
  answer!: string

  @Field(() => Int)
  category_id!: number

  @Field(() => Category)
  category!: Category

  @Field()
  source!: string
}
