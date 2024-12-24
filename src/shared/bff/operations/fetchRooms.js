import { getRooms } from '../api';
import { transformRoom } from '../transformers';

export const fetchRooms = async () => {
	let rooms;
	let error;

	try {
		rooms = await getRooms();
	} catch (roomError) {
		error = roomError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	// Проверяем, что rooms действительно массив
	if (!Array.isArray(rooms)) {
		console.warn('Expected rooms to be an array, but got:', rooms);
		rooms = []; // Если это не массив, устанавливаем пустой массив
	}

	return {
		error: null,
		res: rooms.map(transformRoom),
	};
};
