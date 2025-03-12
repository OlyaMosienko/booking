import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { Footer } from '../widgets/Footer';
import { Header } from '../widgets/Header';
import { AppRouter } from './providers/router';
import { Modal } from '@/shared/ui/Modal/Modal';
import './styles/index.scss';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from '@/entities/user/model/actions';
import { Toast } from '@/shared/ui/Toast/Toast';

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
					<button className="theme-toggle-btn" onClick={toggleTheme}>
						{theme === 'dark' ? 'Люмос!' : 'Нокс!'}
					</button>
				</div>
			</main>
			<Modal />
			<Toast />
			<Footer />
		</div>
	);
};
