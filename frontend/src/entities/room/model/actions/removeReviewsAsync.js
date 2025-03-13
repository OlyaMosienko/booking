import { request } from '@/shared/lib';
import { removeReview } from './removeReview';

export const removeReviewsAsync = (roomId, id) => (dispatch) => {
	request(`/api/rooms/${roomId}/reviews/${id}`, 'DELETE').then(() =>
		dispatch(removeReview(id)),
	);
};
