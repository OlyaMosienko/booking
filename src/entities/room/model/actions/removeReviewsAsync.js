import { setRoomData } from './setRoomData';

export const removeReviewsAsync = (requestServer, roomId, id) => (dispatch) => {
	requestServer('removeRoomReview', roomId, id).then((roomData) =>
		dispatch(setRoomData(roomData.res)),
	);
};
