import { Box, Button, Collapse, createStyles, Title } from "@mantine/core";
import { useState } from "react";

interface QuestionCardProps {
	title: string;
	answer: string;
	index: number;
	onPause: () => void;
}

const useStyles = createStyles((theme, { index }: { index: number }) => ({
	container: {
		backgroundColor: theme.colors.white[0],
		borderRadius: "12px",
		padding: "20px",
		scale: 100 - 10 * index + "%",
		zIndex: 3 - index,
		marginTop: index > 0 ? "-60px" : "0px",
		opacity: index === 0 ? 1 : 1 - 0.2 * index,
		width: "100%",
		boxShadow: `4px 4px 12px 0px hsla(189, 75%, 75%, 0.25)`,
	},
	title: {
		fontSize: 18,
		marginBottom: 12,
	},
	answer: {
		width: "260px",
		overflowX: "auto",
	},
	button: {
		padding: "0px",
		marginTop: 12,
	},
}));

const QuestionCard = ({ title, answer, index, onPause }: QuestionCardProps) => {
	const [shown, setShown] = useState(false);

	const { classes } = useStyles({ index });

	return (
		<Box className={classes.container}>
			<Title order={3} className={classes.title}>
				{title}
			</Title>
			<Collapse in={shown}>
				<div className={classes.answer} dangerouslySetInnerHTML={{ __html: answer }} />
			</Collapse>
			{index === 0 && (
				<Button
					variant="white"
					className={classes.button}
					onClick={() => {
						setShown(!shown);
						onPause();
					}}>
					{shown ? "Hide Answer" : "Show Answer"}
				</Button>
			)}
		</Box>
	);
};

export default QuestionCard;
