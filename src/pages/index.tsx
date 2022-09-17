import Cards from "@components/cards/Cards";
import CategoryCard from "@components/cards/CategoryCard";
import TwitterIcon from "@components/icons/twitter.svg";
import ReactIcon from "@components/icons/react.svg";
import TypescriptIcon from "@components/icons/typescript.svg";
import GetStarted from "@components/sections/GetStarted";
import Hero from "@components/sections/Hero";
import Section from "@components/sections/Section";
import { Button, Container, Group, useMantineTheme } from "@mantine/core";
import { BookIcon, CommandPaletteIcon, MarkGithubIcon, ShareAndroidIcon } from "@primer/octicons-react";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { getQuestionsByCategory, queryClient } from "src/api";
import TestimonialCard from "@components/cards/TestimonialCard";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import FeatureCard from "@components/cards/FeatureCard";

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
		name: "react",
		icon: <ReactIcon />,
	},
	{
		name: "typescript",
		icon: <TypescriptIcon />,
	},
];

const Home = () => {
	const theme = useMantineTheme();

	const autoplay = useRef(Autoplay({ delay: 2000 }));

	const [selectedCategory, setSelectedCategory] = useState("react");

	const { data } = useQuery(["questionsByCategory", selectedCategory], () =>
		getQuestionsByCategory({
			category: selectedCategory,
		})
	);

	const questions = (data?.questionsByCategory ?? []) as any[];

	return (
		<Container m="none" px="none" fluid>
			<Hero questions={questions} />
			<Section
				id="feature1"
				title={
					<>
						Single app, <br />
						Simple workflow
					</>
				}
				subtitle="For interviewees & interviewers alike"
				description="No need for multiple apps and years of video editing knowledge, content within clicks.">
				<Carousel slideSize="248px" slideGap="sm" withControls={false} mt="sm">
					<Carousel.Slide>
						<FeatureCard title="Pick a topic & difficulty" icon={<BookIcon size={40} fill={theme.colors.blue[4]} />} />
					</Carousel.Slide>
					<Carousel.Slide>
						<FeatureCard
							title="Go through questions and answer"
							icon={<CommandPaletteIcon size={40} fill={theme.colors.blue[4]} />}
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<FeatureCard
							title="Share it with your interviewer"
							icon={<ShareAndroidIcon size={40} fill={theme.colors.blue[4]} />}
						/>
					</Carousel.Slide>
				</Carousel>
			</Section>
			<Section
				id="feature2"
				title="Over 1000 questions"
				subtitle="Never run out of questions"
				description="Train on over 1000 React, Node.JS, Javascript, CSS, HTML questions and answers.">
				<Group my="xs">
					{categories.map((category) => (
						<CategoryCard
							key={category.name}
							selected={category.name === selectedCategory}
							onSelect={() => setSelectedCategory(category.name)}>
							{category.icon}
						</CategoryCard>
					))}
				</Group>
				<Cards questions={questions} hasNavigation />
			</Section>
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
					<Cards questions={questions} hasNavigation />
				</Group>
			</Section>
			<Section id="testimonials" title="Testimonials" subtitle="Join the community">
				<Group mb="sm">
					<Button size="md" variant="light">
						<MarkGithubIcon size={24} />
						GitHub
					</Button>
					<Button size="md" variant="light">
						<TwitterIcon />
						Twitter
					</Button>
				</Group>
				<Carousel
					slideSize="300px"
					slideGap="sm"
					plugins={[autoplay.current]}
					onMouseEnter={autoplay.current.stop}
					onMouseLeave={autoplay.current.reset}
					withControls={false}
					loop>
					<Carousel.Slide>
						<TestimonialCard
							name="John Doe"
							avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
							tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
							username="johndoe"
							tweet="This is amazing! I was able to get a job at Google with the help of this app. Thank you so much!"
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<TestimonialCard
							name="John Doe"
							avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
							tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
							username="johndoe"
							tweet="This is amazing! I was able to get a job at Google with the help of this app. Thank you so much!"
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<TestimonialCard
							name="John Doe"
							avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
							tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
							username="johndoe"
							tweet="This is amazing! I was able to get a job at Google with the help of this app. Thank you so much!"
						/>
					</Carousel.Slide>
				</Carousel>
			</Section>
			<GetStarted />
		</Container>
	);
};

export default Home;
