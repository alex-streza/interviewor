import { Button, createStyles, Group, Stack } from "@mantine/core";
import { Question } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

interface CardsProps {
	questions: Question[];
	autoPlay?: boolean;
	hasNavigation?: boolean;
}

const useStyles = createStyles(() => ({
	container: {
		marginInline: "20px",
	},
}));

const MotionGroup = motion(Group);

const Cards = ({ questions: initialQuestions, autoPlay, hasNavigation }: CardsProps) => {
	const { classes } = useStyles();

	const [questions, setQuestions] = useState<Question[]>(initialQuestions);
	const [paused, setPaused] = useState(false);

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
		<Stack>
			<MotionGroup
				className={classes.container}
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
			{hasNavigation && (
				<Group mx="auto">
					<Button
						variant="light"
						onClick={() => {
							const [first, ...rest] = questions;
							setQuestions([...rest, first] as any[]);
						}}>
						Previous
					</Button>
					<Button
						onClick={() => {
							const [last, ...rest] = questions.reverse();
							setQuestions([last, ...rest] as any[]);
						}}>
						Next
					</Button>
				</Group>
			)}
		</Stack>
	);
};

export default Cards;
