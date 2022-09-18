import { Button, Container, createStyles, Stack, Text, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	container: {
		backgroundColor: theme.colors.blue[0],
		paddingBlock: "40px",
		paddingInline: "0",
		overflow: "hidden",
	},
	title: {
		fontSize: 28,
		lineHeight: 1.2,
		paddingInline: "20px",
		position: "relative",

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			fontSize: 60,
		},
	},
	separator: {
		width: "100%",
		marginBottom: "-20px",
	},
}));

const GetStarted = () => {
	const { classes } = useStyles();

	return (
		<section id="get_started">
			<svg
				width="428"
				height="28"
				viewBox="0 0 428 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={classes.separator}>
				<path
					d="M0 23.2806C2.01408 19.9935 7.8885 3.97554 12.0845 3.55814C16.2805 3.14073 19.4695 20.5674 25.1761 20.7761C30.8826 20.9848 39.7782 4.54948 46.3239 4.81036C52.8697 5.07124 58.4085 21.8197 64.4507 22.3414C70.493 22.8632 75.5282 7.47132 82.5775 7.9409C89.6268 8.41048 100.201 25.0545 106.746 25.1589C113.292 25.2632 116.817 8.88007 121.852 8.56701C126.887 8.25396 130.496 23.4371 136.958 23.2806C143.42 23.124 153.994 7.62785 160.623 7.62785C167.253 7.62785 169.099 23.5415 176.736 23.2806C184.373 23.0197 199.227 6.47998 206.444 6.06257C213.661 5.64516 213.241 21.1414 220.039 20.7761C226.836 20.4109 238.921 4.13207 247.229 3.87119C255.537 3.61032 261.915 19.0543 269.887 19.2109C277.86 19.3674 287.091 4.39295 295.063 4.81036C303.036 5.22776 309.665 21.037 317.722 21.7153C325.778 22.3936 336.52 9.61052 343.401 8.88006C350.283 8.1496 350.702 18.3239 359.011 17.3325C367.319 16.3412 386.452 2.67115 393.25 2.93203C400.048 3.19291 393.837 17.2282 399.796 18.8978C405.754 20.5674 424.133 13.9411 429 12.9498"
					stroke="url(#paint0_linear_60_378)"
					strokeOpacity="0.6"
					strokeWidth="5"
					strokeLinecap="round"
					strokeDasharray="36 20"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_60_378"
						x1="0"
						y1="2.92834"
						x2="429"
						y2="2.92834"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#ADE8F4" />
						<stop offset="1" stopColor="#00B4D8" />
					</linearGradient>
				</defs>
			</svg>
			<Container className={classes.container}>
				<Title order={2} align="center" className={classes.title}>
					Train for your next interview now
				</Title>
				<Text align="center" mt="xs" px="xs">
					{/* Train on over 1000 React, Node.JS, Javascript, CSS, HTML theory-based questions and answers. Share link with
					your interviewer and start explaining concepts know. */}
					Train on over 200 React theory-based questions and answers. Share link with your interviewer and start
					explaining concepts know.
				</Text>
				<Stack mt="sm" align="center" spacing="xxs">
					<Button size="lg">Get started</Button>
					<Text align="center" color="blue" size="sm">
						No account required
					</Text>
				</Stack>
			</Container>
		</section>
	);
};

export default GetStarted;
