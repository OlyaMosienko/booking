import { BookingRow, Title } from '@/shared/ui';
import styles from './BookingsPage.module.scss';

export const BookingsPage = () => {
	return (
		<div className={styles.bookings}>
			<Title textAlign="center">Забронированные Номера</Title>
			<section className={styles.bookings__list}>
				<BookingRow />
				<BookingRow />
			</section>
		</div>
	);
};
