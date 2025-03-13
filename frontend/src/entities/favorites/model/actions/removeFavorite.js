import { ACTION_TYPE } from '@/shared/lib';

export const removeFavorite = (roomId) => ({
	// type: ACTION_TYPE.TOGGLE_FAVORITE,
	type: ACTION_TYPE.REMOVE_FAVORITE,
	payload: roomId,
});
