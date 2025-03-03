import { ACTION_TYPE } from '@/shared/lib';

export const setUser = (user) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
