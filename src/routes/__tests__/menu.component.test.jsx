import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_TOP_MENU } from '../menu.component';
import Menu from '../menu.component';
import { MemoryRouter } from 'react-router-dom';

describe('Menu Component', () => {
	it('loading state initially', async () => {

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
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Menu />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Loading...")).toBeInTheDocument();
	});

	it('query data rendered', async () => {

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
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Menu />
				</MockedProvider>
			</MemoryRouter>
		);

		await screen.findByText('Education');

		const dataElement = screen.getByText('Education');

		expect(dataElement).toBeInTheDocument();
	});

	it('Error state', async () => {

		const mocks = [
			{
				request: {
					query: GET_TOP_MENU,
					variables: {
						slug: 'top-menu',
					},
				},
				error: new Error('Failed to fetch data'),
			},
		];

		render(
			<MemoryRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<Menu />
				</MockedProvider>
			</MemoryRouter>
		);

		expect(await screen.findByText("Error : Failed to fetch data")).toBeInTheDocument();
	});
});
