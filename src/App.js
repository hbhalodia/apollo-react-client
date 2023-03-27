import { useQuery, gql } from '@apollo/client';
import { useState } from "react";
import { NetworkStatus } from '@apollo/client';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const GET_ARTICLES = gql`
	query GetArticles($post_type: String) {
		articles(postType: $post_type) {
			id
			title
			excerpt
		}
	}
`;

const GET_ARTICLE_CONTENT = gql`
	query GetArticle($id: ID!, $postType: String) {
		article(id: $id, postType: $postType) {
			excerpt
		}
	}
`;

function MenuItem(props) {
	return (
		<li>
			<a href={props.link}>{props.text}</a>
		</li>
	);
}

function Menu(props) {
	return (
		<ul>
			{props.items.map((item) => (
				<MenuItem key={item.id} link={item.link} text={item.text} />
			))}
		</ul>
	);
}

const menuItems = [
	{ id: 1, text: 'Home', link: '/' },
	{ id: 2, text: 'About', link: '/about' },
	{ id: 3, text: 'Contact', link: '/contact' },
];

export default function App() {
	return (
		<div>
			<Menu items={menuItems} />
		</div>
	);
}

// export default function App() {

// 	const [selectedArticle, setSelectedArticle] = useState(null);

// 	function onArticleSelect({ target }) {
// 		setSelectedArticle(target.value);
// 	}

// 	return (
// 		<div>
// 			<h2>My first Apollo app 🚀</h2>
// 			<br />
// 			<DisplayArticles onArticleSelect={onArticleSelect} />
// 			<br />
// 			{selectedArticle && <ArticleContent id={selectedArticle} postType="case-study" />}
// 		</div>
// 	);
// }

// function DisplayArticles({ onArticleSelect }) {
// 	const { loading, error, data } = useQuery(GET_ARTICLES, {
// 		variables: { post_type: 'case-study' },
// 	});

// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error : {error.message}</p>;

// 	return (
// 		<select name='article' onChange={onArticleSelect}>
// 			<option key="empty-article" value=""></option>
// 			{data.articles.map((article) => (
// 				<option key={article.id} value={article.id} dangerouslySetInnerHTML={{ __html: article.title }}>
// 				</option>
// 			))}
// 		</select>
// 	);
// }

// function ArticleContent({ id, postType }) {
// 	const { loading, error, data, refetch, networkStatus } = useQuery(GET_ARTICLE_CONTENT, {
// 		variables: { id, postType },
// 		notifyOnNetworkStatusChange: true,
// 	});

// 	if (networkStatus === NetworkStatus.refetch) return 'Loading...Refetching...!';
// 	if (loading) return 'Laoding..';
// 	if (error) return `Error! ${error}`;

// 	return (
// 		<>
// 			<br />
// 			<div dangerouslySetInnerHTML={{ __html: data.article.excerpt }}></div>
// 			<button onClick={() => refetch()}>
// 				Refetch!
// 			</button>
// 		</>
// 	);
// }