import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.scss';
import App from './App';

const client = new ApolloClient({
	uri: 'http://localhost:4002/',
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>,
);

// const domNode = document.getElementById('root');
// hydrateRoot(
// 	domNode,
// 	<React.StrictMode>
// 		<ApolloProvider client={client}>
// 			<BrowserRouter>
// 				<App />
// 			</BrowserRouter>
// 		</ApolloProvider>
// 	</React.StrictMode>,
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
