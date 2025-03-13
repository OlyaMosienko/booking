import { request } from '@/shared/lib';
import { addReview } from './addReview';

export const addReviewsAsync = (roomId, content) => (dispatch) => {
	request(`/api/rooms/${roomId}/reviews`, 'POST', { content }).then((reviewData) => {
		dispatch(addReview(reviewData.data));
	});
};
