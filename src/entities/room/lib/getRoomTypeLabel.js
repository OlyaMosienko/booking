import { roomTypeOptions } from '../model/roomTypeOptions';

export const getRoomTypeLabel = (value) => {
	const option = roomTypeOptions.find((opt) => opt.value === value);
	return option ? option.label : 'Неизвестный тип';
};
