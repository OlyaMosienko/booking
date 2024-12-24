import { Routes, Route } from 'react-router-dom';
import { MainPage } from '@/pages/main';
import { RegisterPage, SignInPage } from '@/pages/sign-in';
import { RoomPage } from '@/pages/room';
import { Favorites } from '@/pages/favorites';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/login" element={<SignInPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/admin" element={<div>Страница администратора</div>} />
			<Route path="/about" element={<div>Страница о гостинице</div>} />
			<Route
				path="/bookings"
				element={<div>Забронированные номера пользователя</div>}
			/>
			<Route path="/favorites" element={<Favorites />} />
			<Route path="/room/:id" element={<RoomPage />} />
			<Route path="*" element={<div>Страница ошибки / не найдена</div>} />
		</Routes>
	);
};
