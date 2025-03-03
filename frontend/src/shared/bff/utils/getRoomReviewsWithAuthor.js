import { getReviews, getUsers } from '../api';

export const getRoomReviewsWithAuthor = async (roomId) => {
	const reviews = await getReviews(roomId);
	const users = await getUsers();
	return reviews.map((review) => {
		const user = users.find(({ id }) => id === review.authorId);
		return { ...review, author: user?.login };
	});
};
