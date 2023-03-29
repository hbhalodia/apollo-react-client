import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_CATEGORY } from '../sports.component';
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
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Sports category="sports" />
			</MockedProvider>
		);

		expect(await screen.findByText("Loading...")).toBeInTheDocument();
	});

	// it('query data rendered', async () => {

	// 	const mocks = [
	// 		{
	// 			request: {
	// 				query: GET_CATEGORY,
	// 				variables: {
	// 					taxonomy: 'categories',
	// 					slug: 'sports',
	// 				},
	// 			},
	// 			result: {
	// 				data: {
	// 					taxonomies: [
	// 						{
	// 							id: 1,
	// 						},
	// 					],
	// 				},
	// 			},
	// 		},
	// 	];

	// 	render(
	// 		<MockedProvider mocks={mocks} addTypename={false}>
	// 			<Sports category="sports" />
	// 		</MockedProvider>
	// 	);

	// 	await screen.findByText('economy');

	// 	const dataElement = screen.getByText('economy');

	// 	expect(dataElement).toBeInTheDocument();
	// });

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
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Sports category="sports" />
			</MockedProvider>
		);

		expect(await screen.findByText("Error : Failed to fetch data")).toBeInTheDocument();
	});
});
