import "@emotion/react"
import theme from "./src/styles/theme"

type WebCodeTestTheme = typeof theme

declare module "@emotion/react" {
    export interface Theme extends WebCodeTestTheme {}
}
