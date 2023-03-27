import { Outlet } from 'react-router-dom';

const Opinion = () => {
	return (
		<>
			<div>This is the Opinion Route</div>
			<Outlet />
		</>
	);
};

export default Opinion;
