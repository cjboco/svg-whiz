import type { Metadata } from 'next';
import { SvgProvider } from '../context/SvgContext';
import { ThemeProvider } from '../context/ThemeContext';
import { biryani } from '../lib/fonts';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'SVG-Whiz',
  description: 'Convert SVG images with ease!',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${biryani.className} min-h-screen font-light text-base bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <SvgProvider>{children}</SvgProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
