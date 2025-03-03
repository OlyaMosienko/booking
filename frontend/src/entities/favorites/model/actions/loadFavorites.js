import { ACTION_TYPE } from '@/shared/lib';

export const loadFavorites = (favorites) => ({
	type: ACTION_TYPE.LOAD_FAVORITES,
	payload: favorites,
});
