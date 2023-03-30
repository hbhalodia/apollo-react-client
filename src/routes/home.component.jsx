import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Pagination from '../components/pagination.component';

export const GET_HOME_ARTICLES = `
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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const storedPage = parseInt(localStorage.getItem('currentPage' + location.pathname), 10);

		if (Number.isNaN(storedPage) || storedPage < 1) {
			setCurrentPage(1);
		} else {
			setCurrentPage(storedPage);
		}
	}, [location.pathname]);

	const [data, setData] = useState([]);

	useEffect(() => {

		document.title = 'HomePage - Latest News, Articles - Page ' + currentPage;

		setLoading(true); // Make loading true.

		axios.post('http://localhost:4002/', {
			query: GET_HOME_ARTICLES,
			variables: {
				postType: 'article',
				pageSize: pageSize,
				page: currentPage
			},
		}).then(response => {

			console.log(response.headers['x-wp-totalpages']);
			if (response.data.data.articles) {
				setData(response.data.data.articles);
				setLoading(false);
			}

			if (response.headers['x-wp-totalpages']) {
				setTotalPages(response.headers['x-wp-totalpages']);
			}
		}).catch(error => {
			console.error(error);
			setLoading(false);
			setError(true);
		});
	}, [currentPage]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	const onPageChange = (pageNumber) => {
		localStorage.setItem('currentPage' + location.pathname, pageNumber);
		setCurrentPage(pageNumber);
	}

	return (
		<>
			<div className='current-page'>
				Current Page : {currentPage}
			</div>
			<div className='homepage-articles-container'>
				{
					data.map((article) => (
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
			<Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage} />
			<Outlet />
		</>
	);
};

export default Home;
