import { BookingRow, Title } from '@/shared/ui';
import styles from './AdminPage.module.scss';

export const AdminPage = () => {
	return (
		<div className={styles.admin}>
			<Title textAlign="center">Забронированные Номера</Title>
			<section className={styles.admin__bookings}>
				<BookingRow />
				<BookingRow />
				<BookingRow />
			</section>
		</div>
	);
};
