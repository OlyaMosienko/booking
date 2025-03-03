import { ROLE } from '@/shared/lib';
import { addBooking, getBookings } from '../api';
import { sessions } from '../sessions';

export const addNewBooking = async (hash, userId, bookingData) => {
	const accessRoles = [ROLE.ADMIN, ROLE.RESIDENT];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await addBooking(bookingData);
	const bookings = await getBookings(userId);

	return {
		error: null,
		res: bookings,
	};
};
