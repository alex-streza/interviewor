import { Button, createStyles, Group, Stack } from "@mantine/core";
import { ArrowLeftIcon, ArrowRightIcon } from "@primer/octicons-react";
import { Question } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

interface CardsProps {
	questions: Question[];
	autoPlay?: boolean;
	hasNavigation?: boolean;
}

const useStyles = createStyles((theme, { hasNavigation, paused }: { paused?: boolean; hasNavigation?: boolean }) => ({
	container: {
		marginInline: "20px",
		height: paused ? "100%" : hasNavigation ? "320px" : "200px",
	},
}));

const MotionGroup = motion(Group);

const Cards = ({ questions: initialQuestions, autoPlay, hasNavigation }: CardsProps) => {
	const [questions, setQuestions] = useState<Question[]>(initialQuestions);
	const [paused, setPaused] = useState(false);

	const { classes } = useStyles({ hasNavigation, paused });

	useEffect(() => {
		setQuestions(initialQuestions);
	}, [initialQuestions]);

	useEffect(() => {
		if (autoPlay && !paused && initialQuestions.length > 0) {
			const interval = setInterval(() => {
				if (!paused) {
					const [first, ...rest] = initialQuestions;
					setQuestions([...rest, first] as any[]);
				}
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [autoPlay, initialQuestions, paused]);

	return (
		<Stack className={classes.container}>
			<MotionGroup
				layout
				transition={{
					layout: { duration: 0.3 },
				}}>
				{questions.length > 0 &&
					questions
						.slice(0, 3)
						.map((question, index) => (
							<QuestionCard
								key={question.id}
								index={index}
								title={question.text}
								answer={question.answer}
								onPause={() => setPaused(!paused)}
							/>
						))}
			</MotionGroup>
			{hasNavigation && questions.length > 0 && (
				<Group mx="auto" mt="auto">
					<Button
						variant="light"
						onClick={() => {
							const [first, ...rest] = questions;
							setQuestions([...rest, first] as any[]);
							setPaused(false);
						}}>
						<ArrowLeftIcon />
						Previous
					</Button>
					<Button
						onClick={() => {
							const last = questions.pop();
							setQuestions([last, ...questions] as any[]);
							setPaused(false);
						}}>
						Next
						<ArrowRightIcon />
					</Button>
				</Group>
			)}
		</Stack>
	);
};

export default Cards;
