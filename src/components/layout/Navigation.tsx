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

const useStyles = createStyles((theme, { centered }: { centered?: boolean }) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "20px",
		backgroundColor: theme.colors.blue[0],
		border: "none",

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			paddingInline: "180px",
		},
	},
	desktopItems: {
		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		},
	},
	drawer: {
		top: "70px",
		backgroundColor: theme.colors.blue[0],
	},
	link: {
		background: "none",
		fontWeight: 700,
		alignItems: centered ? "center" : "right",
		textAlign: centered ? "center" : "right",
		width: "fit-content",

		span: {
			fontSize: 18,

			[`@media (min-width: ${theme.breakpoints.md}px)`]: {
				fontSize: 14,
			},
		},

		"&:hover": {
			background: "none",
			color: theme.colors.blue[6],
		},
	},
	cta: {
		marginTop: "20px",

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			marginTop: 0,
		},
	},
}));

interface ScrollableLinkProps {
	label: string;
	name: string;
	centered?: boolean;
	onClick?: () => void;
}

export const ScrollableLink = ({ label, name, centered, onClick }: ScrollableLinkProps) => {
	const { classes } = useStyles({
		centered,
	});

	return (
		<Link href={`/#${name}`} passHref>
			<NavLink
				className={classes.link}
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

const NavigationItems = ({ onClick, centered }: { onClick: () => void; centered?: boolean }) => (
	<>
		{links.map((link, index) => (
			<ScrollableLink key={index} label={link.label} name={link.name} onClick={onClick} centered={centered} />
		))}
		<Link href="/interview">
			<Button size="md">Get started</Button>
		</Link>
	</>
);

const Navigation = () => {
	const theme = useMantineTheme();
	const { classes } = useStyles({});

	const [opened, setOpened] = useState(false);

	return (
		<Header className={classes.container}>
			<Link href="/">
				<a>
					<Logo />
				</a>
			</Link>
			<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
				<Group className={classes.desktopItems}>
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
								<NavigationItems onClick={() => setOpened(false)} centered />
							</Stack>
						</Center>
					</Drawer>
				</Group>
			</MediaQuery>
		</Header>
	);
};

export default Navigation;
