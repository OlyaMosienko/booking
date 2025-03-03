import { ACTION_TYPE } from '@/shared/lib';

export const addBooking = (bookingData) => ({
	type: ACTION_TYPE.ADD_BOOKING,
	payload: bookingData,
});
