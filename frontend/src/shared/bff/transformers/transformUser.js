export const transformUser = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	password: dbUser.password,
	roleId: dbUser.role_id,
	registeredAt: dbUser.registered_at,
});
