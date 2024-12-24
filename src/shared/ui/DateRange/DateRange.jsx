import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import './DateRange.scss';

registerLocale('ru', ru);

export const DateRange = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		console.log('start:', new Date(start).toLocaleDateString());
		console.log('end:', new Date(end).toLocaleDateString());
	};

	return (
		<div>
			<DatePicker
				startDate={startDate}
				endDate={endDate}
				onChange={onChange}
				dateFormat="dd MMMM"
				selectsRange={true}
				isClearable={true}
				placeholderText="Даты поездки"
				locale="ru"
			/>
		</div>
	);
};
