import { AppShell, Global, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const theme = useMantineTheme();

	return (
		<>
			<Global
				styles={(theme) => ({
					".mantine-Button-label": {
						display: "inline-flex",
						gap: "8px",
						alignItems: "center",
					},
				})}
			/>
			<AppShell
				className="app-shell"
				styles={{
					main: {
						background: theme.colorScheme === "dark" ? theme.colors.gray[1] : theme.colors.white[0],
						paddingInline: "0",
						marginInline: "0",
						paddingTop: "70px",
					},
				}}
				footer={<Footer />}
				header={<Navigation />}>
				{children}
			</AppShell>
		</>
	);
};

export default Layout;
