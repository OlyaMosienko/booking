import { createContext } from 'react';

export const THEME = {
	LIGHT: 'light',
	DARK: 'dark',
};

export const ThemeContext = createContext({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
