import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useQuery, gql } from '@apollo/client';

const GET_CATEGORY_ARTICLES = gql`
	query GetCategoryArticles($pageSize: Int, $postType: String, $categoryId: Int, $page: Int) {
		articles(pageSize: $pageSize, postType: $postType, category: $categoryId, page: $page) {
			id
			title
			slug
			excerpt
			attachment {
				source_url
			}
		}
	}
`;


const CategoryArticle = (props) => {

	const categoryId = parseInt(props.categoryId);
	const location = useLocation();
	const pageSize = 10;

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const storedPage = parseInt(localStorage.getItem('currentPage' + location.pathname), 10);

		if (Number.isNaN(storedPage) || storedPage < 1) {
			setCurrentPage(1);
		} else {
			setCurrentPage(storedPage);
		}
	}, [location.pathname]);

	const { loading, error, data, fetchMore } = useQuery(GET_CATEGORY_ARTICLES, {
		variables: { pageSize: pageSize, postType: 'article', categoryId: categoryId, page: currentPage },
	});

	const handleLoadMore = () => {
		setCurrentPage(currentPage + 1);
		fetchMore({
			variables: { page: currentPage + 1 },
		});
		localStorage.setItem('currentPage' + location.pathname, currentPage + 1);
	}

	const clearPagination = () => {
		setCurrentPage(1);
		fetchMore({
			variables: { page: 1 },
		});
		localStorage.setItem('currentPage' + location.pathname, 1);
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			<div className='category-articles-container'>
				{
					data.articles.map((article) => (
						<div className='category-article' key={article.id}>
							<Link className='category-article-link' to={`/article/${article.slug}/${article.id}`}>
								{
									null !== article.attachment ?
										<img src={article.attachment.source_url} alt={article.title} /> : ''
								}
								<div className='category-article-info'>
									<h3 className='category-article-title'>{article.title}</h3>
									<div className='category-article-excerpt' dangerouslySetInnerHTML={{ __html: article.excerpt }}></div>
								</div>
							</Link>
						</div>
					))
				}
			</div>
			<button onClick={handleLoadMore}>Load More</button>
			<button onClick={clearPagination}>Clear</button>
			<Outlet />
		</>
	);
}

export default CategoryArticle;
