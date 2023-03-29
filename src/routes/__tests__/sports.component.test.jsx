import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_CATEGORY } from '../sports.component';
import { GET_CATEGORY_ARTICLES } from '../../components/categoryArticleList.component';

import { MemoryRouter } from 'react-router-dom';
import Sports from '../sports.component';

describe('Sports Component', () => {
	it('loading state initially', async () => {

		const mocks = [
			{
				request: {
					query: GET_CATEGORY,
					variables: {
						taxonomy: 'categories',
						slug: 'sports',
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
					<Sports category="sports" />
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
						slug: 'sports',
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
					<Sports category="sports" />
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
						slug: 'sports',
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
					<Sports category="sports" />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Error : Failed to fetch data")).toBeInTheDocument();
	});
});
