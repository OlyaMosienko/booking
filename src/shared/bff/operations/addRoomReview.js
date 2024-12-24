import { ROLE } from '@/shared/lib';
import { addReview, getRoom } from '../api';
import { sessions } from '../sessions';
import { getRoomReviewsWithAuthor } from '../utils/getRoomReviewsWithAuthor';

export const addRoomReview = async (hash, userId, roomId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.RESIDENT];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await addReview(userId, roomId, content);
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
