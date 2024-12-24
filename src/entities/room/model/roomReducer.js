import { ACTION_TYPE } from '@/shared/lib';

const initialRoomState = {
	id: '',
	title: '',
	imageUrl: '',
	price: '',
	description: '',
	type: '',
	availability: '',
	amenities: [],
	capacity: {
		adults: 0,
		children: 0,
	},
	reviewsCount: 0,
};

export const roomReducer = (state = initialRoomState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ROOM_DATA: {
			return {
				...state,
				...payload,
			};
		}
		default:
			return state;
	}
};
