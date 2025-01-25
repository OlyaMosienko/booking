import { useState, useEffect } from 'react';
import styles from './PriceRange.module.scss';
import { Input } from '../Input/Input';

export const PriceRange = ({ value, onChange }) => {
	const MIN = 0;
	const MAX = 1000;

	const [upperValue, setUpperValue] = useState(value);

	useEffect(() => {
		setUpperValue(value);
	}, [value]);

	const handleSliderChange = ({ target }) => {
		const newValue = parseInt(target.value, 10);
		setUpperValue(newValue);
		onChange(newValue);
	};

	const handleInputChange = ({ target }) => {
		let newValue = target.value.trim();

		if (newValue === '') {
			newValue = MIN;
		} else {
			newValue = parseInt(newValue, 10);
			if (isNaN(newValue)) {
				newValue = MIN;
			} else if (newValue < MIN) {
				newValue = MIN;
			} else if (newValue > MAX) {
				newValue = MAX;
			}
		}

		setUpperValue(newValue);
		onChange(newValue);
	};

	const progressWidth = (upperValue / MAX) * 100;

	return (
		<div>
			<label className={styles['price-label']}>
				Цена за сутки до{' '}
				<Input
					type="number"
					value={upperValue}
					onChange={handleInputChange}
					min={MIN}
					max={MAX}
					style={{ width: `50%` }}
				/>
			</label>
			<div className={styles.wrapper}>
				<input
					className={styles['price-slider']}
					type="range"
					min={MIN}
					max={MAX}
					step={5}
					value={upperValue}
					onChange={handleSliderChange}
				/>
				<div
					className={styles['price-slider__progress']}
					style={{
						width: `${progressWidth}%`,
					}}
				/>
			</div>
		</div>
	);
};
