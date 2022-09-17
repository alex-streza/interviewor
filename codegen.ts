import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: process.env.API_URL ?? "http://localhost:3000/api/graphql",
	documents: ["./src/**/*.graphql"],
	generates: {
		"./src/types/generated/graphql.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
		},
	},
};

export default config;
