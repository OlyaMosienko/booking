import { useNavigate } from 'react-router-dom';
import { AddToFavoritesButton } from '@/features/favorites/addToFavorite';
import ArrowSVG from '@/shared/assets/arrow.svg?react';
import styles from './NavPanel.module.scss';

export const NavPanel = ({ roomId }) => {
	const navigate = useNavigate();

	return (
		<div className={styles['nav-panel']}>
			<button onClick={() => navigate(-1)}>
				<ArrowSVG />
				Назад
			</button>
			<AddToFavoritesButton roomId={roomId} />
		</div>
	);
};
