import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '@/entities/user/model/selectors';
import { loadFavoritesAsync } from '@/entities/favorites/model/actions';
import { Room } from '@/entities/room';
import { Loader, Title } from '@/shared/ui';
import styles from './Favorites.module.scss';
import { selectFavorites } from '@/entities/favorites/model/selectors';

const Favorites = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const favoriteRooms = useSelector(selectFavorites);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!userId) return;

		setError(null);
		setIsLoading(true);

		dispatch(loadFavoritesAsync()).finally(() => setIsLoading(false));
	}, [dispatch, userId]);

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
					<Room key={favoriteRoom.room.id} room={favoriteRoom.room} />
				))}
			</section>
			{!isLoading &&
				favoriteRooms.length === 0 &&
				'Пока нет избранных номеров, но мы надеемся, ты найдешь их здесь!'}
		</div>
	);
};

export default Favorites;
