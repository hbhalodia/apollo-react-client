import { Outlet } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import CategoryArticle from '../components/categoryArticleList.component';

export const GET_CATEGORY = gql`
	query GetCategory($slug: String, $taxonomy: String) {
		taxonomies(slug: $slug, taxonomy: $taxonomy) {
			id
		}
	}
`;

const Opinion = (props) => {

	const { loading, error, data } = useQuery(GET_CATEGORY, {
		variables: { taxonomy: 'categories', slug: props.category },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			<CategoryArticle categoryId={data.taxonomies[0].id} />
			<Outlet />
		</>
	);
};

export default Opinion;
