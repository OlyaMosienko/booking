import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PAGINATION_LIMIT, request } from '@/shared/lib';
import { Button, Loader, Title } from '@/shared/ui';
import { Room } from '@/entities/room';
import { selectSearchParams } from '@/entities/search/model/selectors';
import { SearchRoomForm } from '@/features/search/ui/SearchRoomForm';
import { createQueryString } from '../lib';
import styles from './MainPage.module.scss';

const MainPage = () => {
	const [rooms, setRooms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = useSelector(selectSearchParams);

	useEffect(() => {
		setIsLoading(true);

		request(createQueryString(searchParams, PAGINATION_LIMIT, currentPage))
			.then(({ data: { lastPage, rooms: loadedRooms } }) => {
				setLastPage(lastPage || 1);
				setRooms((prevRooms) => [...prevRooms, ...loadedRooms]);
			})
			.finally(() => setIsLoading(false));
	}, [searchParams, currentPage]);

	const resetRooms = () => {
		setRooms([]);
		setLastPage(1);
	};

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
					{isLoading && <Loader minSize={true} />}
					{lastPage === currentPage ? null : (
						<Button
							style={{ margin: '50px auto 0' }}
							onClick={() => setCurrentPage((prev) => prev + 1)}
						>
							Загрузить еще
						</Button>
					)}
				</section>
			</div>
			<div className={styles.main__right}>
				<SearchRoomForm resetRooms={resetRooms} />
			</div>
		</div>
	);
};

export default MainPage;
