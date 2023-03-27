import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const GET_TOP_MENU = gql`
	query GetTopMenu($slug: String) {
		menu(slug: $slug) {
			name
			taxonomy
			items {
				title
				slug
			}
		}
	}
`;

const Menu = () => {

	const { loading, error, data } = useQuery(GET_TOP_MENU, {
		variables: { slug: 'top-menu' },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;


	return (
		<Fragment>
			<ul>
				{data.menu[0].items.map((menuItem) => (
					<li key={menuItem.slug}>
						<Link to={menuItem.slug}>{menuItem.title}</Link>
					</li>
				))}
			</ul>
			<Outlet />
		</Fragment>
	);
}

export default Menu;