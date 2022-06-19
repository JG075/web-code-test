import Index, { BLOG_LIST_QUERY } from "./index"
import { setup } from "../testUtils"

describe("Index", () => {
    it("renders a loading state", () => {
        const { getByText } = setup(<Index />)
        expect(getByText("Loading...")).toBeInTheDocument()
    })

    it("renders an error state", async () => {
        const mock = {
            request: {
                query: BLOG_LIST_QUERY,
            },
            error: new Error("An error occurred"),
        }
        const { findByText } = setup(<Index />, { mockedProvider: { mocks: [mock] } })
        expect(await findByText("Error!")).toBeInTheDocument()
    })

    it("renders a list of blog posts", async () => {
        const items = [
            { title: "Test title", preface: "Some preface text.", sys: { id: "testid" } },
            { title: "Another test title", preface: "Some other preface text.", sys: { id: "testid2" } },
            { title: "The 3rd test title", preface: "Another preface text.", sys: { id: "testid3" } },
        ]
        const mock = {
            request: {
                query: BLOG_LIST_QUERY,
            },
            result: {
                data: {
                    blogPostCollection: {
                        items,
                    },
                },
            },
        }
        const { getByText, findByText } = setup(<Index />, { mockedProvider: { mocks: [mock] } })
        await findByText(items[0].title)
        items.forEach(async ({ title, preface, sys: { id } }) => {
            expect(getByText(title)).toBeInTheDocument()
            expect(getByText(preface)).toBeInTheDocument()
            expect(getByText(title)).toHaveAttribute("href", `/${id}`)
        })
    })
})
