import { Outlet, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import CategoryArticle from '../components/categoryArticleList.component';

export const GET_CATEGORY = gql`
	query GetCategory($slug: String, $taxonomy: String) {
		taxonomies(slug: $slug, taxonomy: $taxonomy) {
			id
			name
		}
	}
`;

const Category = () => {

	const { categorySlug } = useParams();

	const { loading, error, data } = useQuery(GET_CATEGORY, {
		variables: { taxonomy: 'categories', slug: categorySlug },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			{data.taxonomies.length > 0 ? <CategoryArticle categoryName={data.taxonomies[0].name} categoryId={data.taxonomies[0].id} /> : <h1>404: Not Found</h1> }
			<Outlet />
		</>
	);
};

export default Category;
