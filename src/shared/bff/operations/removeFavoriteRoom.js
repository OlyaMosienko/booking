import { ROLE } from '@/shared/lib';
import { deleteFavorite, getFavorites } from '../api';
import { sessions } from '../sessions';

export const removeFavoriteRoom = async (hash, userId, roomId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.RESIDENT];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const response = await fetch(
		`http://localhost:3005/favorites?user_id=${userId}&room_id=${roomId}`,
	);
	const data = await response.json();

	await deleteFavorite(data[0].id);

	// const favorites = await getFavorites(userId);

	return {
		error: null,
		res: data[0].id,
	};
};
