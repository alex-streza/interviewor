import Logo from "@components/logo";
import {
	Burger,
	Button,
	Center,
	createStyles,
	Drawer,
	Group,
	Header,
	MediaQuery,
	NavLink,
	Stack,
	useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "20px",
		backgroundColor: theme.colors.blue[0],
	},
	drawer: {
		top: "70px",
		backgroundColor: theme.colors.blue[0],
	},
}));

interface ScrollableLinkProps {
	label: string;
	name: string;
	onClick?: () => void;
}

export const ScrollableLink = ({ label, name, onClick }: ScrollableLinkProps) => {
	return (
		<Link href={`#${name}`} passHref>
			<NavLink
				label={label}
				onClick={() => {
					if (onClick) {
						onClick();
					}
				}}
			/>
		</Link>
	);
};

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

const NavigationItems = ({ onClick }: { onClick: () => void }) => (
	<>
		{links.map((link, index) => (
			<ScrollableLink key={index} label={link.label} name={link.name} onClick={onClick} />
		))}
		<Button size="sm">Get started</Button>
	</>
);

const Navigation = () => {
	const theme = useMantineTheme();
	const { classes } = useStyles();

	const [opened, setOpened] = useState(false);

	return (
		<Header height={70} className={classes.container}>
			<Logo />
			<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
				<Group>
					<NavigationItems onClick={() => setOpened(false)} />
				</Group>
			</MediaQuery>
			<MediaQuery largerThan="sm" styles={{ display: "none" }}>
				<Group>
					<Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} />
					<Drawer
						className={classes.drawer}
						position="right"
						opened={opened}
						onClose={() => setOpened(false)}
						withCloseButton={false}
						padding="xl"
						size="full">
						<Center>
							<Stack align="center" spacing="sm">
								<NavigationItems onClick={() => setOpened(false)} />
							</Stack>
						</Center>
					</Drawer>
				</Group>
			</MediaQuery>
		</Header>
	);
};

export default Navigation;
