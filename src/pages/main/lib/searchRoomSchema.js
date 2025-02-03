import * as yup from 'yup';

export const searchRoomSchema = yup.object().shape({
	dateRange: yup
		.array()
		.of(yup.date().required('Укажите дату начала и конца'))
		.min(2, 'Укажите диапазон дат')
		.max(2, 'Укажите только начало и конец диапазона'),
	roomType: yup
		.array()
		.of(
			yup
				.string()
				.oneOf(
					['econom', 'standard', 'lux', 'extra-lux'],
					'Некорректное значение типа комнаты',
				),
		)
		.min(1, 'Выберите хотя бы один тип комнаты')
		.required('Выберите хотя бы один тип комнаты'),

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
