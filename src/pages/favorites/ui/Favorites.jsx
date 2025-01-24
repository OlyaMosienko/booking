import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '@/shared/hooks';
import { selectUserId } from '@/entities/user/model/selectors';
import { getFavoritesDetails } from '@/entities/favorites/model/actions/getFavoritesDetails';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.scss';
import { Title } from '@/shared/ui/Title/Title';
import { removeFavoriteAsync } from '@/entities/favorites/model/actions/removeFavoriteAsync';

export const Favorites = () => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userId = useSelector(selectUserId);
	const [favoriteRooms, setFavoriteRooms] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	console.log(userId);
	console.log('favoriteRooms', favoriteRooms);

	useEffect(() => {
		if (!userId) return;

		setIsLoading(true);
		setError(null);

		dispatch(getFavoritesDetails(requestServer, userId))
			.then((favoritesData) => {
				setFavoriteRooms(favoritesData);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message || 'Произошла ошибка');
				setIsLoading(false);
			});
	}, [dispatch, requestServer, userId]);

	const handleFavoriteToggle = (id) => {
		dispatch(removeFavoriteAsync(requestServer, userId, id));
	};

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	if (favoriteRooms?.length === 0) {
		return <div>Нет избранных номеров</div>;
	}

	return (
		<div>
			<Title>Избранные номера</Title>
			<section className={styles.favorites}>
				{favoriteRooms?.map(({ id, imageUrl, title }) => (
					<div key={id}>
						<Link to={`/room/${id}`}>
							<div>
								<img src={imageUrl} />
							</div>
						</Link>
						<p>{title}</p>
						<button onClick={() => handleFavoriteToggle(id)}>
							Убрать из избранного
						</button>
					</div>
				))}
			</section>
			{!favoriteRooms &&
				'Пока нет избранных номеров, но мы надеемся, ты найдешь их здесь!'}
		</div>
	);
};
