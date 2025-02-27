import styles from './Loader.module.scss';
import LoaderSVG from '../../assets/loader.svg?react';

export const Loader = ({ minSize = false }) => {
	return (
		<div className={`${styles.loader} ${minSize ? styles.loader_mini : ''}`}>
			<LoaderSVG className={styles.loader__svg} />
		</div>
	);
};
