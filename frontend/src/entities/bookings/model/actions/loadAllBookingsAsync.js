import { request } from '@/shared/lib';
import { loadAllBookings } from './loadAllBookings';

export const loadAllBookingsAsync = () => (dispatch) => {
	request('/api/bookings/all')
		.then((loadedBookings) => {
			dispatch(loadAllBookings(loadedBookings.data));
		})
		.catch((error) => {
			console.error('Ошибка при загрузке всех бронирований:', error);
		});
};
