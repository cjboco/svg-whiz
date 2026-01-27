'use client';

import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className='fixed top-3 left-3 flex items-center justify-center w-10 h-10 bg-transparent border-0 text-zinc-900 dark:text-zinc-100 cursor-pointer transition-all duration-300 z-[1000] hover:text-fuchsia-600 [&_svg]:w-5 [&_svg]:h-5'
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;
