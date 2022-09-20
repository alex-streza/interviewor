import { Box, createStyles, Title } from "@mantine/core";
import { ReactNode, useState } from "react";

interface FeatureCardProps {
	title: string;
	icon: ReactNode;
	hideSeparator?: boolean;
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
		position: "relative",
	},
	title: {
		fontSize: 18,
		marginBottom: 12,
		textAlign: "center",
		marginTop: 12,
	},
	separator: {
		position: "absolute",
		bottom: 60,
		right: -30,
		zIndex: -1,
	},
}));

const FeatureCard = ({ title, icon, hideSeparator }: FeatureCardProps) => {
	const { classes } = useStyles();

	return (
		<Box className={classes.container}>
			{icon}
			<Title order={3} className={classes.title}>
				{title}
			</Title>
			{!hideSeparator && (
				<svg
					className={classes.separator}
					width="50"
					height="17"
					viewBox="0 0 50 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M3 14C4.87713 12.3224 10.5085 4.03812 14.2628 3.93435C18.0171 3.83058 21.7964 13.533 25.5256 13.3774C29.2548 13.2217 33.0592 3.06961 36.6382 3.00043C40.2173 2.93125 45.273 11.302 47 12.9623"
						stroke="url(#paint0_linear_144_60)"
						strokeWidth="6"
						strokeLinecap="round"
						strokeDasharray="22 20"
					/>
					<defs>
						<linearGradient id="paint0_linear_144_60" x1="3" y1="3" x2="47" y2="3" gradientUnits="userSpaceOnUse">
							<stop stopColor="#ADE8F4" />
							<stop offset="1" stopColor="#00B4D8" />
						</linearGradient>
					</defs>
				</svg>
			)}
		</Box>
	);
};

export default FeatureCard;
