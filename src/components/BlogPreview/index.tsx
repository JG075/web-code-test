import { useTheme } from "@emotion/react"
import Link from "next/link"
import { FC } from "react"

interface Props {
    title: string
    preface?: string
    href: string
}

const BlogPreview: FC<Props> = ({ title, preface, href }) => {
    const theme = useTheme()

    return (
        <article
            css={{
                background: theme.palette.white,
                boxShadow: theme.boxShadow.regular,
                borderRadius: theme.borderRadius.regular,
                padding: 32,
                height: 223,
                flexDirection: "column",
                display: "flex",
                transition: "box-shadow 150ms ease-in",
                ":hover": {
                    boxShadow: theme.boxShadow.dark,
                },
                ":focus": {
                    outline: "none",
                },
                ":focus-visible": {
                    outline: `2px solid ${theme.palette.primary.dark}`,
                },
            }}
            tabIndex={0}
        >
            <h3
                css={{
                    fontSize: theme.typography.headline.regular,
                    marginBottom: 8,
                }}
            >
                <Link href={href}>
                    <a aria-label="Go to blog post">{title}</a>
                </Link>
            </h3>
            <p>{preface}</p>
            <div
                css={{
                    margin: "auto 0 0 auto",
                    fontSize: 32,
                }}
            >
                <Link href={href}>
                    <a aria-label="Go to blog post">→</a>
                </Link>
            </div>
        </article>
    )
}

export default BlogPreview
