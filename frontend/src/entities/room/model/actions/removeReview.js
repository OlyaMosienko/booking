import { ACTION_TYPE } from '@/shared/lib';

export const removeReview = (reviewId) => ({
	type: ACTION_TYPE.REMOVE_REVIEW,
	payload: reviewId,
});
