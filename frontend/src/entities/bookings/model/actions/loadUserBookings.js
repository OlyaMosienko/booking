import { ACTION_TYPE } from '@/shared/lib';

export const loadUserBookings = (userBookings) => ({
	type: ACTION_TYPE.SET_USER_BOOKINGS,
	payload: userBookings,
});
