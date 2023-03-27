import { Routes, Route } from 'react-router-dom';

import Home from './routes/home.component';
import Menu from './routes/menu.component';
import Education from './routes/education.component';
import Opinion from './routes/opinion.component';
import Sports from './routes/sports.component';
import Economy from './routes/economy.component';
import Article from './routes/article.component';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Menu />}>
				<Route index element={<Home />} />
				<Route path='/education' element={<Education category="education" />} />
				<Route path='/opinion' element={<Opinion category="opinion" />} />
				<Route path='/sports' element={<Sports category="sports" />} />
				<Route path='/economy' element={<Economy category="economy" />} />
				<Route path='/article/:slug/:id' element={<Article />} />
			</Route>
		</Routes>
	);
};

export default App;