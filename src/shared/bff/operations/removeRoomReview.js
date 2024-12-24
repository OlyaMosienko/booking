import { ROLE } from '@/shared/lib';
import { sessions } from '../sessions';
import { deleteReview, getRoom } from '../api';
import { getRoomReviewsWithAuthor } from '../utils/getRoomReviewsWithAuthor';

export const removeRoomReview = async (hash, roomId, id) => {
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteReview(id);
	const room = await getRoom(roomId);
	const reviewsWithAuthor = await getRoomReviewsWithAuthor(roomId);

	return {
		error: null,
		res: {
			...room,
			reviews: reviewsWithAuthor,
		},
	};
};
