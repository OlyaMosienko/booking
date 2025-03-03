export const addReview = (userId, roomId, content) =>
	fetch('http://localhost:3005/reviews', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			room_id: roomId,
			published_at: new Date().toLocaleDateString(),
			content,
		}),
	});
