import { loadFavorites } from './loadFavorites';

export const getFavoritesDetails = (requestServer, userId) => (dispatch) => {
	return requestServer('getFavoriteRoomsDetails', userId)
		.then((favoritesData) => {
			dispatch(loadFavorites(favoritesData.res || []));
			return favoritesData.res || [];
		})
		.catch((error) => {
			console.error('Ошибка при запросе на сервер:', error);
			throw new Error(error);
		});
};
