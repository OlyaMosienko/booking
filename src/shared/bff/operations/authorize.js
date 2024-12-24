import { getFavorites, getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Такой пользователь не найден!',
			res: null,
		};
	}

	const { id, login, password, roleId } = user;

	if (authPassword !== password) {
		return {
			error: 'Неверный пароль!',
			res: null,
		};
	}

	const favorites = await getFavorites(user.id);

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session: sessions.create(user),
			favorites,
		},
	};
};
