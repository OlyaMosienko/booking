import { ACTION_TYPE } from '@/shared/lib';

const initialBookingsState = [];

export const bookingsReducer = (state = initialBookingsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_BOOKING:
			return [...state, payload];
		case ACTION_TYPE.REMOVE_FAVORITE:
			return state.filter(({ id }) => id !== payload);
		default:
			return state;
	}
};
