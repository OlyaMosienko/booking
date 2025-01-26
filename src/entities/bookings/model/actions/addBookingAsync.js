import { addBooking } from './addBooking';

export const addBookingAsync = (requestServer, userId, bookingData) => (dispatch) => {
	requestServer('addNewBooking', userId, bookingData).then((bookingData) => {
		dispatch(addBooking(bookingData.res));
	});
};
