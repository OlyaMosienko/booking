import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserBookings } from '@/entities/bookings/model/selectors';
import { loadUserBookingsAsync } from '@/entities/bookings/model/actions';
import { BookingRow, Loader, Title } from '@/shared/ui';
import styles from './BookingsPage.module.scss';

export const BookingsPage = () => {
	const dispatch = useDispatch();
	const bookings = useSelector(selectUserBookings);
	const isLoading = !bookings;

	useEffect(() => {
		dispatch(loadUserBookingsAsync());
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.bookings}>
			<Title textAlign="center">Забронированные Номера</Title>
			<section className={styles.bookings__list}>
				{bookings.length > 0 ? (
					bookings.map((booking) => (
						<BookingRow key={booking.id} booking={booking} />
					))
				) : (
					<p>У вас пока нет бронирований.</p>
				)}
			</section>
		</div>
	);
};
