import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddToFavoritesButton } from '@/features/favorites/addToFavorite';
import { selectUserRole } from '@/entities/user/model/selectors';
import { ROLE } from '@/shared/lib';
import ArrowSVG from '@/shared/assets/arrow.svg?react';
import styles from './NavPanel.module.scss';

export const NavPanel = ({ roomId }) => {
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	return (
		<div className={styles['nav-panel']}>
			<button onClick={() => navigate(-1)}>
				<ArrowSVG />
				Назад
			</button>
			{userRole === ROLE.GUEST ? null : <AddToFavoritesButton roomId={roomId} />}
		</div>
	);
};
