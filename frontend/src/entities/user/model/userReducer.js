import { ACTION_TYPE, ROLE } from '@/shared/lib';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return { ...state, ...payload };
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
