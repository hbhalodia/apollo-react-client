import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_SINGLE_ARTICLE } from '../article.component';
import Article from '../article.component';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({
		id: '128',
	}),
}));

describe('Article Component', () => {
	it('should render loading state initially', async () => {
		const mocks = [
			{
				request: {
					query: GET_SINGLE_ARTICLE,
					variables: {
						id: '128',
						postType: 'article',
					},
				},
				result: {
					data: {
						article: {
							id: '128',
							title: 'testing',
							content: 'Content 1',
							excerpt: 'Excerpt 1',
							meta: [
								{
									"metaKey": "article-view-count",
									"metaValue": "3"
								}
							],
							author: {
								name: 'John Doe',
							},
							attachment: {
								source_url: 'https://www.example.com/image.jpg',
							}
						}
					},
				},
			},
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Article />
			</MockedProvider>
		);

		expect(await screen.findByText("Loading...")).toBeInTheDocument();
	});

	it('should render data after query is complete', async () => {
		const mocks = [
			{
				request: {
					query: GET_SINGLE_ARTICLE,
					variables: {
						id: '128',
						postType: 'article',
					},
				},
				result: {
					data: {
						article: {
							id: '128',
							title: 'testing',
							content: 'Content 1',
							excerpt: 'Excerpt 1',
							meta: [
								{
									"metaKey": "article-view-count",
									"metaValue": "3"
								}
							],
							author: {
								name: 'John Doe',
							},
							attachment: {
								source_url: 'https://www.example.com/image.jpg',
							}
						}
					},
				},
			},
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Article />
			</MockedProvider>
		);

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('should render error state if query fails', async () => {
		const mocks = [
			{
				request: {
					query: GET_SINGLE_ARTICLE,
					variables: {
						id: '128',
						postType: 'article',
					},
				},
				error: new Error( 'Failed to fetch data' ),
			},
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Article />
			</MockedProvider>
		);

		const errorElement = await screen.findByText('Error : Failed to fetch data');

		expect(errorElement).toBeInTheDocument();
	});
});