export const deleteReview = async (id) =>
	fetch(`http://localhost:3005/reviews/${id}`, {
		method: 'DELETE',
	});
