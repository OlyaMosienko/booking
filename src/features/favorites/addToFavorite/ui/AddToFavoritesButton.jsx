import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '@/entities/favorites/model/selectors';
import { selectUserId } from '@/entities/user/model/selectors';
import {
	addFavoriteAsync,
	removeFavoriteAsync,
} from '@/entities/favorites/model/actions';
import { useServerRequest } from '@/shared/hooks';
import FavoriteSVG from '@/shared/assets/favorite.svg?react';
import styles from './AddToFavoritesButton.module.scss';

export const AddToFavoritesButton = ({ roomId }) => {
	const favorites = useSelector(selectFavorites);
	const isFavorite = favorites?.some((fav) => fav.roomId === roomId);
	const requestServer = useServerRequest();
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	const handleFavoriteToggle = () => {
		if (isFavorite) {
			// const favorite = favorites.find((fav) => fav.roomId === roomId);

			dispatch(removeFavoriteAsync(requestServer, userId, roomId));
		} else {
			dispatch(addFavoriteAsync(requestServer, userId, roomId));
		}
	};

	return (
		<button className={styles.fav} onClick={handleFavoriteToggle}>
			{isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
			<FavoriteSVG
				className={`${styles['fav-svg']} ${isFavorite ? 'fill' : 'empty'}`}
			/>
		</button>
	);
};
