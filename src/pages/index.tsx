import Cards from "@components/cards/Cards";
import CategoryCard from "@components/cards/CategoryCard";
import TwitterIcon from "@components/icons/twitter.svg";
import ReactIcon from "@components/icons/react.svg";
import TypescriptIcon from "@components/icons/typescript.svg";
import GetStarted from "@components/sections/GetStarted";
import Hero from "@components/sections/Hero";
import Section from "@components/sections/Section";
import { Button, Text, Container, Group, useMantineTheme } from "@mantine/core";
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
				description="No need for multiple apps and years of video editing knowledge, content within clicks."
				fullWidth>
				<Carousel slideSize="248px" slideGap="sm" withControls={false} mt="sm" px="xs" align="start">
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
							hideSeparator
						/>
					</Carousel.Slide>
				</Carousel>
			</Section>
			<Section
				id="feature2"
				title="Over 200 questions"
				subtitle="Never run out of questions"
				description="Train on over 200 React questions and answers.">
				<Text mt="xxs">Pick category:</Text>
				<Group mt="xs" mb="sm">
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
					<Button size="md" mb="xs">
						<ShareAndroidIcon size={24} />
						Share interview
					</Button>
					<Cards questions={questions} hasNavigation />
				</Group>
			</Section>
			<Section id="testimonials" title="Testimonials" subtitle="Join the community" fullWidth>
				<Group mb="sm" px="xs">
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
							name="Betty Blue"
							avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
							tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
							username="@betty_xyz"
							tweet="Interviewor is such a great idea! It makes theory based interviews so easy it’s unbelievable."
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<TestimonialCard
							name="Jim Halpert"
							avatar="https://avatars.githubusercontent.com/u/1143320?v=5"
							tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
							username="@jim_office"
							tweet="This is amazing! I was able to get a job at Google with the help of this app. Thank you so much!"
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<TestimonialCard
							name="Jon Snow"
							avatar="https://avatars.githubusercontent.com/u/1243320?v=4"
							tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
							username="@jon_got"
							tweet="Losing the love of my life to unbridled and ilogical madness spree led me to tech. Interviewor stood by my side when I needed a job."
						/>
					</Carousel.Slide>
					<Carousel.Slide>
						<TestimonialCard
							name="Saul Goodman"
							avatar="https://avatars.githubusercontent.com/u/143320?v=4"
							tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
							username="@real_goodman"
							tweet="@interviewor being completely free is simply marvelous. Love what you’re building @alex_streza."
						/>
					</Carousel.Slide>
				</Carousel>
			</Section>
			<GetStarted />
		</Container>
	);
};

export default Home;
