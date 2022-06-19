import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"

export const BLOG_POST_QUERY = gql`
    query BlogPost($id: String!) {
        blogPost(id: $id) {
            title
            body
        }
    }
`

export default function BlogPage() {
    const {
        query: { id },
    } = useRouter()
    const { loading, error, data } = useQuery(BLOG_POST_QUERY, {
        variables: { id },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    const { title, body } = data.blogPost

    return (
        <div>
            <h1>{title}</h1>
            <br />
            <p>{body}</p>
        </div>
    )
}
