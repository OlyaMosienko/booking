import { ROLE } from '@/shared/lib';
import { addFavorite, getFavorites } from '../api';
import { sessions } from '../sessions';

export const addFavoriteRoom = async (hash, userId, roomId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.RESIDENT];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}
	console.log('userId:', userId, 'roomId:', roomId);

	await addFavorite(userId, roomId);
	const favorites = await getFavorites(userId);

	return {
		error: null,
		res: favorites,
	};
};
