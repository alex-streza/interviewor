import { Box, Button, Collapse, createStyles, Title } from "@mantine/core";
import { darken } from "color2k";
import { useCallback, useState } from "react";

interface QuestionCardProps {
	title?: string;
	answer?: string;
	index: number;
	onPause?: () => void;
}

const useStyles = createStyles((theme, { index }: { index: number }) => ({
	container: {
		backgroundColor: darken("#F5FEFF", index * 0.05),
		borderRadius: "12px",
		padding: "20px",
		scale: 100 - 10 * index + "%",
		zIndex: 3 - index,
		marginTop: index > 0 ? -140 : 0,
		width: "100%",
		minWidth: "300px",
		maxWidth: "400px",
		minHeight: "160px",
		border: `1px solid ${theme.colors.blue[5]}`,
		justifyContent: "space-between",
		display: "flex",
		alignItems: "left",
		flexDirection: "column",
		boxShadow: `4px 4px 12px 0px hsla(189, 75%, 75%, 0.25)`,
		cursor: "pointer",
	},
	title: {
		fontSize: 18,
		marginBottom: 12,
	},
	answer: {
		maxWidth: "320px",
		overflowX: "auto",
	},
	button: {
		padding: "0px",
		width: "fit-content",
	},
}));

const QuestionCard = ({ title, answer, index, onPause }: QuestionCardProps) => {
	const [shown, setShown] = useState(false);

	const { classes } = useStyles({ index });

	const handleShowAnswer = useCallback(() => {
		setShown(!shown);
		onPause && onPause();
	}, [onPause, shown]);

	return (
		<Box className={classes.container} onClick={handleShowAnswer}>
			<Title order={3} className={classes.title}>
				{title}
			</Title>
			<Collapse in={shown}>
				<div className={classes.answer} dangerouslySetInnerHTML={{ __html: answer ?? "" }} />
			</Collapse>
			{index === 0 && (
				<Button variant="white" className={classes.button} onClick={handleShowAnswer}>
					{shown ? "Hide Answer" : "Show Answer"}
				</Button>
			)}
		</Box>
	);
};

export default QuestionCard;
