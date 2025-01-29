import { lazy } from 'react';

export const FavoritesAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./Favorites')), 1500);
		}),
);
