import { request } from '@/shared/lib';
import { loadFavorites } from './loadFavorites';

export const loadFavoritesAsync = () => async (dispatch) => {
	try {
		const favoritesData = await request('/api/favorites');
		dispatch(loadFavorites(favoritesData.data));

		return favoritesData.data;
	} catch (error) {
		console.error('Ошибка при запросе на сервер:', error);
		throw new Error(error);
	}
};
