import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button } from '@/shared/ui/Button/Button';
import { Title } from '@/shared/ui/Title/Title';
import { DateRange } from '@/shared/ui/DateRange/DateRange';
import styles from './MainPage.module.scss';
import { useServerRequest } from '@/shared/hooks';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
	const [currentPage, setCurrentPage] = useState(1);

	const [isOpen, setIsOpen] = useState(false);
	const [adultCount, setAdultCount] = useState(1);
	const [childCount, setChildCount] = useState(0);

	const PAGINATION_LIMIT = 4;

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

	const searchRoomSchema = yup.object().shape({
		dateRange: yup
			.array()
			.of(yup.date().required('Укажите дату'))
			.min(2, 'Укажите диапазон дат')
			.max(2, 'Укажите только начало и конец диапазона'),
		availability: yup
			.string()
			.required('Выберите доступность')
			.oneOf(['available', 'unavailable'], 'Некорректное значение доступности'),
		roomType: yup
			.string()
			.required('Выберите тип комнаты')
			.oneOf(['standard', 'deluxe', 'suite'], 'Некорректное значение типа комнаты'),
		guests: yup.object().shape({
			adults: yup
				.number()
				.required('Укажите количество взрослых')
				.min(1, 'Минимум 1 взрослый')
				.max(10, 'Максимум 10 взрослых'),
			children: yup
				.number()
				.min(0, 'Количество детей не может быть отрицательным')
				.max(10, 'Максимум 10 детей'),
		}),
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			dateRange: [],
			availability: 'available',
			roomType: 'стандарт',
			guests: {
				adults: 1,
				children: 0,
			},
		},
		resolver: yupResolver(searchRoomSchema),
	});

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onSearch = () => {};

	useEffect(() => {
		requestServer('fetchRooms', PAGINATION_LIMIT, currentPage).then((roomsData) => {
			setRooms([...rooms, ...roomsData.res]);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, requestServer, currentPage]);

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
						</div>
					))}
				</section>
				<Button onClick={() => setCurrentPage((prev) => prev + 1)}>
					Загрузить еще
				</Button>
			</div>
			<div className={styles.main__right}>
				<form className={styles.form} onSubmit={handleSubmit(onSearch)}>
					<DateRange {...register('dateRange')} />
					<Select
						options={availabilityOptions}
						defaultValue={availabilityOptions[1]}
						classNamePrefix="form-select"
						{...register('availability')}
					/>
					<Select
						options={roomTypeOptions}
						defaultValue={roomTypeOptions[1]}
						classNamePrefix="form-select"
						{...register('roomType')}
					/>
					<div>
						<button
							className={styles.dropdown}
							type="button"
							onClick={handleGuestChanging}
							{...register('guests')}
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
											пример: 1 взрослый - 2 детей
											*/
									>
										Применить
									</Button>
								</div>
							</div>
						)}
					</div>
					<Button>Найти подходящий номер</Button>
					{errors && <div>{errors[0]}</div>}
				</form>
			</div>
		</div>
	);
};
