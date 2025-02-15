import { useEffect, useState } from 'react';
import { useServerRequest } from '@/shared/hooks';
import { PAGINATION_LIMIT } from '@/shared/lib';
import { Button, Title } from '@/shared/ui';
import styles from './MainPage.module.scss';
import { Room } from '@/entities/room';
import { SearchRoomForm } from '@/features/search/ui/SearchRoomForm';

const MainPage = () => {
	const [rooms, setRooms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const requestServer = useServerRequest();

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
				<SearchRoomForm />
			</div>
		</div>
	);
};

export default MainPage;
