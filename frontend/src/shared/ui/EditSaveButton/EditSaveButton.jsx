import EditSVG from '@/shared/assets/edit.svg?react';
import SaveSVG from '@/shared/assets/save.svg?react';
import CloseSVG from '@/shared/assets/close.svg?react';
import styles from './EditSaveButton.module.scss';

export const EditSaveButton = ({ isEditing, onClick, onClose }) => {
	return (
		<div className={styles['edit-panel']}>
			{isEditing && (
				<button className={styles['edit-panel__btn']} onClick={onClose}>
					<CloseSVG />
				</button>
			)}
			<button className={styles['edit-panel__btn']} onClick={onClick}>
				{isEditing ? <SaveSVG /> : <EditSVG />}
			</button>
		</div>
	);
};
