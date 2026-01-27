import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { biryani } from '../lib/fonts';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div
        className={`${biryani.className} min-h-screen font-light text-base bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
