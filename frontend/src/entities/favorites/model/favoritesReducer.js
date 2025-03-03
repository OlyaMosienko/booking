import { ACTION_TYPE } from '@/shared/lib';

const initialFavoritesState = [];

export const favoritesReducer = (state = initialFavoritesState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_FAVORITE:
			return [...state, payload];
		case ACTION_TYPE.REMOVE_FAVORITE:
			return state.filter(({ id }) => id !== payload);
		case ACTION_TYPE.LOAD_FAVORITES:
			return payload;
		default:
			return state;
	}
};
