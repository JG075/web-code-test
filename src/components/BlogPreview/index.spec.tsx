import BlogPreview from "."
import { setup } from "../../testUtils"

describe("BlogPreview", () => {
    it("renders the blog title and links to the blog post", () => {
        const title = "My title for testing"
        const href = "/some-url"
        const { getByText } = setup(<BlogPreview title={title} href={href} />)
        expect(getByText(title)).toBeInTheDocument()
        expect(getByText(title)).toHaveAttribute("href", href)
    })

    it("renders the blog preface", () => {
        const preface = "Preface text"
        const { getByText } = setup(<BlogPreview title="" preface={preface} href="" />)
        expect(getByText(preface)).toBeInTheDocument()
    })

    it("renders a '→' link to the blog post", () => {
        const href = "/some-url"
        const { getByText } = setup(<BlogPreview title="" href={href} />)
        expect(getByText("→")).toHaveAttribute("href", href)
    })
})
