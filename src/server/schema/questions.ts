import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Question {
	@Field(() => ID)
	id!: number;

	@Field()
	text!: string;

	@Field()
	answer!: string;

	@Field()
	category!: string;

	@Field()
	difficulty!: string;

	@Field()
	source!: string;
}
