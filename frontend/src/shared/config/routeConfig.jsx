import { AboutPage } from '@/pages/about';
import { AdminPage } from '@/pages/admin';
import { BookingsPage } from '@/pages/bookings';
import { Favorites } from '@/pages/favorites';
import { MainPage } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found';
import { RoomPage } from '@/pages/room';
import { RegisterPage, SignInPage } from '@/pages/sign-in';
import { PrivateRoute } from '../ui';

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
		element: (
			<PrivateRoute>
				<MainPage />
			</PrivateRoute>
		),
	},
	[AppRoutes.ABOUT]: {
		path: RoutePaths.about,
		element: (
			<PrivateRoute>
				<AboutPage />
			</PrivateRoute>
		),
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
		element: (
			<PrivateRoute>
				<Favorites />
			</PrivateRoute>
		),
	},
	[AppRoutes.BOOKINGS]: {
		path: RoutePaths.bookings,
		element: (
			<PrivateRoute>
				<BookingsPage />
			</PrivateRoute>
		),
	},
	[AppRoutes.ADMIN]: {
		path: RoutePaths.admin,
		element: (
			<PrivateRoute>
				<AdminPage />
			</PrivateRoute>
		),
	},
	[AppRoutes.ROOM]: {
		path: RoutePaths.room,
		element: (
			<PrivateRoute>
				<RoomPage />
			</PrivateRoute>
		),
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePaths.not_found,
		element: <NotFoundPage />,
	},
};
