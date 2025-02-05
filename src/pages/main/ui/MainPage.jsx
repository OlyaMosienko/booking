import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { searchRoomSchema } from '../lib/searchRoomSchema';
import styles from './MainPage.module.scss';
import { Room } from '@/entities/room';

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
						{rooms.map((room) => (
							<Room key={room.id} room={room} />
						))}
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
