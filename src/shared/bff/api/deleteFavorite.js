export const deleteFavorite = async (id) =>
	fetch(`http://localhost:3005/favorites/${id}`, {
		method: 'DELETE',
	});
