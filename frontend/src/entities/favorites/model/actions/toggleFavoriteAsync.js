import { request } from '@/shared/lib';
import { addFavorite } from './addFavorite';
import { removeFavorite } from './removeFavorite';

export const toggleFavoriteAsync = (roomId, isFavorite) => async (dispatch) => {
	await request('/api/favorites', 'POST', { roomId });

	if (isFavorite) {
		dispatch(removeFavorite(roomId));
	} else {
		dispatch(addFavorite({ room: { id: roomId } }));
	}
};
