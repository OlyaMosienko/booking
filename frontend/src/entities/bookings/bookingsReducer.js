import { ACTION_TYPE } from '@/shared/lib';

const initialBookingsState = {
	userBookings: [],
	allBookings: [],
};

export const bookingsReducer = (state = initialBookingsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_BOOKING:
			return { ...state, userBookings: [...state.userBookings, payload] };

		case ACTION_TYPE.REMOVE_BOOKING:
			return {
				...state,
				userBookings: state.userBookings.filter(({ id }) => id !== payload),
				allBookings: state.allBookings.filter(({ id }) => id !== payload),
			};

		case ACTION_TYPE.SET_USER_BOOKINGS:
			return { ...state, userBookings: payload };

		case ACTION_TYPE.SET_ALL_BOOKINGS:
			return { ...state, allBookings: payload };

		default:
			return state;
	}
};
