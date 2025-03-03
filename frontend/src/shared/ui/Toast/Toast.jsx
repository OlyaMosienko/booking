import { useToast } from '@/app/providers/ToastProvider/lib/useToast';
import successIcon from '../../assets/success.svg';
import warningIcon from '../../assets/warning.svg';
import errorIcon from '../../assets/error.svg';
import styles from './Toast.module.scss';

export const Toast = () => {
	const { isOpen, closeToast, message, type } = useToast();

	const iconMap = {
		success: successIcon,
		warning: warningIcon,
		error: errorIcon,
	};

	const icon = iconMap[type];

	return (
		<div className={`${styles.toast} ${isOpen ? 'open' : ''}`}>
			<button className={styles.close} onClick={closeToast}>
				&#9587;
			</button>
			<img src={icon} alt={type} />
			{message}
		</div>
	);
};
