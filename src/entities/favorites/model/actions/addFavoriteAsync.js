import { addFavorite } from './addFavorite';

export const addFavoriteAsync = (requestServer, userId, roomId) => (dispatch) => {
	requestServer('addFavoriteRoom', userId, roomId).then((favoriteData) => {
		dispatch(addFavorite(favoriteData.res));
	});
};
