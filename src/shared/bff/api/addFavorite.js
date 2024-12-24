export const addFavorite = (userId, roomId) =>
	fetch('http://localhost:3005/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			user_id: userId,
			room_id: roomId,
		}),
	}).then((createdFavorite) => createdFavorite.json());
