export const transformFavorites = (dbFavorite) => ({
	id: dbFavorite.id,
	roomId: dbFavorite.room_id,
	userId: dbFavorite.user_id,
});
