import { useDispatch } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { useModal } from '@/app/providers/ModalProvider/lib/useModal';
import { useToast } from '@/app/providers/ToastProvider/lib/useToast';
import { removeBookingAsync } from '@/entities/bookings/model/actions';
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import UsersSVG from '@/shared/assets/users.svg?react';
import CalendarSVG from '@/shared/assets/calendar.svg?react';
import TrashSVG from '@/shared/assets/trash.svg?react';
import styles from './BookingRow.module.scss';
import { Button } from '../..';

export const BookingRow = ({
	booking: { id, checkInDate, checkOutDate, guests, room, user },
}) => {
	const isAdminPage = !!useMatch(RoutePaths[AppRoutes.ADMIN]);
	const { openModal, closeModal } = useModal();
	const { showToast } = useToast();
	const dispatch = useDispatch();

	const handleCancelBooking = (bookingId) => {
		dispatch(removeBookingAsync(bookingId));
		closeModal();
		showToast({ message: 'Бронирование отменено!', type: 'success' });
	};

	return (
		<div className={styles.booking}>
			<div className={styles['booking__room-details']}>
				<img className={styles.booking__img} src={room.imageUrl} alt="room" />
				<div>
					<p className={styles.booking__room}>{room.title}</p>
					<p className={styles.booking__price}>
						<GalleonSVG />
						{room.price} галлеон/сутки
					</p>
				</div>
			</div>
			{isAdminPage && <span className={styles.booking__user}>{user.login}</span>}
			<div className={styles.booking__guests}>
				<UsersSVG />
				<div className={styles['booking__guests-details']}>
					<span>взрослые: {guests.adults}</span>
					<span>дети: {guests.children}</span>
				</div>
			</div>
			<div className={styles.booking__dates}>
				<CalendarSVG />
				{`${checkInDate} - ${checkOutDate}`}
			</div>
			<button
				className={styles.booking__delete}
				onClick={() =>
					openModal(
						<div>
							<p className="modal__title">
								Вы действительно хотите отменить бронирование?
							</p>
							<div className="modal__btns">
								<Button onClick={() => handleCancelBooking(id)}>
									Да
								</Button>
								<Button onClick={closeModal}>Нет</Button>
							</div>
						</div>,
					)
				}
			>
				<TrashSVG />
			</button>
		</div>
	);
};
