import { Favorites } from '@/pages/favorites';
import { MainPage } from '@/pages/main';
import { RoomPage } from '@/pages/room';
import { RegisterPage, SignInPage } from '@/pages/sign-in';

export const AppRoutes = {
	MAIN: 'main',
	ABOUT: 'about',
	SIGN_IN: 'login',
	REGISTER: 'register',
	FAVORITES: 'favorites',
	BOOKINGS: 'bookings',
	ADMIN: 'admin',
	ROOM: 'room',
	NOT_FOUND: 'not_found',
};

export const RoutePaths = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.SIGN_IN]: '/login',
	[AppRoutes.REGISTER]: '/register',
	[AppRoutes.FAVORITES]: '/favorites',
	[AppRoutes.BOOKINGS]: '/bookings',
	[AppRoutes.ADMIN]: '/admin',
	[AppRoutes.ROOM]: '/room/:id',
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig = {
	[AppRoutes.MAIN]: {
		path: RoutePaths.main,
		element: <MainPage />,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePaths.about,
		element: <div>Страница о гостинице</div>,
	},
	[AppRoutes.SIGN_IN]: {
		path: RoutePaths.login,
		element: <SignInPage />,
	},
	[AppRoutes.REGISTER]: {
		path: RoutePaths.register,
		element: <RegisterPage />,
	},
	[AppRoutes.FAVORITES]: {
		path: RoutePaths.favorites,
		element: <Favorites />,
	},
	[AppRoutes.BOOKINGS]: {
		path: RoutePaths.bookings,
		element: <div>Страница о забронированных номерах пользователя</div>,
	},
	[AppRoutes.ADMIN]: {
		path: RoutePaths.admin,
		element: <div>Страница администратора</div>,
	},
	[AppRoutes.ROOM]: {
		path: RoutePaths.room,
		element: <RoomPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePaths.not_found,
		element: <div>Страница не найдена</div>,
	},
};
