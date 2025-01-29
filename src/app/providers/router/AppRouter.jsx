import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from '@/shared/config/routeConfig';
import { Loader } from '@/shared/ui/Loader/Loader';
import ErrorBoundary from '../ErrorBounady/ErrorBounary';

export const AppRouter = () => {
	return (
		<ErrorBoundary fallback={<p>Что-то пошло не так</p>}>
			<Suspense fallback={<Loader />}>
				<Routes>
					{Object.values(routeConfig).map(({ element, path }) => (
						<Route
							key={path}
							path={path}
							element={<div className="page-wrapper">{element}</div>}
						/>
					))}
				</Routes>
			</Suspense>
		</ErrorBoundary>
	);
};
