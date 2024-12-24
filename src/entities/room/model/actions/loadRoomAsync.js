import { setRoomData } from './setRoomData';

export const loadRoomAsync = (requestServer, roomId) => (dispatch) =>
	requestServer('fetchRoom', roomId).then((roomData) => {
		if (roomData.res) {
			dispatch(setRoomData(roomData.res));
		}

		return roomData;
	});
