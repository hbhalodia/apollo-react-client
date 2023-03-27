import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useQuery, gql } from '@apollo/client';

const GET_CATEGORY_ARTICLES = gql`
	query GetCategoryArticles($pageSize: Int, $postType: String, $categoryId: Int) {
		articles(pageSize: $pageSize, postType: $postType, category: $categoryId) {
			id
			title
			slug
			categories {
				name
			}
		}
	}
`;


const CategoryArticle = (props) => {

	const categoryId = parseInt(props.categoryId);
	const [pageSize, setPageSize] = useState(10);

	const { loading, error, data } = useQuery(GET_CATEGORY_ARTICLES, {
		variables: { pageSize: pageSize, postType: 'article', categoryId: categoryId },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			<div className='category-articles-container'>
				{
					data.articles.map((article) => (
						<div className='category-article' key={article.id}>
							<Link to={`/article/${article.slug}/${article.id}`}>
								<h3 className='article-title'>{article.title}</h3>
							</Link>
						</div>
					))
				}
			</div>
			<Outlet />
		</>
	);
}

export default CategoryArticle;
