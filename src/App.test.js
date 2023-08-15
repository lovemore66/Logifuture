import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with logo, table, and record count', () => {
  // Arrange
  render(<App />);

  // Assert
  const logoElement = screen.getByAltText('Logo');
  const tableElement = screen.getByTestId('table'); 
  const recordsElement = screen.getByText(/Records:/i);

  expect(logoElement).toBeInTheDocument();
  expect(tableElement).toBeInTheDocument();
  expect(recordsElement).toBeInTheDocument();
});

