import { removeFavorite } from './removeFavorite';

export const removeFavoriteAsync = (requestServer, userId, favoriteId) => (dispatch) => {
	requestServer('removeFavoriteRoom', userId, favoriteId).then(() => {
		dispatch(removeFavorite(favoriteId));
	});
};
