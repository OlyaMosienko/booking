export const getBookings = (userId) =>
	fetch(`http://localhost:3005/bookings?userId=${userId}`).then((loadedBookings) =>
		loadedBookings.json(),
	);
