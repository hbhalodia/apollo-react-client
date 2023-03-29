import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_HOME_ARTICLES } from '../home.component';
import Home from '../home.component';

import { MemoryRouter } from 'react-router-dom';

describe('Home Article List Component', () => {
	it('should render loading state initially', async () => {
		const mocks = [
			{
				request: {
					query: GET_HOME_ARTICLES,
					variables: {
						pageSize: 10,
						postType: 'article',
						page: 1,
					},
				},
				result: {
					data: {
						articles: [
							{
								id: '128',
								title: 'testing',
								slug: 'testing',
								excerpt: 'Excerpt',
								attachment: {
									source_url: 'https://www.example.com/image.jpg',
								}
							}
						]
					},
				},
			},
		];

		render(
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Home />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Loading...")).toBeInTheDocument();
	});

	it('should render data after query is complete', async () => {
		const mocks = [
			{
				request: {
					query: GET_HOME_ARTICLES,
					variables: {
						pageSize: 10,
						postType: 'article',
						page: 1,
					},
				},
				result: {
					data: {
						articles: [
							{
								id: '128',
								title: 'testing',
								slug: 'testing',
								excerpt: 'Excerpt',
								attachment: {
									source_url: 'https://www.example.com/image.jpg',
								}
							}
						]
					},
				},
			},
		];

		render(
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Home />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('should render error state if query fails', async () => {
		const mocks = [
			{
				request: {
					query: GET_HOME_ARTICLES,
					variables: {
						pageSize: 10,
						postType: 'article',
						page: 1,
					},
				},
				error: new Error('Failed to fetch data'),
			},
		];

		render(
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Home />
				</MockedProvider>
			</MemoryRouter>
		);

		const errorElement = await screen.findByText('Error : Failed to fetch data');

		expect(errorElement).toBeInTheDocument();
	});
});
