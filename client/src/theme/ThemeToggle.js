import React, { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      aria-label="Toggle theme"
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
    >
      <span className="icon">{darkMode ? <FaSun /> : <FaMoon />}</span>
      <span className="label">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle;
