import Cards from "@components/cards/Cards";
import CategoryCard from "@components/cards/CategoryCard";
import ReactIcon from "@components/icons/react.svg";
import TypescriptIcon from "@components/icons/typescript.svg";
import { Container, Group, Center, Button, createStyles, Grid, Text, Title, CopyButton } from "@mantine/core";
import { ArrowRightIcon, CopyIcon, ShareAndroidIcon } from "@primer/octicons-react";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { getQuestionsByCategory, queryClient } from "src/api";
import { Maybe } from "type-graphql";

export async function getServerSideProps() {
	await queryClient.prefetchQuery(["questionsByCategory"], () =>
		getQuestionsByCategory({
			category: "react",
		})
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

const categories = [
	{
		name: "React",
		icon: <ReactIcon />,
	},
	{
		name: "TypeScript",
		icon: <TypescriptIcon />,
	},
];

const useStyles = createStyles((theme) => ({
	container: { paddingBlock: "40px" },
	shareContainer: {
		display: "flex",
		justifyContent: "center",
		marginBottom: 40,
	},
	title: {
		fontSize: 28,
		lineHeight: 1.2,
		textAlign: "center",

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			fontSize: 40,
		},
	},
	description: {
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		border: "2px solid",
		fontSize: 16,
		borderColor: theme.colors.blue[4],
		color: theme.colors.blue[4],
	},
}));

const Interview = () => {
	const { classes } = useStyles();

	const router = useRouter();

	const [selectedCategory, setSelectedCategory] = useState<
		Maybe<{
			name: string;
			icon: JSX.Element;
		}>
	>(null);
	const [tempSelectedCategory, setTempSelectedCategory] = useState<Maybe<string>>(null);

	const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

	const { data } = useQuery(["questionsByCategory", selectedCategory], () =>
		getQuestionsByCategory({
			category: (selectedCategory?.name ?? "").toLowerCase(),
		})
	);

	const questions = (data?.questionsByCategory ?? []) as any[];

	return (
		<Container m="none" px="xs" className={classes.container} fluid>
			{!selectedCategory && (
				<>
					<Title order={1} className={classes.title} mb="xs">
						Pick topic
					</Title>
					<Text className={classes.description}>
						Train on over 1000 React, Node.JS, Javascript, CSS, HTML questions and answers.
					</Text>
				</>
			)}
			{selectedCategory && (
				<Group className={classes.shareContainer}>
					<Button
						variant="light"
						size="lg"
						className={classes.button}
						onClick={() => {
							setSelectedCategory(null);
						}}>
						{selectedCategory.name}
						{selectedCategory.icon}
					</Button>
					<CopyButton value={origin + router.asPath}>
						{({ copied, copy }) => (
							<Button size="lg" onClick={copy}>
								{copied ? "Copied" : "Share"}
								<CopyIcon size={24} />
							</Button>
						)}
					</CopyButton>
				</Group>
			)}
			{!selectedCategory && (
				<Grid my="xs">
					{categories.map((category) => (
						<Grid.Col key={category.name} span={6}>
							<CategoryCard
								selected={category.name == tempSelectedCategory}
								onSelect={() => setTempSelectedCategory(category.name)}>
								{category.name}
								{category.icon}
							</CategoryCard>
						</Grid.Col>
					))}
				</Grid>
			)}
			{selectedCategory && <Cards questions={questions} hasNavigation />}
			{!selectedCategory && (
				<Center>
					<Button
						variant={!tempSelectedCategory ? "white" : "primary"}
						disabled={!tempSelectedCategory}
						size="lg"
						onClick={() => {
							setSelectedCategory(categories.find((category) => category.name == tempSelectedCategory));
						}}>
						Next
						<ArrowRightIcon size={24} />
					</Button>
				</Center>
			)}
		</Container>
	);
};

export default Interview;
