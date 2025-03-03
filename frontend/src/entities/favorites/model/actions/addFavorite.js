import { ACTION_TYPE } from '@/shared/lib';

export const addFavorite = (favoriteData) => ({
	type: ACTION_TYPE.ADD_FAVORITE,
	payload: favoriteData,
});
