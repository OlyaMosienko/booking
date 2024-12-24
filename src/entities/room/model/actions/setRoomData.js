import { ACTION_TYPE } from '@/shared/lib';

export const setRoomData = (roomData) => ({
	type: ACTION_TYPE.SET_ROOM_DATA,
	payload: roomData,
});
