import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useQuery, gql } from '@apollo/client';

export const GET_HOME_ARTICLES = gql`
	query GetHomeArticles($pageSize: Int, $postType: String, $page: Int) {
		articles(pageSize: $pageSize, postType: $postType, page: $page) {
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

const Home = () => {

	const pageSize = 10;
	const location = useLocation();

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const storedPage = parseInt(localStorage.getItem('currentPage' + location.pathname), 10);

		if (Number.isNaN(storedPage) || storedPage < 1) {
			setCurrentPage(1);
		} else {
			setCurrentPage(storedPage);
		}
	}, [location.pathname]);


	const { loading, error, data, fetchMore } = useQuery(GET_HOME_ARTICLES, {
		variables: { postType: 'article', pageSize: pageSize, page: currentPage },
	});

	useEffect(() => {
		document.title = 'HomePage - Latest News, Articles - ' + currentPage;
	}, [currentPage]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	const handleLoadMore = () => {
		setCurrentPage(currentPage + 1);
		fetchMore({
			variables: { page: currentPage + 1 },
		});
		localStorage.setItem('currentPage' + location.pathname , currentPage + 1);
	}

	const handlePreviousPage = () => {

		if (currentPage === 1) {
			setCurrentPage(1);
		} else {
			setCurrentPage(currentPage - 1);
		}

		fetchMore({
			variables: { page: currentPage - 1 },
		});
		localStorage.setItem('currentPage' + location.pathname, currentPage - 1);
	}

	const clearPagination = () => {
		setCurrentPage(1);
		fetchMore({
			variables: { page: 1 },
		});
		localStorage.setItem('currentPage' + location.pathname, 1);
	}

	return (
		<>
			<div className='current-page'>
				Current Page : {currentPage}
			</div>
			<div className='homepage-articles-container'>
				{
					data.articles.map((article) => (
						<div className='homepage-article' key={article.id}>
							<Link className='article-link' to={`/article/${article.slug}/${article.id}`}>
								{
									null !== article.attachment ?
										<img src={article.attachment.source_url} alt={article.title} /> : ''
								}
								<div className='article-info'>
									<h3 className='article-title'>{article.title}</h3>
									<div className='article-excerpt' dangerouslySetInnerHTML={{ __html: article.excerpt }}></div>
								</div>
							</Link>
						</div>
					))
				}
			</div>
			<div className="pagination-buttons">
				<button onClick={handlePreviousPage}>Previous - {currentPage-1}</button>
				<button onClick={clearPagination}>Clear</button>
				<button onClick={handleLoadMore}>Next - {currentPage + 1}</button>
			</div>
			<Outlet />
		</>
	);
};

export default Home;
