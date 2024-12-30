export const getRooms = async (limit, page) => {
	console.log('limit', limit, 'page', page);

	try {
		const response = await fetch(
			`http://localhost:3005/rooms?_limit=${limit}&_page=${page}`,
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching rooms:', error);
		return [];
	}
};
