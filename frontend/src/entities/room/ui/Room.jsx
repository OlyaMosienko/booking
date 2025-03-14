import { Link, useMatch } from 'react-router-dom';
import { getRoomTypeLabel } from '../lib';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import { AddToFavoritesButton } from '@/features/favorites/addToFavorite';
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig';
import styles from './Room.module.scss';

export const Room = ({
	room: { id, title, imageUrl, type, description, price, reviews },
}) => {
	const isFavoritesPage = !!useMatch(RoutePaths[AppRoutes.FAVORITES]);

	return (
		<div className={styles['rooms-item']}>
			<Link className={styles['rooms-item__thumb']} to={`/room/${id}`}>
				<img src={imageUrl} />
				<span className={styles['rooms-item__thumb-showmore']}>
					Узнать больше &#129106;
				</span>
			</Link>
			<div className={styles['rooms-item__about']}>
				<div className={styles['rooms-item__head']}>
					<p className={styles['rooms-item__type']}>{getRoomTypeLabel(type)}</p>
					{isFavoritesPage ? (
						<AddToFavoritesButton roomId={id} />
					) : (
						<p className={styles['rooms-item__reviews']}>
							{reviews?.length} отзывов
						</p>
					)}
				</div>
				<Link className={styles['rooms-item__title']} to={`/room/${id}`}>
					{title}
				</Link>
				{!isFavoritesPage && (
					<p className={styles['rooms-item__description']}>{description}</p>
				)}
				<p className={styles['rooms-item__price']}>
					<GalleonSVG />
					{price} галлеонов / сутки
				</p>
			</div>
		</div>
	);
};
