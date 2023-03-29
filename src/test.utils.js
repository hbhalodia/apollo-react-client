import React from 'react'
import { render } from '@testing-library/react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:4002/',
	cache: new InMemoryCache(),
});

const AllTheProviders = ({ children }) => {
	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	)
}

const customRender = (ui, options) =>
	render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }