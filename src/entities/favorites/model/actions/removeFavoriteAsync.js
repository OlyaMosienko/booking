import { removeFavorite } from './removeFavorite';

export const removeFavoriteAsync = (requestServer, userId, roomId) => (dispatch) => {
	requestServer('removeFavoriteRoom', userId, roomId).then((id) => {
		dispatch(removeFavorite(id));
	});
};
