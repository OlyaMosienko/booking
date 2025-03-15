import { Button } from '@/shared/ui';

export const BookingModal = ({ bookingData, price, onConfirm, onCancel }) => {
	const daysCount =
		(bookingData.checkOutDate - bookingData.checkInDate) / (1000 * 60 * 60 * 24);
	const totalCost =
		daysCount *
		price *
		(bookingData.guests.adults + bookingData.guests.children * 0.5);

	return (
		<div>
			<p className="modal__title">Хотите забронировать этот номер?</p>
			<p>
				Дата:{' '}
				{`${bookingData.checkInDate.toLocaleDateString()} - ${bookingData.checkOutDate.toLocaleDateString()}`}
			</p>
			<p>
				Количество гостей:{' '}
				{`${bookingData.guests.adults} взрослых - ${bookingData.guests.children} детей`}
			</p>
			<p>Стоимость за сутки: {price}</p>
			<p>Итого: {totalCost.toFixed(0)}</p>
			<div className="modal__btns">
				<Button onClick={onConfirm}>Да</Button>
				<Button onClick={onCancel}>Посмотрю еще</Button>
			</div>
		</div>
	);
};
