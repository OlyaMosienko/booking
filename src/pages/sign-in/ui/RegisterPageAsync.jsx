import { lazy } from 'react';

export const RegisterPageAsync = lazy(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve(import('./RegisterPage')), 1500);
		}),
);
