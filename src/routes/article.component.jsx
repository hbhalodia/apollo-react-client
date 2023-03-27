import { Fragment, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const GET_SINGLE_ARTICLE = gql`
	query GetArticle($id: ID!, $postType: String) {
		article(id: $id, postType: $postType) {
			id
			title
			content
			excerpt
			attachment {
				source_url
			}
			author {
				name
			}
		}
	}
`;

const Article = () => {
	const { id, slug } = useParams();

	useEffect(() => {
		document.title = 'Article: ' + slug;
	}, [slug]);

	const { loading, error, data } = useQuery(GET_SINGLE_ARTICLE, {
		variables: { id: id, postType: 'article' },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<Fragment>
			<div className='article-container'>
				<div className='article-container__title' dangerouslySetInnerHTML={{ __html: data.article.title }}></div>
				<div className='article-container__author' dangerouslySetInnerHTML={{ __html: `By ` + data.article.author.name }}></div>
				<div className='article-container__excerpt' dangerouslySetInnerHTML={{ __html: data.article.excerpt }}></div>
				<div className='article-container__image'>
					<img height="500" width="500" src={data.article.attachment.source_url} alt={data.article.title} />
				</div>
				<div className='article-container__content' dangerouslySetInnerHTML={{ __html: data.article.content }} ></div>
			</div>
			<Outlet />
		</Fragment>
	);
}

export default Article;
