import { Link } from 'react-router-dom';
import LogoSVG from '../../assets/logo.svg?react';
import styles from './Logo.module.scss';

export const Logo = () => {
	return (
		<Link className={styles.logo} to="/">
			<LogoSVG />
			<div className={styles.logo__title}>Дырявый Котёл</div>
		</Link>
	);
};
