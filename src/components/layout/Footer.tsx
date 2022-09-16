import { Footer, Group, Stack, Text, NavLink, createStyles } from "@mantine/core";
import Logo from "@components/logo";
import { ScrollableLink } from "./Navigation";

const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-between",
		position: "relative",
		padding: "20px",
		backgroundColor: theme.colors.blue[0],
	},
	link: {
		padding: 0,
	},
}));

const links = [
	{
		label: "Features",
		name: "feature1",
	},
	{
		label: "Examples",
		name: "feature2",
	},
	{
		label: "Testimonials",
		name: "testimonials",
	},
];

const AppFooter = () => {
	const { classes } = useStyles();

	return (
		<Footer height="auto" className={classes.container}>
			<Stack spacing="xxs">
				<Logo />
				<Text size="xs">Tech interviews were never easier</Text>
			</Stack>
			<Group position="left">
				<Stack spacing="xxs">
					{links.map((link, index) => (
						<ScrollableLink key={index} label={link.label} name={link.name} />
					))}
				</Stack>
			</Group>
		</Footer>
	);
};

export default AppFooter;
