import TwitterIcon from "@components/icons/twitter.svg";
import GetStarted from "@components/sections/GetStarted";
import Hero from "@components/sections/Hero";
import Section from "@components/sections/Section";
import { Button, Container, Group } from "@mantine/core";
import { MarkGithubIcon, ShareAndroidIcon } from "@primer/octicons-react";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { getQuestionsByCategory, queryClient } from "src/api";

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

const Home = () => {
	const { data } = useQuery(["questionsByCategory"], () =>
		getQuestionsByCategory({
			category: "react",
		})
	);

	return (
		<Container m="none" px="none" fluid>
			<Hero />
			<Section
				id="feature1"
				title={
					<>
						Single app, <br />
						Simple workflow
					</>
				}
				subtitle="For interviewees & interviewers alike"
				description="No need for multiple apps and years of video editing knowledge, content within clicks."></Section>
			<Section
				id="feature2"
				title="Over 1000 questions"
				subtitle="Never run out of questions"
				description="Train on over 1000 React, Node.JS, Javascript, CSS, HTML questions and answers."></Section>
			<Section
				id="feature3"
				title="Take your coding interviews to a new level"
				subtitle="Interviews are cool now"
				description="Share link with your interviewer and start explaining concepts you know in realtime & collaboratively.">
				<Group mt="xs">
					<Button size="md">
						<ShareAndroidIcon size={24} />
						Share interview
					</Button>
				</Group>
			</Section>
			<Section id="testimonials" title="Testimonials" subtitle="Join the community">
				<Group>
					<Button size="md" variant="light">
						<MarkGithubIcon size={24} />
						GitHub
					</Button>
					<Button size="md" variant="light">
						<TwitterIcon />
						Twitter
					</Button>
				</Group>
			</Section>
			<GetStarted />
		</Container>
	);
};

export default Home;
