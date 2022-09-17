import { Box, createStyles, Title } from "@mantine/core";
import { ReactNode, useState } from "react";

interface FeatureCardProps {
	title: string;
	icon: ReactNode;
}

const useStyles = createStyles((theme) => ({
	container: {
		backgroundColor: theme.colors.white[0],
		boxShadow: `4px 4px 12px 0px hsla(189, 75%, 75%, 0.25)`,
		borderRadius: "12px",
		padding: "20px",
		border: `1px ${theme.colors.blue[4]} solid`,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		marginBottom: 12,
		textAlign: "center",
		marginTop: 12,
	},
}));

const FeatureCard = ({ title, icon }: FeatureCardProps) => {
	const { classes } = useStyles();

	return (
		<Box className={classes.container}>
			{icon}
			<Title order={3} className={classes.title}>
				{title}
			</Title>
		</Box>
	);
};

export default FeatureCard;
