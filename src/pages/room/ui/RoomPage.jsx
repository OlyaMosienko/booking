import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useServerRequest } from '@/shared/hooks';
import { selectRoom } from '@/entities/room/model/selectors';
import { Title } from '@/shared/ui/Title/Title';
import { loadRoomAsync } from '@/entities/room/model/actions';
import { Button } from '@/shared/ui/Button/Button';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import { Reviews } from './components/Reviews/Reviews';
import styles from './RoomPage.module.scss';
import { useModal } from '@/app/providers/ModalProvider/lib/useModal';
import { selectFavorites } from '@/entities/favorites/model/selectors';
import { selectUserId } from '@/entities/user/model/selectors';
import { removeFavoriteAsync } from '@/entities/favorites/model/actions/removeFavoriteAsync';
import { addFavoriteAsync } from '@/entities/favorites/model/actions/addFavoriteAsync';
import { loadFavoritesAsync } from '@/entities/favorites/model/actions/loadFavoritesAsync';
import { selectSearchParams } from '@/entities/search/model/selectors';
import { addBookingAsync } from '@/entities/bookings/model/actions/addBookingAsync';
import { DEFAULT_BOOKING_PARAMS } from '@/shared/lib';

const RoomPage = () => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const params = useParams();
	const room = useSelector(selectRoom);
	const navigate = useNavigate();
	const favorites = useSelector(selectFavorites);
	const userId = useSelector(selectUserId);
	const searchParams = useSelector(selectSearchParams);

	const { dateRange, guests } = searchParams;

	useEffect(() => {
		dispatch(loadRoomAsync(requestServer, params.id)).then((roomData) => {
			setError(roomData.error);
		});

		dispatch(loadFavoritesAsync(requestServer, userId));
	}, [dispatch, params.id, requestServer, userId]);

	const { title, image_url, description, type, price, amenities, reviews } = room;

	const isFavorite = favorites?.some((fav) => fav.roomId === params.id);

	const { openModal, closeModal } = useModal();

	const handleFavoriteToggle = () => {
		if (isFavorite) {
			const favorite = favorites.find((fav) => fav.roomId === params.id);

			dispatch(removeFavoriteAsync(requestServer, userId, favorite.id));
		} else {
			dispatch(addFavoriteAsync(requestServer, userId, params.id));
		}
	};

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
	};

	return error ? (
		<div>{error}</div>
	) : (
		<>
			<div>
				<div>
					<button onClick={() => navigate(-1)}>Назад</button>
					<button onClick={handleFavoriteToggle}>
						{isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
					</button>
				</div>
				<div className={styles.room}>
					<div className={styles.room__thumb}>
						<img src={image_url} />
					</div>
					<div className={styles.room__about}>
						<Title>{title}</Title>
						<p className={styles.room__description}>{description}</p>
						<div className={styles.room__row}>
							<p className={styles.room__type}>{type}</p>
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
						<Button
							onClick={() =>
								openModal(
									<div>
										<p>Хотите забронировать этот номер?</p>
										<p>
											Дата:
											{`${bookingData.checkInDate.toLocaleDateString()} - ${bookingData.checkOutDate.toLocaleDateString()}`}
										</p>
										<p>
											Количество гостей:
											{`${bookingData.guests.adults} взрослых - ${bookingData.guests.children} детей`}
										</p>
										<p>Стоимость за сутки: {price}</p>
										<p>
											Итого:{' '}
											{(() => {
												const daysCount =
													(bookingData.checkOutDate -
														bookingData.checkInDate) /
													(1000 * 60 * 60 * 24);
												const totalCost =
													daysCount *
													price *
													(bookingData.guests.adults +
														bookingData.guests.children *
															0.5);
												return totalCost.toFixed(2);
											})()}
										</p>
										<Button onClick={handleBookingClick}>Да</Button>
										<Button
											onClick={() => {
												closeModal();
												navigate('/');
											}}
										>
											Посмотрю еще
										</Button>
									</div>,
								)
							}
						>
							Забронировать!
						</Button>
					</div>
				</div>
			</div>
			<Reviews roomId={params.id} reviews={reviews} />
		</>
	);
};

export default RoomPage;
