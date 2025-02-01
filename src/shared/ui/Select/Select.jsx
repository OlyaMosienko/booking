import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import styles from './Select.module.scss';

export const Select = ({ name, options, defaultValue, ...rest }) => {
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
					<ReactSelect
						options={options}
						value={
							options.find((option) => option.value === field.value) || null
						}
						onChange={(selected) => field.onChange(selected.value || null)}
						onBlur={field.onBlur}
						classNamePrefix="form-select"
						{...rest}
					/>
				)}
			/>
			{!!errors[name] && (
				<p className={styles.error}>{String(errors[name]?.message)}</p>
			)}
		</>
	);
};
