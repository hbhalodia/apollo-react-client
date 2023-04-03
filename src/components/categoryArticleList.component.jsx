import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

import axios from 'axios';

import Pagination from '../components/pagination.component';
import { Env } from '../envVariables/env';

export const GET_CATEGORY_ARTICLES = `
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

	const pageSize = 10;
	const categoryId = parseInt(props.categoryId);
	const categoryName = props.categoryName;
	const [currentPage, setCurrentPage] = useState(1);
	const location = useLocation();
	const [totalPages, setTotalPages] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		const storedPage = parseInt(localStorage.getItem('currentPage' + location.pathname), 10);

		if (Number.isNaN(storedPage) || storedPage < 1) {
			setCurrentPage(1);
		} else {
			setCurrentPage(storedPage);
		}
	}, [location.pathname]);

	useEffect(() => {
		document.title = `${categoryName} News - ${currentPage}`;

		setLoading(true); // Make loading true.

		axios.post(`${Env.serverUrl}`, {
			query: GET_CATEGORY_ARTICLES,
			variables: {
				pageSize: pageSize,
				postType: 'article',
				categoryId: parseInt(categoryId),
				page: parseInt(currentPage)
			},
		}).then(response => {
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
	}, [currentPage, categoryId, categoryName]);

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
			<div className='category-articles-container'>
				{
					data.map((article) => (
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
			<Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage} />
			<Outlet />
		</>
	);
}

export default CategoryArticle;
