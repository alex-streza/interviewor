import "reflect-metadata";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { ApolloServer } from "apollo-server-micro";
import { QuestionsResolver } from "@server/schema/questions.resolver";
import { buildSchema } from "type-graphql";

const schema = await buildSchema({
	resolvers: [QuestionsResolver],
});

const server = new ApolloServer({ schema });

export const config = {
	api: {
		bodyParser: false,
	},
};

const startServer = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await startServer;
	await server.createHandler({
		path: "/api/graphql",
	})(req, res);
}
