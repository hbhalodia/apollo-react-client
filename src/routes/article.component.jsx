import { Fragment, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { useQuery, gql, useMutation } from '@apollo/client';

export const GET_SINGLE_ARTICLE = gql`
	query GetArticle($id: ID!, $postType: String) {
		article(id: $id, postType: $postType) {
			id
			title
			content
			excerpt
			meta {
				metaKey
				metaValue
			}
			attachment {
				source_url
			}
			author {
				name
			}
		}
	}
`;

export const SINGLE_ARTICLE_COUNTER = gql`
	mutation ArticleCounter($postId: ID!, $postType: String, $key: String, $value: String) {
		addArticleViewCount(postId: $postId, postType: $postType, metaKey: $key, metaValue: $value) {
			id
			title
		}
	}
`;

const Article = () => {
	const { id, slug } = useParams();

	useEffect(() => {
		document.title = 'Article: ' + slug;
	}, [slug]);

	const [isArticleViewed, setIsArticleViewed] = useState(false);

	const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_SINGLE_ARTICLE, {
		variables: { id: id, postType: 'article' },
	});

	const [addArticleCounter, { loading: mutateLoading, error: mutateError }] = useMutation(SINGLE_ARTICLE_COUNTER);

	if (queryLoading) return <p>Loading...</p>;
	if (queryError) return <p>Error : {queryError.message}</p>;

	if (mutateLoading) return <p>Adding Article Count...</p>;
	if (mutateError) return <p>Submission error! {mutateError.message}</p>;

	let keyName = null;
	let keyValue = null;

	if (queryData.article.meta) {
		queryData.article.meta.forEach((meta) => {
			if (meta.metaKey === 'article-view-count') {
				keyName = meta.metaKey;
				keyValue = meta.metaValue;
			}
		});
	}

	if (!isArticleViewed) {
		setIsArticleViewed(true);
		addArticleCounter({ variables: { postId: id, postType: 'article', key: keyName, value: String(parseInt(keyValue) + 1) } });
	}

	return (
		<Fragment>
			<div className='article-container'>
				<div className='article-container__title' dangerouslySetInnerHTML={{ __html: queryData.article.title }}></div>
				<div className='article-container__author' dangerouslySetInnerHTML={{ __html: `By ` + queryData.article.author.name }}></div>
				<div className='article-container__excerpt' dangerouslySetInnerHTML={{ __html: queryData.article.excerpt }}></div>
				<div className='article-container__image'>
					<img height="500" width="500" src={queryData.article.attachment.source_url} alt={queryData.article.title} />
				</div>
				<div className='article-container__content' dangerouslySetInnerHTML={{ __html: queryData.article.content }} ></div>
			</div>
			<Outlet />
		</Fragment>
	);
}

export default Article;
