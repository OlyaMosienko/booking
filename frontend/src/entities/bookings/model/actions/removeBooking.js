import { ACTION_TYPE } from '@/shared/lib';

export const removeBooking = (bookingId) => ({
	type: ACTION_TYPE.REMOVE_BOOKING,
	payload: bookingId,
});
