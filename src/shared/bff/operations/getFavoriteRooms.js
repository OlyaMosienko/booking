import { ROLE } from '@/shared/lib';
import { sessions } from '../sessions';
import { getFavorites } from '../api';

export const getFavoriteRooms = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.RESIDENT];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const favorites = await getFavorites(userId);

	return {
		error: null,
		res: favorites || [],
	};
};
