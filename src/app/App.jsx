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
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<div className={`app ${theme}`}>
			<Header />
			<main className="content">
				<div className="container flex">
					<AppRouter />
				</div>
			</main>
			<button onClick={toggleTheme}>{theme === 'dark' ? 'Люмос!' : 'Нокс!'}</button>
			<Modal />
			<Toast />
			<Footer />
		</div>
	);
};
