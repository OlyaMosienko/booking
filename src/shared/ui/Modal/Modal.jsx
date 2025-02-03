import { useModal } from '@/app/providers/ModalProvider/lib/useModal';
import { useClickOutside } from '@/shared/hooks';
import styles from './Modal.module.scss';

export const Modal = () => {
	const { isOpen, content, closeModal } = useModal();
	const modalRef = useClickOutside(closeModal);

	return (
		<div className={`${styles.modal} ${isOpen ? 'active' : ''}`}>
			<div ref={modalRef} className={styles.modal__content}>
				{content}
				<button className={styles.close} onClick={closeModal}>
					&#9587;
				</button>
			</div>
		</div>
	);
};
