import type { AppProps } from 'next/app';
import { Biryani, Days_One } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';

export const biryani = Biryani({
  weight: ['300', '700'],
  subsets: ['latin'],
});

export const daysOne = Days_One({
  weight: '400',
  subsets: ['latin'],
});

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
