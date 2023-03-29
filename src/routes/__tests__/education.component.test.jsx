import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom";

import { GET_CATEGORY } from '../education.component';
import Education from '../education.component';

describe('Education Component', () => {
	it('loading state initially', async () => {

		const mocks = [
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
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Education category="education" />
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
	// 					slug: 'education',
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
	// 			<Education category="education" />
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
						slug: 'education',
					},
				},
				error: new Error('Failed to fetch data'),
			},
		];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Education category="education" />
			</MockedProvider>
		);

		expect(await screen.findByText("Error : Failed to fetch data")).toBeInTheDocument();
	});
});
