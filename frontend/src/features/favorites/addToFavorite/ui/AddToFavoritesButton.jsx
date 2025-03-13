import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '@/entities/favorites/model/selectors';
import { toggleFavoriteAsync } from '@/entities/favorites/model/actions';
import FavoriteSVG from '@/shared/assets/favorite.svg?react';
import styles from './AddToFavoritesButton.module.scss';
import { useToast } from '@/app/providers/ToastProvider/lib/useToast';

export const AddToFavoritesButton = ({ roomId }) => {
	const favorites = useSelector(selectFavorites);
	const isFavorite = favorites?.some((fav) => fav.room.id === roomId);
	const dispatch = useDispatch();
	const { showToast } = useToast();

	const handleFavoriteToggle = () => {
		dispatch(toggleFavoriteAsync(roomId, isFavorite));

		if (isFavorite) {
			showToast({ message: 'Номер удалён из избранных!', type: 'success' });
		} else {
			showToast({ message: 'Номер добавлен в избранные!', type: 'success' });
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
