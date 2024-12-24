export const getRooms = async () => {
	try {
		const response = await fetch('http://localhost:3005/rooms'); // Замените на ваш URL
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data; // Предполагая, что ответ содержит поле 'rooms'
	} catch (error) {
		console.error('Error fetching rooms:', error);
		return []; // Возвращаем пустой массив в случае ошибки
	}
};
