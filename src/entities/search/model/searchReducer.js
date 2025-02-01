import { ACTION_TYPE } from '@/shared/lib';

const initialSearchState = {
	dateRange: [],
	roomType: 'standard',
	guests: {
		adults: 1,
		children: 0,
	},
	priceRange: 1000,
};

export const searchReducer = (state = initialSearchState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_SEARCH_PARAMS:
			return { ...state, ...payload };
		default:
			return state;
	}
};
