import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '../Button/Button';
import styles from './GuestsCounter.module.scss';

export const GuestsCounter = ({ name }) => {
	const { control } = useFormContext();

	const [isOpen, setIsOpen] = useState(false);

	const handleGuestChanging = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={{ adults: 1, children: 0 }}
			render={({ field }) => {
				const { value = { adults: 1, children: 0 }, onChange } = field;

				return (
					<div>
						<button
							className={styles.dropdown}
							type="button"
							onClick={handleGuestChanging}
						>
							{value.adults} взрослых — {value.children} детей
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
													adults: Math.max(1, value.adults - 1),
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
													children: value.children + 1,
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
										onClick={() => handleGuestChanging(false)}
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
	);
};
