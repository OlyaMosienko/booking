import { ACTION_TYPE } from '@/shared/lib';

export const removeFavorite = (favoriteId) => ({
	type: ACTION_TYPE.REMOVE_FAVORITE,
	payload: favoriteId,
});
