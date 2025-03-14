import { request } from '@/shared/lib';
import { loadUserBookings } from './loadUserBookings';

export const loadUserBookingsAsync = () => (dispatch) =>
	request('/api/bookings')
		.then((loadedUserBookings) => {
			dispatch(loadUserBookings(loadedUserBookings.data));
		})
		.catch((error) => {
			console.error('Ошибка при загрузке бронирований пользователя:', error);
		});
