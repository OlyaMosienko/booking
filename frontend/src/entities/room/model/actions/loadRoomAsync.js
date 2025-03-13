import { request } from '@/shared/lib';
import { setRoomData } from './setRoomData';

export const loadRoomAsync = (roomId) => (dispatch) =>
	request(`/api/rooms/${roomId}`).then((roomData) => {
		if (roomData.data) {
			dispatch(setRoomData(roomData.data));
		}

		return roomData;
	});
