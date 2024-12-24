import { useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, THEME, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) || THEME.DARK;

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(defaultTheme);

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
