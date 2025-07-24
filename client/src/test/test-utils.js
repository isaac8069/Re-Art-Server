import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { render } from '@testing-library/react';

const renderWithProviders = (ui, options) =>
  render(
    <MemoryRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </MemoryRouter>,
    options
  );

export * from '@testing-library/react';
export { renderWithProviders as render };
