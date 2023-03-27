import { Outlet } from 'react-router-dom';

const Sports = () => {
	return (
		<>
			<div>This is the Sports Route</div>
			<Outlet />
		</>
	);
};

export default Sports;
