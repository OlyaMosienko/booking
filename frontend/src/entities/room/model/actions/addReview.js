import { ACTION_TYPE } from '@/shared/lib';

export const addReview = (review) => ({
	type: ACTION_TYPE.ADD_REVIEW,
	payload: review,
});
