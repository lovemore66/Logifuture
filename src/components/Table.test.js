import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

const sampleRows = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
];

test('renders table with correct number of rows', () => {
  render(<Table rowHeight={39} tableHeight={233} rows={sampleRows} />);
  const tableBody = screen.getByTestId('table-body');
  const rows = tableBody.querySelectorAll('tr');
  expect(rows.length).toBe(sampleRows.length);
});

test('scrolling the table updates visible rows', () => {
  render(<Table rowHeight={39} tableHeight={233} rows={sampleRows} />);
  const tableBody = screen.getByTestId('table-body');
  fireEvent.scroll(tableBody, { target: { scrollTop: 200 } });
  const visibleRows = screen.queryAllByTestId('row');
  expect(visibleRows.length).toBeGreaterThan(0);
});

