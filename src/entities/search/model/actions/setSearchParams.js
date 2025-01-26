import { ACTION_TYPE } from '@/shared/lib';

export const setSearchParams = (searchFormData) => ({
	type: ACTION_TYPE.SET_SEARCH_PARAMS,
	payload: searchFormData,
});
