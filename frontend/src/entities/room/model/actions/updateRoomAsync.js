import { request } from '@/shared/lib';
import { setRoomData } from './setRoomData';

export const updateRoomAsync = (roomId, newRoomData) => (dispatch) =>
	request(`/api/rooms/${roomId}`, 'PATCH', newRoomData).then((roomData) => {
		if (roomData.data) {
			dispatch(setRoomData(roomData.data));
		}

		return roomData;
	});
