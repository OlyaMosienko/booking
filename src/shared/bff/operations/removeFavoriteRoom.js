import { ROLE } from '@/shared/lib';
import { deleteFavorite, getFavorites } from '../api';
import { sessions } from '../sessions';

export const removeFavoriteRoom = async (hash, userId, favoriteId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.RESIDENT];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteFavorite(favoriteId);
	const favorites = await getFavorites(userId);

	return {
		error: null,
		res: favorites,
	};
};
