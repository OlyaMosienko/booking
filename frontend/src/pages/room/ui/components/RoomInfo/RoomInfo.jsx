import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserRole } from '@/entities/user/model/selectors';
import { addBookingAsync } from '@/entities/bookings/model/actions';
import { updateRoomAsync } from '@/entities/room/model/actions';
import { getRoomTypeLabel } from '@/entities/room/lib';
import { Button, EditSaveButton, Title } from '@/shared/ui';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import { ROLE } from '@/shared/lib';
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig';
import { useModal } from '@/app/providers/ModalProvider/lib/useModal';
import { useToast } from '@/app/providers/ToastProvider/lib/useToast';
import styles from '../../RoomPage.module.scss';
import { BookingModal } from '..';

export const RoomInfo = ({
	room: { id, title, description, type, price, amenities, reviews },
	bookingData,
	editedTitle,
	editedDescription,
	editedPrice,
	onTitleEdit,
	onDescriptionEdit,
	onPriceEdit,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { showToast } = useToast();

	const userRole = useSelector(selectUserRole);
	const { openModal, closeModal } = useModal();

	const handleBookingClick = () => {
		dispatch(addBookingAsync(bookingData));
		closeModal();
		showToast({ message: 'Номер успешно забронирован!', type: 'success' });
	};

	const handleEditClick = () => {
		if (isEditing) {
			const updatedRoom = {
				title: editedTitle,
				description: editedDescription,
				price: editedPrice,
			};
			dispatch(updateRoomAsync(id, updatedRoom))
				.then(() => {
					showToast({
						message: 'Изменения успешно сохранены!',
						type: 'success',
					});
					setIsEditing(false);
				})
				.catch((e) => {
					showToast({
						message: `Ошибка при сохранении изменений: ${e}`,
						type: 'error',
					});
				});
		} else {
			setIsEditing(true);
		}
	};

	return (
		<>
			{userRole === ROLE.ADMIN && (
				<EditSaveButton
					isEditing={isEditing}
					onClick={handleEditClick}
					onClose={() => setIsEditing(false)}
				/>
			)}

			<Title>
				{isEditing ? (
					<input type="text" value={editedTitle} onChange={onTitleEdit} />
				) : (
					title
				)}
			</Title>

			<p className={styles.room__description}>
				{isEditing ? (
					<textarea value={editedDescription} onChange={onDescriptionEdit} />
				) : (
					description
				)}
			</p>
			<div className={styles.room__row}>
				<p className={styles.room__type}>{getRoomTypeLabel(type)}</p>
				<p className={styles.room__reviews}>{reviews?.length} отзывов</p>
			</div>
			<div className={styles.room__amenities}>
				{amenities.map((item) => (
					<div key={item}>{item}</div>
				))}
			</div>
			<p className={styles.room__price}>
				<GalleonSVG />
				{isEditing ? (
					<input type="number" value={editedPrice} onChange={onPriceEdit} />
				) : (
					price
				)}{' '}
				галлеон/сутки
			</p>
			{userRole === ROLE.GUEST ? null : (
				<Button
					onClick={() =>
						openModal(
							<BookingModal
								bookingData={bookingData}
								price={price}
								onConfirm={handleBookingClick}
								onCancel={() => {
									closeModal();
									navigate(RoutePaths[AppRoutes.MAIN]);
								}}
							/>,
						)
					}
				>
					Забронировать!
				</Button>
			)}
		</>
	);
};
