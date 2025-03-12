import { ACTION_TYPE, request } from '@/shared/lib';

export const logout = (session) => {
	request('/api/logout', 'POST', session);

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
