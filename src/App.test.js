import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with logo, table, and record count', () => {
  render(<App />);
  const logoElement = screen.getByAltText('Logo');
  const recordsElement = screen.getByText(/Users:/i);
  expect(logoElement).toBeInTheDocument();
  expect(recordsElement).toBeInTheDocument();
});

