import { Routes, Route } from 'react-router-dom';

import Home from './routes/home.component';
import Menu from './routes/menu.component';
import Education from './routes/education.component';
import Opinion from './routes/opinion.component';
import Sports from './routes/sports.component';
import Economy from './routes/economy.component';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Menu />}>
				<Route index element={<Home />} />
				<Route path='/education' element={<Education />} />
				<Route path='/opinion' element={<Opinion />} />
				<Route path='/sports' element={<Sports />} />
				<Route path='/economy' element={<Economy />} />
			</Route>
		</Routes>
	);
};

export default App;