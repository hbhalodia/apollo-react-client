import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_CATEGORY } from '../economy.component';
import { GET_CATEGORY_ARTICLES } from '../../components/categoryArticleList.component';

import Economy from '../economy.component';
import { MemoryRouter } from 'react-router-dom';

describe('Economy Component', () => {
	it('loading state initially', async () => {

		const mocks = [
			{
				request: {
					query: GET_CATEGORY,
					variables: {
						taxonomy: 'categories',
						slug: 'economy',
					},
				},
				result: {
					data: {
						taxonomies: [
							{
								id: 1,
							},
						],
					},
				},
			},
			{
				request: {
					query: GET_CATEGORY_ARTICLES,
					variables: {
						pageSize: 10,
						postType: 'article',
						categoryId: 1,
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
					<Economy category="economy" />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Loading...")).toBeInTheDocument();
	});

	it('query data rendered', async () => {

		const mocks = [
			{
				request: {
					query: GET_CATEGORY,
					variables: {
						taxonomy: 'categories',
						slug: 'economy',
					},
				},
				result: {
					data: {
						taxonomies: [
							{
								id: 1,
							},
						],
					},
				},
			},
			{
				request: {
					query: GET_CATEGORY_ARTICLES,
					variables: {
						pageSize: 10,
						postType: 'article',
						categoryId: 1,
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
					<Economy category="economy" />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('Error state', async () => {

		const mocks = [
			{
				request: {
					query: GET_CATEGORY,
					variables: {
						taxonomy: 'categories',
						slug: 'economy',
					},
				},
				error: new Error('Failed to fetch data'),
			},
			{
				request: {
					query: GET_CATEGORY_ARTICLES,
					variables: {
						pageSize: 10,
						postType: 'article',
						categoryId: 1,
						page: 1,
					},
				},
				error: new Error('Failed to fetch data'),
			},
		];

		render(
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Economy category="economy" />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Error : Failed to fetch data")).toBeInTheDocument();
	});
});
