import { Controller, useFormContext } from 'react-hook-form';
import styles from './PriceRange.module.scss';
import { Input } from '../Input/Input';

export const PriceRange = ({ name }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const MAX = 1000;

	const handleChange = (value, fieldOnChange) => {
		let newValue = parseInt(value, 10);
		if (isNaN(newValue) || newValue < 0) newValue = 0;
		if (newValue > MAX) newValue = MAX;
		fieldOnChange(newValue);
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={MAX}
			render={({ field }) => {
				const progressWidth = (field.value / MAX) * 100;

				return (
					<div>
						<label className={styles['price-label']}>
							Цена за сутки до{' '}
							<Input
								type="number"
								value={field.value}
								onChange={(e) =>
									handleChange(e.target.value, field.onChange)
								}
								min={0}
								max={MAX}
								style={{ width: `50%` }}
							/>
						</label>
						<div className={styles.wrapper}>
							<input
								className={styles['price-slider']}
								type="range"
								min={0}
								max={MAX}
								step={5}
								value={field.value}
								onChange={(e) =>
									handleChange(e.target.value, field.onChange)
								}
							/>
							<div
								className={styles['price-slider__progress']}
								style={{ width: `${progressWidth}%` }}
							/>
						</div>
						{!!errors[name] && (
							<p className={styles.error}>
								{String(errors[name]?.message)}
							</p>
						)}
					</div>
				);
			}}
		/>
	);
};
