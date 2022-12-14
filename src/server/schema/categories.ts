import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Category {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string

  @Field()
  value!: string

  @Field()
  active!: boolean

  @Field(() => Int)
  count: number | undefined
}
