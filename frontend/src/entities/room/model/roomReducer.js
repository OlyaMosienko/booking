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
	reviews: [],
};

export const roomReducer = (state = initialRoomState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ROOM_DATA: {
			return {
				...state,
				...payload,
			};
		}
		case ACTION_TYPE.ADD_REVIEW: {
			return {
				...state,
				reviews: [...state.reviews, payload],
			};
		}
		case ACTION_TYPE.REMOVE_REVIEW: {
			return {
				...state,
				reviews: state.reviews.filter((review) => review.id !== payload),
			};
		}
		default:
			return state;
	}
};
