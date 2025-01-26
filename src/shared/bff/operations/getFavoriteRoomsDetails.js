import { ROLE } from '@/shared/lib';
import { sessions } from '../sessions';
import { getFavorites } from '../api';
import { transformRoom } from '../transformers';

export const getFavoriteRoomsDetails = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.RESIDENT];
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const favorites = await getFavorites(userId);

	const roomIds = favorites.map((fav) => `id=${fav.roomId}`).join('&');
	const response = await fetch(`http://localhost:3005/rooms?${roomIds}`);
	const rooms = await response.json();

	return {
		error: null,
		res: rooms.length > 0 ? rooms.map(transformRoom) : [],
	};
};
