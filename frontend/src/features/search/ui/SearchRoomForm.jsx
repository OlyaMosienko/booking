import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectSearchParams } from '@/entities/search/model/selectors';
import { setSearchParams } from '@/entities/search/model/actions';
import { roomTypeOptions } from '@/entities/room/model/roomTypeOptions';
import { searchRoomSchema } from '../model/searchRoomSchema';
import { DateRange, Form, GuestsCounter, PriceRange, Select } from '@/shared/ui';

export const SearchRoomForm = () => {
	const searchParams = useSelector(selectSearchParams);
	const dispatch = useDispatch();

	const onSearch = (data) => {
		dispatch(setSearchParams(data));
	};

	return (
		<Form
			defaultValues={searchParams}
			resolver={yupResolver(searchRoomSchema)}
			onSubmit={onSearch}
			buttonText="Найти подходящий номер"
		>
			<DateRange name="dateRange" />
			<Select
				name="roomType"
				options={roomTypeOptions}
				isMulti={true}
				placeholder="Тип комнаты"
			/>
			<GuestsCounter name="guests" />
			<PriceRange name="priceRange" />
		</Form>
	);
};
