import { lazy } from 'react';

export const RoomPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./RoomPage')), 1500);
		}),
);
