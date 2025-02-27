import roomImg from '@/shared/assets/leaky-cauldron-room-resize.webp';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import UsersSVG from '@/shared/assets/users.svg?react';
import CalendarSVG from '@/shared/assets/calendar.svg?react';
import TrashSVG from '@/shared/assets/trash.svg?react';
import styles from './BookingRow.module.scss';

export const BookingRow = () => {
	return (
		<div className={styles.booking}>
			<div className={styles['booking__room-details']}>
				<img className={styles.booking__img} src={roomImg} alt="room" />
				<div>
					<p className={styles.booking__room}>Комната Люкс</p>
					<p className={styles.booking__price}>
						<GalleonSVG />
						10 галлеон/сутки
					</p>
				</div>
			</div>
			<span className={styles.booking__user}>user1</span>
			<div className={styles.booking__guests}>
				<UsersSVG />
				<div className={styles['booking__guests-details']}>
					<span>взрослые: 3</span>
					<span>дети: 0</span>
				</div>
			</div>
			<div className={styles.booking__dates}>
				<CalendarSVG />
				20.03.2025 - 25.03.2025
			</div>
			<TrashSVG />
		</div>
	);
};
