import { Link } from 'react-router-dom';
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig';
import LogoSVG from '@/shared/assets/logo.svg?react';
import styles from './Logo.module.scss';

export const Logo = () => {
	return (
		<Link className={styles.logo} to={RoutePaths[AppRoutes.MAIN]}>
			<LogoSVG />
			<div className={styles.logo__title}>Дырявый Котёл</div>
		</Link>
	);
};
