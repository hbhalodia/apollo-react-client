import { render, fireEvent, screen } from '../test.utils';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';

describe('App', () => {
	it('render 404 page', () => {
		render(
			<MemoryRouter initialEntries={['/123/qwewq']}>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText('404: Not Found')).toBeInTheDocument();
	});
})