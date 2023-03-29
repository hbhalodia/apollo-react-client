import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_SINGLE_ARTICLE } from '../article.component';
import Article from '../article.component';

import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: jest.fn(),
}));

describe('Article Component', () => {
	it('should render loading state initially', async () => {

		useParams.mockReturnValue({ id: '128' });

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

		useParams.mockReturnValue({ id: '128' });

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

		useParams.mockReturnValue({ id: '128' });

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