declare module 'cli-progress' {
  export class SingleBar {
    constructor(options: any, presets: any)
    start(total: number, startValue: number): void
    increment(value: number): void
    stop(): void
  }

  export const Presets: any
}
