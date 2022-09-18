import { MantineProvider } from "@mantine/core";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import { queryClient } from "src/api";
import Layout from "@components/layout";
import "@styles/fonts.css";
import "@styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<SessionProvider session={session}>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							fontFamily: "Onest, sans-serif !important",
							headings: {
								sizes: {
									h1: {
										fontSize: "60px",
										lineHeight: "68px",
										fontWeight: 900,
									},
									h2: {
										fontWeight: 900,
									},
								},
							},
							colors: {
								white: ["#FAFAFA"],
								gray: ["#2F2F2F", "#131313"],
								blue: [
									"#CAF0F8",
									"#ADE8F4",
									"#90E0EF",
									"#48CAE4",
									"#00B4D8",
									"#0096C7",
									"#0077B6",
									"#023E8A",
									"#03045E",
								],
							},
							primaryColor: "blue",
							primaryShade: { light: 3, dark: 7 },
							spacing: {
								auto: "auto",
								none: 0,
								xxs: 8,
								xs: 20,
								sm: 32,
								lg: 100,
								xl: 136,
								"2xl": 180,
							},
							breakpoints: {
								sm: 480,
								md: 768,
								lg: 976,
								xl: 1440,
							},
							defaultRadius: 8,
						}}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</MantineProvider>
				</SessionProvider>
			</Hydrate>
		</QueryClientProvider>
	);
};

export default MyApp;
