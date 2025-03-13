import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = ({ theme, toggleTheme }) => {
	return (
		<button className={styles['theme-toggle-btn']} onClick={toggleTheme}>
			{theme === 'dark' ? 'Люмос!' : 'Нокс!'}
		</button>
	);
};
