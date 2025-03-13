import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { AppRouter } from './providers/router';
import { setUser } from '@/entities/user/model/actions';
import { Footer, Header } from '@/widgets';
import { Modal, ThemeSwitcher, Toast } from '@/shared/ui';
import './styles/index.scss';

export const App = () => {
	const { theme, toggleTheme } = useTheme();

	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const currentUserData = sessionStorage.getItem('userData');

		if (!currentUserData) return;

		dispatch(setUser(JSON.parse(currentUserData)));
	}, [dispatch]);

	return (
		<div className={`app ${theme}`}>
			<Header />
			<main className="content">
				<div className="container flex">
					<AppRouter />
					<ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
				</div>
			</main>
			<Modal />
			<Toast />
			<Footer />
		</div>
	);
};
