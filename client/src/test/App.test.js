import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { render } from './test-utils'; // Use custom render with ThemeProvider & MemoryRouter

describe('App Component', () => {
  test('renders Re-Art logo or title', () => {
    render(<App />);
    // Check for the logo text
    expect(screen.getByText(/Re-Art/i)).toBeInTheDocument();
  });

  test('renders Home, About, and Art links', () => {
    render(<App />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    // Use role to avoid conflict with "Re-Art"
    expect(screen.getByRole('link', { name: /^Art$/ })).toBeInTheDocument();
  });
});
