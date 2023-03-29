import { render, fireEvent, screen } from '../test.utils';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, useParams } from 'react-router-dom';

import App from '../App';

import { GET_TOP_MENU } from '../routes/menu.component';
import { GET_HOME_ARTICLES } from '../routes/home.component';
import { GET_CATEGORY } from '../routes/category.component';
import { GET_CATEGORY_ARTICLES } from '../components/categoryArticleList.component';
import { GET_SINGLE_ARTICLE, SINGLE_ARTICLE_COUNTER } from '../routes/article.component';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: jest.fn(),
}));

describe('App', () => {
	it('render home page', async () => {

		const mocks = [
			{
				request: {
					query: GET_TOP_MENU,
					variables: {
						slug: 'top-menu',
					},
				},
				result: {
					data: {
						menu: [
							{
								name: 'Top Menu',
								taxonomy: 'nav_menu',
								items: [
									{
										title: 'Education',
										slug: 'education',
									},
								],
							}
						],
					},
				},
			},
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
			<MemoryRouter initialEntries={['/']}>
				<MockedProvider mocks={mocks} addTypename={false}>
					<App />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('render Category page', async () => {

		useParams.mockReturnValue({ categorySlug: 'education' });

		const mocks = [
			{
				request: {
					query: GET_TOP_MENU,
					variables: {
						slug: 'top-menu',
					},
				},
				result: {
					data: {
						menu: [
							{
								name: 'Top Menu',
								taxonomy: 'nav_menu',
								items: [
									{
										title: 'Education',
										slug: 'education',
									},
								],
							}
						],
					},
				},
			},
			{
				request: {
					query: GET_CATEGORY,
					variables: {
						taxonomy: 'categories',
						slug: 'education',
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
			<MemoryRouter initialEntries={['/education']}>
				<MockedProvider mocks={mocks} addTypename={false}>
					<App />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('render single article page', async () => {
		useParams.mockReturnValue({ id: '128', slug: 'adbd-adadas' });

		const mocks = [
			{
				request: {
					query: GET_TOP_MENU,
					variables: {
						slug: 'top-menu',
					},
				},
				result: {
					data: {
						menu: [
							{
								name: 'Top Menu',
								taxonomy: 'nav_menu',
								items: [
									{
										title: 'Education',
										slug: 'education',
									},
								],
							}
						],
					},
				},
			},
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
			{
				request: {
					query: SINGLE_ARTICLE_COUNTER,
					variables: {
						postId: '128',
						postType: 'article',
						key: 'article-view-count',
						value: '4'
					}
				},
				result: {
					data: {
						addArticleViewCount: {
							title: 'testing',
							id: '128',
						}
					}
				}
			}
		];

		render(
			<MemoryRouter initialEntries={['/article/slugsada/128']}>
				<MockedProvider mocks={mocks} addTypename={false}>
					<App />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('testing');

		const dataElement = screen.getByText('testing');

		expect(dataElement).toBeInTheDocument();
	});

	it('render 404 page', async () => {

		const mocks = [
			{
				request: {
					query: GET_TOP_MENU,
					variables: {
						slug: 'top-menu',
					},
				},
				result: {
					data: {
						menu: [
							{
								name: 'Top Menu',
								taxonomy: 'nav_menu',
								items: [
									{
										title: 'Education',
										slug: 'education',
									},
								],
							}
						],
					},
				},
			},
		];

		render(
			<MemoryRouter initialEntries={['/abcd/asfe']}>
				<MockedProvider mocks={mocks} addTypename={false}>
					<App />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('404: Not Found');

		const dataElement = screen.getByText('404: Not Found');

		expect(dataElement).toBeInTheDocument();
	});
});
