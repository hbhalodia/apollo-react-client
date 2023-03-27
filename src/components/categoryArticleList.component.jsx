import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useQuery, gql } from '@apollo/client';

const GET_CATEGORY_ARTICLES = gql`
	query GetCategoryArticles($pageSize: Int, $postType: String, $categoryId: Int, $page: Int) {
		articles(pageSize: $pageSize, postType: $postType, category: $categoryId, page: $page) {
			id
			title
			slug
		}
	}
`;


const CategoryArticle = (props) => {

	const categoryId = parseInt(props.categoryId);
	const pageSize = 10;

	const [currentPage, setCurrentPage] = useState(1);

	const { loading, error, data, fetchMore } = useQuery(GET_CATEGORY_ARTICLES, {
		variables: { pageSize: pageSize, postType: 'article', categoryId: categoryId, page: currentPage },
	});

	const handleLoadMore = () => {
		setCurrentPage(currentPage + 1);
		fetchMore({
			variables: { page: currentPage + 1 },
		});
	}

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
			<button onClick={handleLoadMore}>Load More</button>
			<Outlet />
		</>
	);
}

export default CategoryArticle;
