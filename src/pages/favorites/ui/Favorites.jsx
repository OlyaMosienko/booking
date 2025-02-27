import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '@/shared/hooks';
import { selectUserId } from '@/entities/user/model/selectors';
import { getFavoritesDetails } from '@/entities/favorites/model/actions';
import { Loader, Title } from '@/shared/ui';
import { Room } from '@/entities/room';
import styles from './Favorites.module.scss';

const Favorites = () => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userId = useSelector(selectUserId);
	const [favoriteRooms, setFavoriteRooms] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		if (!userId) return;

		setError(null);

		dispatch(getFavoritesDetails(requestServer, userId))
			.then((favoritesData) => {
				setFavoriteRooms(favoritesData);
			})
			.catch((err) => {
				setError(err.message || 'Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	}, [dispatch, requestServer, userId]);

	if (error) {
		return <div>Ошибка: {error}</div>;
	}
	if (isLoading) {
		return <Loader />;
	}

	return (
		<div>
			<Title textAlign="center">Избранные номера</Title>
			<section className={styles.favorites}>
				{favoriteRooms?.map((favoriteRoom) => (
					<Room key={favoriteRoom.id} room={favoriteRoom} />
				))}
			</section>
			{favoriteRooms?.length === 0 &&
				'Пока нет избранных номеров, но мы надеемся, ты найдешь их здесь!'}
		</div>
	);
};

export default Favorites;
