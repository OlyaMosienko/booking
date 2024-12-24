import { transformFavorites } from '../transformers';

export const getFavorites = (userId) =>
	fetch(`http://localhost:3005/favorites?user_id=${userId}`)
		.then((loadedFavorites) => loadedFavorites.json())
		.then(
			(loadedFavorites) =>
				loadedFavorites && loadedFavorites.map(transformFavorites),
		);
