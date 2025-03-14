import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllBookingsAsync } from '@/entities/bookings/model/actions';
import { selectAllBookings } from '@/entities/bookings/model/selectors';
import { BookingRow, Loader, Title } from '@/shared/ui';
import styles from './AdminPage.module.scss';

export const AdminPage = () => {
	const dispatch = useDispatch();
	const bookings = useSelector(selectAllBookings);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(loadAllBookingsAsync()).finally(() => setIsLoading(false));
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.admin}>
			<Title textAlign="center">Забронированные Номера</Title>
			<section className={styles.admin__bookings}>
				{bookings.length > 0 ? (
					bookings.map((booking) => (
						<BookingRow key={booking.id} booking={booking} />
					))
				) : (
					<p>В гостинице пока нет бронирований.</p>
				)}
			</section>
		</div>
	);
};
