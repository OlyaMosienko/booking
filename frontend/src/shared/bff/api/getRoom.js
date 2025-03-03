export const getRoom = (id) =>
	fetch(`http://localhost:3005/rooms/${id}`)
		.then((res) => {
			if (res.ok) return res;

			const error =
				res.status === 404
					? 'Страница с таким адресом не найдена'
					: 'Что-то пошло не так:( Попробуйте еще раз позднее';

			return Promise.reject(error);
		})
		.then((loadedRoom) => loadedRoom.json());
