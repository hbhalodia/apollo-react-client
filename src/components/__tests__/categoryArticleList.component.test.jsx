import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_CATEGORY_ARTICLES } from '../categoryArticleList.component';
import CategoryArticle from '../categoryArticleList.component';
import { MemoryRouter } from 'react-router-dom';

// describe('Category Article List Component', () => {
// 	it('should render loading state initially', async () => {
// 		const mocks = [
// 			{
// 				request: {
// 					query: GET_CATEGORY_ARTICLES,
// 					variables: {
// 						pageSize: 10,
// 						postType: 'article',
// 						categoryId: 1,
// 						page: 1,
// 					},
// 				},
// 				result: {
// 					data: {
// 						articles: [
// 							{
// 								id: '128',
// 								title: 'testing',
// 								slug: 'testing',
// 								excerpt: 'Excerpt',
// 								attachment: {
// 									source_url: 'https://www.example.com/image.jpg',
// 								}
// 							}
// 						]
// 					},
// 				},
// 			},
// 		];

// 		render(
// 			<MemoryRouter>
// 				<MockedProvider mocks={mocks} addTypename={false}>
// 					<CategoryArticle categoryId={1} />
// 				</MockedProvider>
// 			</MemoryRouter>
// 		);

// 		expect(await screen.findByText("Loading...")).toBeInTheDocument();
// 	});

// 	it('should render data after query is complete', async () => {
// 		const mocks = [
// 			{
// 				request: {
// 					query: GET_CATEGORY_ARTICLES,
// 					variables: {
// 						pageSize: 10,
// 						postType: 'article',
// 						categoryId: 1,
// 						page: 1,
// 					},
// 				},
// 				result: {
// 					data: {
// 						articles: [
// 							{
// 								id: '128',
// 								title: 'testing',
// 								slug: 'testing',
// 								excerpt: 'Excerpt',
// 								attachment: {
// 									source_url: 'https://www.example.com/image.jpg',
// 								}
// 							}
// 						]
// 					},
// 				},
// 			},
// 		];

// 		render(
// 			<MemoryRouter>
// 				<MockedProvider mocks={mocks} addTypename={false}>
// 					<CategoryArticle categoryId={1} />
// 				</MockedProvider>
// 			</MemoryRouter>
// 		);

// 		await screen.findByText('testing');

// 		const dataElement = screen.getByText('testing');

// 		expect(dataElement).toBeInTheDocument();
// 	});

// 	it('should render error state if query fails', async () => {
// 		const mocks = [
// 			{
// 				request: {
// 					query: GET_CATEGORY_ARTICLES,
// 					variables: {
// 						pageSize: 10,
// 						postType: 'article',
// 						categoryId: 1,
// 						page: 1,
// 					},
// 				},
// 				error: new Error('Failed to fetch data'),
// 			},
// 		];

// 		render(
// 			<MemoryRouter>
// 				<MockedProvider mocks={mocks} addTypename={false}>
// 					<CategoryArticle categoryId={1} />
// 				</MockedProvider>
// 			</MemoryRouter>
// 		);

// 		const errorElement = await screen.findByText('Error : Failed to fetch data');

// 		expect(errorElement).toBeInTheDocument();
// 	});
// });

import axios from 'axios';

jest.mock('axios');

describe('Category Article Component', () => {
	it('renders data', async () => {

		const mockResponse = {
			data: {
				data: {
					articles: [
						{
							id: '128',
							title: 'testing',
							excerpt: 'testing excerpt',
							slug: 'testng slug',
							attachment: {
								source_url: 'https://example.com/imag.jpg',
							}
						}
					]
				}
			},
			status: 200,
			headers: {
				'x-wp-totalpages': 7,
			},
			config: {}
		}

		axios.post.mockResolvedValueOnce(mockResponse);

		render(
			<MemoryRouter>
				<CategoryArticle />
			</MemoryRouter>
		);

		await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

		await axios.post('http://localhost:4002/', {
			query: GET_CATEGORY_ARTICLES,
			variables: {
				postType: 'article',
				pageSize: 10,
				page: 2,
				categoryId: 2,
			},
		});

		await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('renders Error', async () => {
		const mockError = new Error('GraphQL API error');
		axios.post.mockRejectedValueOnce(mockError);

		render(
			<MemoryRouter>
				<CategoryArticle />
			</MemoryRouter>
		);

		await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

		await screen.findByText('Error');

		const dataElement = screen.getByText('Error');

		expect(dataElement).toBeInTheDocument();
	});
})
