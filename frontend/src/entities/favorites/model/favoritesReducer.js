import { ACTION_TYPE } from '@/shared/lib';

const initialFavoritesState = [];

export const favoritesReducer = (state = initialFavoritesState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.TOGGLE_FAVORITE:
			return state.some((fav) => fav.room.id === payload.id)
				? state.filter((fav) => fav.room.id !== payload.id)
				: [...state, payload];
		case ACTION_TYPE.LOAD_FAVORITES:
			return payload;
		case ACTION_TYPE.ADD_FAVORITE:
			return [...state, payload];
		case ACTION_TYPE.REMOVE_FAVORITE:
			return state.filter((fav) => fav.room.id !== payload);
		default:
			return state;
	}
};
