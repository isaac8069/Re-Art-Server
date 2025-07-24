import '@testing-library/jest-dom';
import { render } from './src/test-utils';

global.renderWithProviders = render;
