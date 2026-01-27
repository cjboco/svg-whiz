'use client';

import { FiMoon, FiSun } from 'react-icons/fi';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled.button`
  position: fixed;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-bg-primary);
    border-color: var(--color-primary);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </ToggleButton>
  );
};

export default ThemeToggle;
