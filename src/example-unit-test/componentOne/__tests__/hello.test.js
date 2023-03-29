import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Hello from "../hello.js";

it("renders Hello or without a name", () => {

	render(<Hello />);
	expect(screen.getByText('Hey, stranger')).toBeInTheDocument();

	render(<Hello name="Jenny" />);
	expect(screen.getByText('Hello, Jenny!')).toBeInTheDocument();

	render(<Hello name="Hit" />);
	expect(screen.getByText('Hello, Hit!')).toBeInTheDocument();
});