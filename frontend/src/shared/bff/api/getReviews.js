import { transformReview } from '../transformers';

const ALL_REVIEWS_URL = 'http://localhost:3005/reviews';
const ROOM_REVIEWS_URL = 'http://localhost:3005/reviews?room_id=';

export const getReviews = async (roomId) => {
	const url = roomId === undefined ? ALL_REVIEWS_URL : ROOM_REVIEWS_URL + roomId;
	return fetch(url)
		.then((loadedReviews) => loadedReviews.json())
		.then((loadedReviews) => loadedReviews.map(transformReview));
};
