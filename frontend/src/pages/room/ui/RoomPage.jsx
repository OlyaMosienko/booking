import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectRoom } from '@/entities/room/model/selectors';
import { loadRoomAsync } from '@/entities/room/model/actions';
import { selectUserId } from '@/entities/user/model/selectors';
import { loadFavoritesAsync } from '@/entities/favorites/model/actions';
import { selectSearchParams } from '@/entities/search/model/selectors';
import { DEFAULT_BOOKING_PARAMS } from '@/shared/lib';
import { Loader } from '@/shared/ui';
import { NotFoundPage } from '../../not-found';
import { NavPanel, Reviews, RoomInfo } from './components';
import styles from './RoomPage.module.scss';

const RoomPage = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [editedTitle, setEditedTitle] = useState('');
	const [editedDescription, setEditedDescription] = useState('');
	const [editedPrice, setEditedPrice] = useState(0);

	const dispatch = useDispatch();
	const params = useParams();
	const room = useSelector(selectRoom);
	const userId = useSelector(selectUserId);
	const searchParams = useSelector(selectSearchParams);

	const { dateRange, guests } = searchParams;

	useLayoutEffect(() => {
		if (!params.id) {
			setIsLoading(false);
			return;
		}

		dispatch(loadRoomAsync(params.id))
			.then((roomData) => {
				setEditedTitle(roomData.data.title);
				setEditedDescription(roomData.data.description);
				setEditedPrice(roomData.data.price);
			})
			.catch((e) => setError(e))
			.finally(() => setIsLoading(false));

		dispatch(loadFavoritesAsync());
	}, [dispatch, params.id, userId]);

	const { title, imageUrl, reviews } = room;

	const bookingData = {
		userId,
		roomId: params.id,
		checkInDate: dateRange[0] || DEFAULT_BOOKING_PARAMS.CHECK_IN_DATE,
		checkOutDate: dateRange[1] || DEFAULT_BOOKING_PARAMS.CHECK_OUT_DATE,
		guests: guests || DEFAULT_BOOKING_PARAMS.GUESTS,
	};

	if (isLoading) return <Loader />;

	if (!room || !room.id) {
		return <NotFoundPage />;
	}

	return error ? (
		<div>{error}</div>
	) : (
		<>
			<div>
				<NavPanel roomId={params.id} />
				<article className={styles.room}>
					<div className={styles.room__thumb}>
						<img src={imageUrl} alt={title} />
					</div>
					<div className={styles.room__about}>
						<RoomInfo
							room={room}
							bookingData={bookingData}
							editedTitle={editedTitle}
							editedDescription={editedDescription}
							editedPrice={editedPrice}
							onTitleEdit={({ target }) => setEditedTitle(target.value)}
							onDescriptionEdit={({ target }) =>
								setEditedDescription(target.value)
							}
							onPriceEdit={({ target }) => setEditedPrice(target.value)}
						/>
					</div>
				</article>
			</div>
			<Reviews roomId={params.id} reviews={reviews} />
		</>
	);
};

export default RoomPage;
