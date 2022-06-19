import { MockedProvider, MockedProviderProps } from "@apollo/client/testing"
import { ThemeProvider } from "@emotion/react"
import { render } from "@testing-library/react"
import { ReactNode } from "react"
import { theme } from "./styles"

interface Options {
    mockedProvider?: MockedProviderProps
}

export const setup = (component: ReactNode, options?: Options) => {
    const mockedProviderProps = { mocks: [], addTypename: false, ...options?.mockedProvider }
    const wrappedComponent = (
        <ThemeProvider theme={theme}>
            <MockedProvider {...mockedProviderProps}>{component}</MockedProvider>
        </ThemeProvider>
    )
    return render(wrappedComponent)
}
