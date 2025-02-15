import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useServerRequest } from '@/shared/hooks';
import { selectRoom } from '@/entities/room/model/selectors';
import { loadRoomAsync } from '@/entities/room/model/actions';
import { selectUserId, selectUserRole } from '@/entities/user/model/selectors';
import { loadFavoritesAsync } from '@/entities/favorites/model/actions';
import { selectSearchParams } from '@/entities/search/model/selectors';
import { addBookingAsync } from '@/entities/bookings/model/actions/addBookingAsync';
import { DEFAULT_BOOKING_PARAMS, ROLE } from '@/shared/lib';
import { Button, Loader, Title } from '@/shared/ui';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import { useModal } from '@/app/providers/ModalProvider/lib/useModal';
import { useToast } from '@/app/providers/ToastProvider/lib/useToast';
import { getRoomTypeLabel } from '@/entities/room/lib';
import { NotFoundPage } from '../../not-found';
import { NavPanel, Reviews } from './components';
import styles from './RoomPage.module.scss';

const RoomPage = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const params = useParams();
	const room = useSelector(selectRoom);
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const searchParams = useSelector(selectSearchParams);
	const { showToast } = useToast();

	const { dateRange, guests } = searchParams;

	useLayoutEffect(() => {
		if (!params.id) {
			setIsLoading(false);
			return;
		}

		dispatch(loadRoomAsync(requestServer, params.id))
			.then((roomData) => {
				setError(roomData.error);
			})
			.finally(() => setIsLoading(false));

		dispatch(loadFavoritesAsync(requestServer, userId));
	}, [dispatch, params.id, requestServer, userId]);

	const { title, image_url, description, type, price, amenities, reviews } = room;

	const { openModal, closeModal } = useModal();

	const bookingData = {
		userId,
		roomId: params.id,
		checkInDate: dateRange[0] || DEFAULT_BOOKING_PARAMS.CHECK_IN_DATE,
		checkOutDate: dateRange[1] || DEFAULT_BOOKING_PARAMS.CHECK_OUT_DATE,
		guests: guests || DEFAULT_BOOKING_PARAMS.GUESTS,
	};

	const handleBookingClick = () => {
		dispatch(addBookingAsync(requestServer, userId, bookingData));
		closeModal();
		showToast({ message: 'Номер успешно забронирован!', type: 'success' });
	};

	if (isLoading) return <Loader />;

	if (!room || !room.id) {
		return <NotFoundPage />;
	}

	const daysCount =
		(bookingData.checkOutDate - bookingData.checkInDate) / (1000 * 60 * 60 * 24);
	const totalCost =
		daysCount *
		price *
		(bookingData.guests.adults + bookingData.guests.children * 0.5);

	return error ? (
		<div>{error}</div>
	) : (
		<>
			<div>
				<NavPanel roomId={params.id} />
				<article className={styles.room}>
					<div className={styles.room__thumb}>
						<img src={image_url} alt={title} />
					</div>
					<div className={styles.room__about}>
						<Title>{title}</Title>
						<p className={styles.room__description}>{description}</p>
						<div className={styles.room__row}>
							<p className={styles.room__type}>{getRoomTypeLabel(type)}</p>
							<p className={styles.room__reviews}>
								{reviews?.length} отзывов
							</p>
						</div>
						<div className={styles.room__amenities}>
							{amenities.map((item) => (
								<div key={item}>{item}</div>
							))}
						</div>
						<p className={styles.room__price}>
							<GalleonSVG />
							{price} галлеон/сутки
						</p>
						{userRole === ROLE.GUEST ? null : (
							<Button
								onClick={() =>
									openModal(
										<div>
											<p className="modal__title">
												Хотите забронировать этот номер?
											</p>
											<p>
												Дата:
												{`${bookingData.checkInDate.toLocaleDateString()} - ${bookingData.checkOutDate.toLocaleDateString()}`}
											</p>
											<p>
												Количество гостей:
												{`${bookingData.guests.adults} взрослых - ${bookingData.guests.children} детей`}
											</p>
											<p>Стоимость за сутки: {price}</p>
											<p>Итого: {totalCost.toFixed(0)}</p>
											<div className="modal__btns">
												<Button onClick={handleBookingClick}>
													Да
												</Button>
												<Button
													onClick={() => {
														closeModal();
														navigate('/');
													}}
												>
													Посмотрю еще
												</Button>
											</div>
										</div>,
									)
								}
							>
								Забронировать!
							</Button>
						)}
					</div>
				</article>
			</div>
			<Reviews roomId={params.id} reviews={reviews} />
		</>
	);
};

export default RoomPage;
