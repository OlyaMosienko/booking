import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useServerRequest } from '@/shared/hooks';
import { selectSearchParams } from '@/entities/search/model/selectors';
import { setSearchParams } from '@/entities/search/model/actions';
import { roomTypeOptions } from '@/entities/room/model/roomTypeOptions';
import { PAGINATION_LIMIT } from '@/shared/lib';
import {
	Button,
	DateRange,
	Form,
	GuestsCounter,
	PriceRange,
	Select,
	Title,
} from '@/shared/ui';
import GalleonSVG from '@/shared/assets/galleon.svg?react';
import { searchRoomSchema } from '../lib/searchRoomSchema';
import styles from './MainPage.module.scss';
import { getRoomTypeLabel } from '@/entities/room/lib';

const MainPage = () => {
	const [rooms, setRooms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const searchParams = useSelector(selectSearchParams);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onSearch = (data) => {
		dispatch(setSearchParams(data));
	};

	useEffect(() => {
		requestServer('fetchRooms', PAGINATION_LIMIT, currentPage).then((roomsData) => {
			setRooms([...rooms, ...roomsData.res]);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, currentPage]);

	return (
		<div className={styles.main__box}>
			<div className={`flex ${styles.main__left}`}>
				<section className={styles.main__banner}>
					<img src="./DiagonAlley.jpg" alt="DiagonAlley" />
					<Title>Добро пожаловать в мир волшебства!</Title>
					<p className={styles.description}>
						Бар, гостиница, терминал прохода в Косой переулок - всё в одном
						котле!
					</p>
				</section>
				<section className={styles.rooms}>
					<Title>Доступные номера</Title>
					<div className={styles['rooms__list']}>
						{rooms.map(
							({
								id,
								imageUrl,
								title,
								description,
								type,
								price,
								reviews,
							}) => (
								<Link
									className={styles['rooms-item']}
									key={id + title}
									to={`/room/${id}`}
								>
									<div className={styles['rooms-item__thumb']}>
										<img src={imageUrl} />
										<span
											className={
												styles['rooms-item__thumb-showmore']
											}
										>
											Узнать больше &#129106;
										</span>
									</div>
									<div className={styles['rooms-item__about']}>
										<div className={styles['rooms-item__head']}>
											<p className={styles['rooms-item__type']}>
												{getRoomTypeLabel(type)}
											</p>
											<p className={styles['rooms-item__reviews']}>
												{reviews?.length} отзывов
											</p>
										</div>
										<p className={styles['rooms-item__title']}>
											{title}
										</p>
										<p className={styles['rooms-item__description']}>
											{description}
										</p>
										<p className={styles['rooms-item__price']}>
											<GalleonSVG />
											{price} галлеонов / сутки
										</p>
									</div>
								</Link>
							),
						)}
					</div>
					<Button
						style={{ margin: '50px auto 0' }}
						onClick={() => setCurrentPage((prev) => prev + 1)}
					>
						Загрузить еще
					</Button>
				</section>
			</div>
			<div className={styles.main__right}>
				<Form
					defaultValues={searchParams}
					resolver={yupResolver(searchRoomSchema)}
					onSubmit={onSearch}
				>
					<DateRange name="dateRange" />
					<Select
						name="roomType"
						options={roomTypeOptions}
						isMulti={true}
						placeholder="Тип комнаты"
					/>
					<GuestsCounter name="guests" />
					<PriceRange name="priceRange" />
				</Form>
			</div>
		</div>
	);
};

export default MainPage;
