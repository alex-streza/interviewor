import { Container, createStyles, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles((theme, { fullWidth }: { fullWidth?: boolean }) => ({
	container: {
		marginBlock: "60px",
		paddingInline: fullWidth ? 0 : 20,
		overflow: "hidden",
	},
	textContainer: {
		paddingInline: !fullWidth ? 0 : 20,
	},
	title: {
		fontSize: 28,
		lineHeight: 1.2,
		marginBottom: 12,
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
	fullWidth?: boolean;
	children?: ReactNode;
}

const Section = ({ id, title, subtitle, description, fullWidth, children }: SectionProps) => {
	const { classes } = useStyles({ fullWidth });

	return (
		<section id={id}>
			<Container className={classes.container}>
				<Container className={classes.textContainer}>
					<Text color="blue" weight={600} size="sm">
						{subtitle}
					</Text>
					<Title order={2} className={classes.title}>
						{title}
					</Title>
					<Text align="left" color="dimmed">
						{description}
					</Text>
				</Container>
				{children}
			</Container>
		</section>
	);
};

export default Section;
