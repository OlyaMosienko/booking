export const addBooking = (bookingData) =>
	fetch('http://localhost:3005/bookings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(bookingData),
	}).then((createdBooking) => {
		console.log('addBooking', createdBooking);
		createdBooking.json();
	});
