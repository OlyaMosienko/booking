import { ACTION_TYPE } from '@/shared/lib';

export const loadAllBookings = (bookings) => ({
	type: ACTION_TYPE.SET_ALL_BOOKINGS,
	payload: bookings,
});
