import { Container, createStyles, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles((theme) => ({
	container: {
		marginBlock: "60px",
		paddingInline: "20px",
		overflow: "hidden",
	},
	title: {
		fontSize: 28,
		lineHeight: 1.2,

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			fontSize: 40,
		},
	},
	button: {
		position: "relative",
	},
	text: {
		marginTop: "8px",
		marginBottom: "40px",
	},
}));

interface SectionProps {
	id: string;
	title: ReactNode;
	subtitle: string;
	description?: string;
	children?: ReactNode;
}

const Section = ({ id, title, subtitle, description, children }: SectionProps) => {
	const { classes } = useStyles();

	return (
		<section id={id}>
			<Container className={classes.container}>
				<Text color="blue" weight={600} size="sm">
					{subtitle}
				</Text>
				<Title order={2} className={classes.title} mb="xs">
					{title}
				</Title>
				<Text align="left" color="dimmed">
					{description}
				</Text>
				{children}
			</Container>
		</section>
	);
};

export default Section;
