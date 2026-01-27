export interface Theme {
  '--color-bg-primary': string;
  '--color-bg-secondary': string;
  '--color-text-primary': string;
  '--color-text-secondary': string;
  '--color-border': string;
  '--color-border-light': string;
  '--color-primary': string;
  '--color-primary-light': string;
  '--color-danger': string;
  '--color-dropzone-bg': string;
  '--color-dropzone-text': string;
  '--color-btn-bg': string;
  '--color-btn-hover': string;
  '--color-btn-active': string;
  '--color-loading-overlay': string;
  '--color-github-bg': string;
  '--color-github-text': string;
}

export const lightTheme: Theme = {
  '--color-bg-primary': '#ffffff',
  '--color-bg-secondary': '#fafafa',
  '--color-text-primary': '#000000',
  '--color-text-secondary': '#666666',
  '--color-border': '#dddddd',
  '--color-border-light': '#eeeeee',
  '--color-primary': '#ad1cea',
  '--color-primary-light': 'rgba(173, 28, 234, 0.1)',
  '--color-danger': '#ff1744',
  '--color-dropzone-bg': '#fafafa',
  '--color-dropzone-text': '#444444',
  '--color-btn-bg': '#ffffff',
  '--color-btn-hover': '#444444',
  '--color-btn-active': '#000000',
  '--color-loading-overlay': 'rgba(255, 255, 255, 0.95)',
  '--color-github-bg': '#000000',
  '--color-github-text': '#ffffff',
};

export const darkTheme: Theme = {
  '--color-bg-primary': '#1a1a1a',
  '--color-bg-secondary': '#2a2a2a',
  '--color-text-primary': '#f0f0f0',
  '--color-text-secondary': '#a0a0a0',
  '--color-border': '#444444',
  '--color-border-light': '#333333',
  '--color-primary': '#c94df5',
  '--color-primary-light': 'rgba(201, 77, 245, 0.15)',
  '--color-danger': '#ff5252',
  '--color-dropzone-bg': '#2a2a2a',
  '--color-dropzone-text': '#c0c0c0',
  '--color-btn-bg': '#2a2a2a',
  '--color-btn-hover': '#c0c0c0',
  '--color-btn-active': '#ffffff',
  '--color-loading-overlay': 'rgba(26, 26, 26, 0.95)',
  '--color-github-bg': '#333333',
  '--color-github-text': '#f0f0f0',
};

export type ThemeMode = 'light' | 'dark';
