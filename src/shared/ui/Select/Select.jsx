import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import styles from './Select.module.scss';

export const Select = ({
	name,
	options,
	defaultValue = [],
	isMulti = false,
	...rest
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field }) => (
					<div className={styles.select}>
						<ReactSelect
							options={options}
							value={
								isMulti
									? options.filter((option) =>
											field.value?.includes(option.value),
										)
									: options.find(
											(option) => option.value === field.value,
										) || null
							}
							onChange={(selected) =>
								field.onChange(
									isMulti
										? selected.map((opt) => opt.value)
										: selected?.value || null,
								)
							}
							onBlur={field.onBlur}
							classNamePrefix="form-select"
							isMulti={isMulti}
							{...rest}
							noOptionsMessage={() => 'Выбраны все доступные типы комнат'}
						/>
						{!!errors[name] && (
							<p className="error">{String(errors[name]?.message)}</p>
						)}
					</div>
				)}
			/>
		</>
	);
};
