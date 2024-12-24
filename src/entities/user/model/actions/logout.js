import { server } from '@/shared/bff';
import { ACTION_TYPE } from '@/shared/lib';

export const logout = (session) => {
	server.logout(session);

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
