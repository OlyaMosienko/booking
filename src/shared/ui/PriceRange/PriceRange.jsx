import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './PriceRange.module.scss';
import { Input } from '../Input/Input';

export const PriceRange = ({ name, max = 1000 }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const [upperValue, setUpperValue] = useState(max);

	useEffect(() => {
		setUpperValue(max);
	}, [max]);

	const handleChange = (newValue) => {
		newValue = parseInt(newValue, 10);

		if (isNaN(newValue) || newValue < 0) {
			newValue = 0;
		} else if (newValue > max) {
			newValue = max;
		}

		setUpperValue(newValue);
		return newValue;
	};

	const progressWidth = (upperValue / max) * 100;

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={max}
			render={({ field }) => (
				<div>
					<label className={styles['price-label']}>
						Цена за сутки до{' '}
						<Input
							type="number"
							value={upperValue}
							onChange={(e) => field.onChange(handleChange(e.target.value))}
							min={0}
							max={max}
							style={{ width: `50%` }}
						/>
					</label>
					<div className={styles.wrapper}>
						<input
							className={styles['price-slider']}
							type="range"
							min={0}
							max={max}
							step={5}
							value={upperValue}
							onChange={(e) => field.onChange(handleChange(e.target.value))}
						/>
						<div
							className={styles['price-slider__progress']}
							style={{
								width: `${progressWidth}%`,
							}}
						/>
					</div>
					{!!errors[name] && (
						<p className={styles.error}>{String(errors[name]?.message)}</p>
					)}
				</div>
			)}
		/>
	);
};
