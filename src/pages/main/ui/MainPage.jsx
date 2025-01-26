import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button } from '@/shared/ui/Button/Button';
import { Title } from '@/shared/ui/Title/Title';
import { DateRange } from '@/shared/ui/DateRange/DateRange';
import styles from './MainPage.module.scss';
import { useServerRequest } from '@/shared/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PriceRange } from '@/shared/ui/PriceRange/PriceRange';
import { selectSearchParams } from '@/entities/search/model/selectors';
import { setSearchParams } from '@/entities/search/model/actions/setSearchParams';

const roomTypeOptions = [
	{ value: 'econom', label: 'Эконом' },
	{ value: 'standard', label: 'Стандарт' },
	{ value: 'lux', label: 'Люкс' },
	{ value: 'extra-lux', label: 'Министерский Люкс' },
];

export const MainPage = () => {
	const [rooms, setRooms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isOpen, setIsOpen] = useState(false);

	const PAGINATION_LIMIT = 4;

	const handleGuestChanging = () => {
		setIsOpen(!isOpen);
	};

	const searchParams = useSelector(selectSearchParams);

	const searchRoomSchema = yup.object().shape({
		dateRange: yup
			.array()
			.of(yup.date().required('Укажите дату'))
			.min(2, 'Укажите диапазон дат')
			.max(2, 'Укажите только начало и конец диапазона'),
		roomType: yup
			.string()
			.required('Выберите тип комнаты')
			.oneOf(
				['econom', 'standard', 'lux', 'extra-lux'],
				'Некорректное значение типа комнаты',
			),
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
		priceRange: yup
			.number()
			.required('Укажите максимальную цену')
			.min(0, 'Цена не может быть отрицательной')
			.max(1000, 'Цена не может превышать 1000'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: searchParams,
		resolver: yupResolver(searchRoomSchema),
	});

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

	const formError =
		errors?.dateRange?.map((date) => date.message) ||
		errors?.roomType?.message ||
		errors?.guests?.message ||
		errors?.guests?.adults?.message ||
		errors?.guests?.children?.message ||
		errors?.priceRange?.message;

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
				<form className={styles.form} onSubmit={handleSubmit(onSearch)}>
					<Controller
						name="dateRange"
						control={control}
						render={({ field }) => <DateRange {...field} />}
					/>
					<Controller
						name="roomType"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								options={roomTypeOptions}
								defaultValue={roomTypeOptions[1]}
								classNamePrefix="form-select"
								value={roomTypeOptions.find(
									(option) => option.value === field.value,
								)}
								onChange={(selected) => field.onChange(selected.value)}
							/>
						)}
					/>
					<Controller
						name="guests"
						control={control}
						defaultValue={{ adults: 1, children: 0 }}
						render={({ field }) => {
							const { value = { adults: 1, children: 0 }, onChange } =
								field;

							return (
								<div>
									<button
										className={styles.dropdown}
										type="button"
										onClick={handleGuestChanging}
									>
										{value.adults} взрослых - {value.children} детей
									</button>
									{isOpen && (
										<div className={styles.dropdown__inner}>
											<div className={styles.dropdown__row}>
												<div>Взрослые</div>
												<div className={styles.dropdown__counter}>
													<button
														type="button"
														onClick={() =>
															onChange({
																...value,
																adults: Math.max(
																	1,
																	value.adults - 1,
																),
															})
														}
														disabled={value.adults <= 1}
													>
														-
													</button>
													{value.adults}
													<button
														type="button"
														onClick={() =>
															onChange({
																...value,
																adults: value.adults + 1,
															})
														}
													>
														+
													</button>
												</div>
											</div>
											<div className={styles.dropdown__row}>
												<div>Дети</div>
												<div className={styles.dropdown__counter}>
													<button
														type="button"
														onClick={() =>
															onChange({
																...value,
																children: Math.max(
																	0,
																	value.children - 1,
																),
															})
														}
														disabled={value.children <= 0}
													>
														-
													</button>
													{value.children}
													<button
														type="button"
														onClick={() =>
															onChange({
																...value,
																children:
																	value.children + 1,
															})
														}
													>
														+
													</button>
												</div>
											</div>
											<div className={styles.dropdown__btns}>
												<Button
													type="button"
													onClick={() =>
														onChange({
															adults: 1,
															children: 0,
														})
													}
												>
													Сбросить
												</Button>
												<Button
													type="button"
													onClick={() =>
														handleGuestChanging(false)
													}
												>
													Применить
												</Button>
											</div>
										</div>
									)}
								</div>
							);
						}}
					/>
					<Controller
						name="priceRange"
						control={control}
						defaultValue={[1000, 1000]}
						render={({ field }) => (
							<PriceRange
								value={field.value}
								onChange={(values) => field.onChange(values)}
							/>
						)}
					/>
					<Button type="submit">Найти подходящий номер</Button>
					{formError ? formError : null}
				</form>
			</div>
		</div>
	);
};
