import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './routes/home.component';
import Menu from './routes/menu.component';
import Article from './routes/article.component';
import Category from './routes/category.component';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Menu />}>
				<Route index element={<Home />} />
				<Route path='/:categorySlug' element={<Category />} />
				<Route path='/article/:slug/:id' element={<Article />} />
				<Route path='*' element={<h1>404: Not Found</h1>} />
			</Route>
		</Routes>
	);
};

export default App;