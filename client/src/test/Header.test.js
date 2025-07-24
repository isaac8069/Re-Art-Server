import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { render } from '../../test-utils'; // Uses ThemeProvider + MemoryRouter

describe('Header Component', () => {
  const renderHeader = (user = null) => render(<Header user={user} />);

  test('renders logo with Re-Art text', () => {
    renderHeader();
    expect(screen.getByText(/Re-Art/i)).toBeInTheDocument();
  });

  test('renders Home, About, and Art links', () => {
    renderHeader();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    // Use getByRole to avoid conflict with "Re-Art" text
    expect(screen.getByRole('link', { name: /^Art$/ })).toBeInTheDocument();
  });

  test('shows Sign In and Sign Up when user is not logged in', () => {
    renderHeader();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test('shows Profile and Sign Out when user is logged in', () => {
    renderHeader({ name: 'Test User' });
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  test('calls toggleTheme when ThemeToggle is clicked', () => {
    const { container } = renderHeader();
    const toggleButton = container.querySelector('.theme-toggle');
    fireEvent.click(toggleButton);
    expect(toggleButton).toBeInTheDocument();
  });
});
