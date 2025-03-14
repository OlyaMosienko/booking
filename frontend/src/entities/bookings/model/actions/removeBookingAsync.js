import { request } from '@/shared/lib';
import { removeBooking } from './removeBooking';

export const removeBookingAsync = (bookingId) => (dispatch) => {
	request(`/api/bookings/${bookingId}`, 'DELETE')
		.then(() => {
			dispatch(removeBooking(bookingId));
		})
		.catch((error) => {
			console.error('Ошибка при удалении бронирования:', error);
		});
};
