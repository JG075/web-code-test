import { css, Global, keyframes } from "@emotion/react"
import theme from "./theme"

export default (
    <Global
        styles={{
            body: {
                margin: 0,
                padding: "0 40px",
                background: theme.palette.primary.light,
                fontFamily: "Arial, sans-serif",
                fontSize: theme.typography.body.regular,
            },
            "h1, h2, h3, h4, h5, h6": {
                margin: 0,
                color: theme.palette.primary.dark,
            },
            h1: {
                fontSize: theme.typography.headline.regular,
            },
            h2: {
                fontSize: theme.typography.headline.small,
            },
            a: {
                color: theme.palette.primary.dark,
                textDecoration: "none",
            },
            p: {
                margin: 0,
                lineHeight: "21px",
            },
        }}
    />
)
