import { transformUser } from '../transformers';

export const getUser = (login) =>
	fetch(`http://localhost:3005/users?login=${login}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
