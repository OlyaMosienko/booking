import { request } from '@/shared/lib';
import { addBooking } from './addBooking';

export const addBookingAsync = (bookingData) => (dispatch) => {
	request('/api/booking', 'POST', bookingData).then((bookingData) => {
		dispatch(addBooking(bookingData.data));
	});
};
