import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button } from '@/shared/ui/Button/Button';
import { Title } from '@/shared/ui/Title/Title';
import { DateRange } from '@/shared/ui/DateRange/DateRange';
import styles from './MainPage.module.scss';
import { useServerRequest } from '@/shared/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavoriteAsync } from '@/entities/favorites/model/actions/removeFavoriteAsync';
import { addFavoriteAsync } from '@/entities/favorites/model/actions/addFavoriteAsync';
import { selectUserId } from '@/entities/user/model/selectors';
import { Link } from 'react-router-dom';
import { getFavoritesDetails } from '@/entities/favorites/model/actions/getFavoritesDetails';

const availabilityOptions = [
	{ value: 'false', label: 'Занято' },
	{ value: 'true', label: 'Свободно' },
];
const roomTypeOptions = [
	{ value: 'эконом', label: 'Эконом' },
	{ value: 'стандарт', label: 'Стандарт' },
	{ value: 'люкс', label: 'Люкс' },
	{ value: 'министерский люкс', label: 'Министерский Люкс' },
];

export const MainPage = () => {
	const [rooms, setRooms] = useState([]);
	const [favorites, setFavorites] = useState([]);

	const [isOpen, setIsOpen] = useState(false);
	const [adultCount, setAdultCount] = useState(1);
	const [childCount, setChildCount] = useState(0);

	const incrementAdult = () => {
		setAdultCount(adultCount + 1);
	};
	const incrementChild = () => {
		setChildCount(childCount + 1);
	};
	const decrementAdult = () => {
		setAdultCount(adultCount - 1);
	};
	const decrementChild = () => {
		setChildCount(childCount - 1);
	};

	const handleGuestChanging = () => {
		setIsOpen(!isOpen);
	};

	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchRooms').then((roomsData) => {
			setRooms(roomsData.res);
		});

		if (userId) {
			dispatch(getFavoritesDetails(requestServer, userId)).then((favoritesData) => {
				setFavorites(favoritesData);
			});
		}
	}, [dispatch, requestServer, userId]);

	const handleFavoriteToggle = (id) => {
		if (favorites?.some((fav) => fav.roomId === id)) {
			const favorite = favorites.find((fav) => fav.roomId === id);

			dispatch(removeFavoriteAsync(requestServer, userId, favorite.id));
		} else {
			dispatch(addFavoriteAsync(requestServer, userId, id));
		}
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
				<section className={styles.main__rooms}>
					{rooms.map(({ id, imageUrl, title }) => (
						<div key={id}>
							<Link to={`/room/${id}`}>
								<div>
									<img src={imageUrl} />
								</div>
							</Link>
							<p>{title}</p>
							<button onClick={() => handleFavoriteToggle(id)}>
								{favorites?.some((fav) => fav.roomId === id)
									? 'Убрать из избранного'
									: 'Добавить в избранное'}
							</button>
						</div>
					))}
				</section>
			</div>
			<div className={styles.main__right}>
				<form className={styles.form}>
					<DateRange />
					<Select
						options={availabilityOptions}
						defaultValue={availabilityOptions[1]}
						classNamePrefix="form-select"
					/>
					<Select
						options={roomTypeOptions}
						defaultValue={roomTypeOptions[1]}
						classNamePrefix="form-select"
					/>
					<div>
						<button
							className={styles.dropdown}
							type="button"
							onClick={handleGuestChanging}
						>
							1 гость
						</button>
						{isOpen && (
							<div className={styles.dropdown__inner}>
								<div className={styles.dropdown__row}>
									<div>
										Взрослые
										<span>от 18 лет</span>
									</div>
									<div className={styles.dropdown__counter}>
										<button
											type="button"
											onClick={decrementAdult}
											disabled={adultCount <= 1}
										>
											-
										</button>
										{adultCount}
										<button type="button" onClick={incrementAdult}>
											+
										</button>
									</div>
								</div>
								<div className={styles.dropdown__row}>
									<div>
										Дети
										<span>до 18 лет</span>
									</div>
									<div className={styles.dropdown__counter}>
										<button
											type="button"
											onClick={decrementChild}
											disabled={childCount < 1}
										>
											-
										</button>
										{childCount}
										<button type="button" onClick={incrementChild}>
											+
										</button>
									</div>
								</div>
								<div className={styles.dropdown__btns}>
									<Button
										type="button"
										// TODO сбросить до 1 взрослый и 0 детей
									>
										Сбросить
									</Button>
									<Button
										type="button"
										/*
											TODO onClick записать кол-во взр
											если есть дети то добавить кол-во детей,
											пример: 1 взролый - 2 детей
											*/
									>
										Применить
									</Button>
								</div>
							</div>
						)}
					</div>
					<Button>Найти подходящий номер</Button>
				</form>
			</div>
		</div>
	);
};
