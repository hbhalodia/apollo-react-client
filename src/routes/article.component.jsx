import { Fragment } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const Article = () => {
	const { id, slug } = useParams();

	return (
		<Fragment>
			<div> This is {id}</div>
			<div> This is {slug}</div>
			<Outlet />
		</Fragment>
	);
}

export default Article;
