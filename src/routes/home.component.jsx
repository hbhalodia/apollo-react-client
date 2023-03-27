import { Outlet } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div>This is the Home Route</div>
			<Outlet />
		</>
	);
};

export default Home;
