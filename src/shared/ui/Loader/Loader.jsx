import styles from './Loader.module.scss';
import LoaderSVG from '../../assets/loader.svg?react';

export const Loader = () => {
	return (
		<div className={styles.loader}>
			<LoaderSVG className={styles.loader__svg} />
		</div>
	);
};
