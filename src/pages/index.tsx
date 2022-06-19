import { gql, useQuery } from "@apollo/client"
import { useTheme } from "@emotion/react"
import Head from "next/head"
import BlogPreview from "../components/BlogPreview"

export const BLOG_LIST_QUERY = gql`
    {
        blogPostCollection(skip: 0, limit: 10, order: title_ASC) {
            items {
                title
                preface
                sys {
                    id
                }
            }
        }
    }
`

export default function BlogListingPage() {
    const theme = useTheme()
    const { loading, error, data } = useQuery(BLOG_LIST_QUERY)

    const renderHeader = () => {
        return (
            <div
                css={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <h2 css={{ marginRight: 32 }}>From the blog</h2>
                <hr
                    css={{
                        flex: 1,
                        border: 0,
                        height: 1,
                        background: theme.palette.primary.regular,
                    }}
                />
            </div>
        )
    }

    const renderListSection = () => {
        if (loading) return <p css={{ margin: 100, textAlign: "center" }}>Loading...</p>
        if (error) return <p css={{ margin: 100, textAlign: "center" }}>Error!</p>

        const listItems = data.blogPostCollection.items.map(({ title, preface, sys: { id } }) => {
            return (
                <li key={id}>
                    <BlogPreview title={title} preface={preface} href={`/${id}`} />
                </li>
            )
        })

        return (
            <ul
                css={{
                    listStyle: "none",
                    display: "grid",
                    paddingLeft: 0,
                    gridTemplateColumns: "1fr",
                    rowGap: 32,
                    marginTop: 32,
                    "@media (min-width: 768px)": {
                        gridTemplateColumns: "1fr 1fr",
                        columnGap: 32,
                        "li:nth-of-type(1), li:nth-of-type(6)": {
                            gridColumnStart: 1,
                            gridColumnEnd: 3,
                        },
                    },
                    "@media (min-width: 1080px)": {
                        gridTemplateColumns: "1fr 1fr 1fr",
                        columnGap: 32,
                        paddingLeft: 142,
                        marginTop: 64,
                    },
                }}
            >
                {listItems}
            </ul>
        )
    }

    return (
        <div>
            <Head>
                <title>Blog page</title>
            </Head>
            {renderHeader()}
            {renderListSection()}
        </div>
    )
}
