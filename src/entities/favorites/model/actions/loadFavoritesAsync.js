import { loadFavorites } from './loadFavorites';

// export const loadFavoritesAsync = (requestServer, userId) => (dispatch) => {
// 	requestServer('getFavoriteRooms', userId)
// 		.then((favoritesData) => dispatch(loadFavorites(favoritesData.res)))
// 		.catch((error) => {
// 			console.error('Ошибка при запросе на сервер:', error);
// 		});
// };
export const loadFavoritesAsync = (requestServer, userId) => (dispatch) => {
	return requestServer('getFavoriteRooms', userId)
		.then((favoritesData) => {
			dispatch(loadFavorites(favoritesData.res));
			return favoritesData.res;
		})
		.catch((error) => {
			console.error('Ошибка при запросе на сервер:', error);
			throw new Error(error);
		});
};
