import singletonRouter from "next/router"

import { setup } from "../testUtils"
import BlogPost, { BLOG_POST_QUERY } from "./[id]"

jest.mock("next/router", () => require("next-router-mock"))

describe("BlogPost", () => {
    it("renders a loading state", () => {
        const { getByText } = setup(<BlogPost />)
        expect(getByText("Loading...")).toBeInTheDocument()
    })

    it("renders an error state", async () => {
        const mock = {
            request: {
                query: BLOG_POST_QUERY,
            },
            error: new Error("An error occurred"),
        }
        const { findByText } = setup(<BlogPost />, { mockedProvider: { mocks: [mock] } })
        expect(await findByText("Error!")).toBeInTheDocument()
    })

    it("renders a blog post", async () => {
        const mockId = "test123"
        singletonRouter.push({
            pathname: "/[id]",
            query: { id: mockId },
        })
        const blogPost = {
            title: "Test title",
            body: "Some preface text",
        }
        const mock = {
            request: {
                query: BLOG_POST_QUERY,
                variables: {
                    id: mockId,
                },
            },
            result: {
                data: {
                    blogPost,
                },
            },
        }
        const { findByText, getByText } = setup(<BlogPost />, { mockedProvider: { mocks: [mock] } })
        expect(await findByText(blogPost.title)).toBeInTheDocument()
        expect(getByText(blogPost.body)).toBeInTheDocument()
    })
})
