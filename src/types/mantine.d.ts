import {
  Tuple,
  MantineNumberSize as MantineNumberSizeBase,
} from '@mantine/core'

type CustomColors = 'blue' | 'white' | 'gray'
type CustomSpacing = 'xxs' | '2xl' | 'auto' | 'none'

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, Tuple<string, 10>>
  }
  export type MantineNumberSize = MantineNumberSizeBase | CustomSpacing
}
