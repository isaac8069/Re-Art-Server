import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import ThemeToggle from './ThemeToggle';

// Test consumer that shows current darkMode state
const TestConsumer = () => {
  const { darkMode } = useContext(ThemeContext);
  return <span data-testid="theme-mode">{darkMode ? 'dark' : 'light'}</span>;
};

describe('ThemeContext', () => {
  test('provides default light mode', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });

  test('toggles darkMode in context when ThemeToggle is clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
        <TestConsumer />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);

    // Check darkMode via context value
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  test('toggles back to light mode after two clicks', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
        <TestConsumer />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });

    // First click: should go to dark
    fireEvent.click(button);
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');

    // Second click: should return to light
    fireEvent.click(button);
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });
});
