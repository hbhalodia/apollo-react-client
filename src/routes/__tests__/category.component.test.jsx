import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_CATEGORY } from '../category.component';
import { GET_CATEGORY_ARTICLES } from '../../components/categoryArticleList.component';

import Category from '../category.component';
import { MemoryRouter } from 'react-router-dom';

import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: jest.fn(),
}));

describe('Category Component', () => {
	it('loading state initially', async () => {

		useParams.mockReturnValue({ categorySlug: 'economy' });

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
					<Category />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Loading...")).toBeInTheDocument();
	});

	it('query data rendered', async () => {

		useParams.mockReturnValue({ categorySlug: 'economy' });

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
					<Category />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('Error state', async () => {

		useParams.mockReturnValue({ categorySlug: 'economy' });

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
					<Category />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Error : Failed to fetch data")).toBeInTheDocument();
	});

	it('404 state', async () => {

		useParams.mockReturnValue({ categorySlug: 'abcd' });

		const mocks = [
			{
				request: {
					query: GET_CATEGORY,
					variables: {
						taxonomy: 'categories',
						slug: 'abcd',
					},
				},
				result: {
					data: {
						taxonomies: [],
					},
				},
			},
		];

		render(
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Category />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("404: Not Found")).toBeInTheDocument();
	});
});
