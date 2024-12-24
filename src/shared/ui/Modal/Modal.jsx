import { useModal } from '@/app/providers/ModalProvider/lib/useModal';
import styles from './Modal.module.scss';

export const Modal = () => {
	const { isOpen, content, closeModal } = useModal();

	return (
		<div className={`${styles.modal} ${isOpen ? 'active' : ''}`}>
			<div className={styles.modal__content}>
				{content}
				<button className={styles.close} onClick={closeModal}>
					&#9587;
				</button>
			</div>
		</div>
	);
};
