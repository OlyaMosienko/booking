import { lazy } from 'react';

export const SingInPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./SignInPage')), 1500);
		}),
);
