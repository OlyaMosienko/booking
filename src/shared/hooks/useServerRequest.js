import { selectUserSession } from '@/entities/user/model/selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = ['register', 'authorize', 'fetchRoom', 'fetchRooms'].includes(
				operation,
			)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
