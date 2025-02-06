import { Link, useMatch } from 'react-router-dom';
import { getRoomTypeLabel } from '../lib';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import styles from './Room.module.scss';
import { AddToFavoritesButton } from '@/features/favorites/addToFavorite';

export const Room = ({
	room: { id, title, imageUrl, type, description, price, reviews },
}) => {
	const isFavoritesPage = !!useMatch('/favorites');

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
					<p className={styles['rooms-item__reviews']}>
						{reviews?.length} отзывов
					</p>
					{isFavoritesPage && <AddToFavoritesButton roomId={id} />}
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
