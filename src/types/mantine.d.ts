import { Tuple, MantineNumberSize as MantineNumberSizeBase } from "@mantine/core";

type CustomColors = "blue" | "white" | "gray";
type CustomSpacing = "xxs" | "auto" | "none" | MantineNumberSizeBase;

declare module "@mantine/core" {
	export interface MantineThemeColorsOverride {
		colors: Record<CustomColors, Tuple<string, 10>>;
	}
	export type MantineNumberSize = CustomSpacing;
}

// // or if you want to "extend" standard colors
// import { Tuple, DefaultMantineColor } from '@mantine/core';

// type ExtendedCustomColors = 'primaryColorName' | 'secondaryColorName' | DefaultMantineColor;

// declare module '@mantine/core' {
//   export interface MantineThemeColorsOverride {
//     colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
//   }
// }
