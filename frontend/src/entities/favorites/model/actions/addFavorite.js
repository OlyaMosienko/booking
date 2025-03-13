import { ACTION_TYPE } from '@/shared/lib';

export const addFavorite = (favorite) => ({
	// type: ACTION_TYPE.TOGGLE_FAVORITE,
	type: ACTION_TYPE.ADD_FAVORITE,
	payload: favorite,
});
