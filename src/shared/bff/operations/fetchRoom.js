import { getRoom } from '../api';
import { getRoomReviewsWithAuthor } from '../utils/getRoomReviewsWithAuthor';

export const fetchRoom = async (roomId) => {
	let room;
	let error;

	try {
		room = await getRoom(roomId);
	} catch (roomError) {
		error = roomError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	const reviewsWithAuthor = await getRoomReviewsWithAuthor(roomId);

	return {
		error: null,
		res: {
			...room,
			reviews: reviewsWithAuthor,
		},
	};
};
