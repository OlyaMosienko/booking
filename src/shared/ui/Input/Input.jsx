import { forwardRef } from 'react';
import styles from './Input.module.scss';

// eslint-disable-next-line react/display-name
export const Input = forwardRef(({ ...props }, ref) => {
	return <input className={styles.input} ref={ref} {...props} />;
});
