export const addUser = (login, password) =>
	fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registed_at: new Date().toLocaleDateString(),
			role_id: 1,
		}),
	}).then((createdUser) => createdUser.json());
