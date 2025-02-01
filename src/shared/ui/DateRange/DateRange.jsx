import { forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { ru } from 'date-fns/locale/ru';
import './DateRange.scss';

registerLocale('ru', ru);

export const DateRange = forwardRef(({ name, value = [], ...props }, ref) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<Controller
				name={name}
				control={control}
				defaultValue={value}
				render={({ field: { onChange, value } }) => {
					const handleChange = (dates) => {
						onChange(dates);
					};

					return (
						<div>
							<DatePicker
								startDate={value[0]}
								endDate={value[1]}
								minDate={new Date()}
								onChange={handleChange}
								dateFormat="dd MMMM"
								selectsRange={true}
								isClearable={true}
								placeholderText="Даты поездки"
								locale="ru"
								ref={ref}
								{...props}
							/>
							{!!errors[name] && (
								<p className="error">{String(errors[name]?.message)}</p>
							)}
						</div>
					);
				}}
			/>
		</div>
	);
});

DateRange.displayName = 'DateRange';
