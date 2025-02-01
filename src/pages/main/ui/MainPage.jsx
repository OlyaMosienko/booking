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
import { searchRoomSchema } from '../lib/searchRoomSchema';
import styles from './MainPage.module.scss';

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
				<section className={styles.main__rooms}>
					{rooms.map(({ id, imageUrl, title }) => (
						<div key={id + title}>
							<Link to={`/room/${id}`}>
								<div>
									<img src={imageUrl} />
								</div>
							</Link>
							<p>{title}</p>
						</div>
					))}
				</section>
				<Button onClick={() => setCurrentPage((prev) => prev + 1)}>
					Загрузить еще
				</Button>
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
						defaultValue={roomTypeOptions[1]}
						isMulti={true}
						placeholder="Тип комнаты"
					/>
					<GuestsCounter name="guests" />
					<PriceRange name="priceRange" />
					<Button type="submit">Найти подходящий номер</Button>
				</Form>
			</div>
		</div>
	);
};

export default MainPage;
