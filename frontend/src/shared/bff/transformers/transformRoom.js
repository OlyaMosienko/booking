export const transformRoom = (dbRoom) => ({
	id: dbRoom.id,
	title: dbRoom.title,
	imageUrl: dbRoom.image_url,
	description: dbRoom.description,
	type: dbRoom.type,
	price: dbRoom.price,
	availability: dbRoom.availability,
	amenities: dbRoom.amenities,
	capacity: dbRoom.capacity,
});
