import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useQuery, gql } from '@apollo/client';

const GET_HOME_ARTICLES = gql`
	query GetHomeArticles($pageSize: Int, $postType: String) {
		articles(pageSize: $pageSize, postType: $postType) {
			id
			title
			slug
		}
	}
`;

const Home = () => {

	const [pageSize, setPageSize] = useState(10);

	const { loading, error, data } = useQuery(GET_HOME_ARTICLES, {
		variables: { postType: 'article', pageSize: pageSize },
	});

	useEffect(() => {
		document.title = 'HomePage - Latest News, Articles';
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			<div className='homepage-articles-container'>
				{
					data.articles.map((article) => (
						<div className='homepage-article' key={article.id}>
							<Link to={`article/${article.slug}/${article.id}`}>
								<h3 className='article-title'>{article.title}</h3>
							</Link>
						</div>
					))
				}
			</div>
			<Outlet />
		</>
	);
};

export default Home;
