import { setRoomData } from './setRoomData';

export const addReviewsAsync = (requestServer, userId, roomId, content) => (dispatch) => {
	requestServer('addRoomReview', userId, roomId, content).then((roomData) => {
		dispatch(setRoomData(roomData.res));
	});
};
