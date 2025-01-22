import { forwardRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import './DateRange.scss';

registerLocale('ru', ru);

export const DateRange = forwardRef(({ value = [], onChange }, ref) => {
	const [startDate, setStartDate] = useState(value[0] || null);
	const [endDate, setEndDate] = useState(value[1] || null);

	const handleChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		onChange(dates);
	};

	return (
		<div>
			<DatePicker
				startDate={startDate}
				endDate={endDate}
				onChange={handleChange}
				dateFormat="dd MMMM"
				selectsRange={true}
				isClearable={true}
				placeholderText="Даты поездки"
				locale="ru"
				ref={ref}
			/>
		</div>
	);
});

DateRange.displayName = 'DateRange';
