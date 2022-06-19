const PageWrapper = ({ children }) => {
    return (
        <div
            css={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: "165px 0",
            }}
        >
            {children}
        </div>
    )
}

export default PageWrapper
