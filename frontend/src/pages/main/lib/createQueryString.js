import { DEFAULT_BOOKING_PARAMS } from '@/shared/lib';

export function createQueryString(
	{ dateRange, roomType, guests, priceRange },
	limit,
	page,
) {
	const params = [];

	const checkIn =
		dateRange?.[0] ||
		DEFAULT_BOOKING_PARAMS.CHECK_IN_DATE.toISOString().split('T')[0];
	const checkOut =
		dateRange?.[1] ||
		DEFAULT_BOOKING_PARAMS.CHECK_OUT_DATE.toISOString().split('T')[0];
	params.push(`dateRange=${checkIn},${checkOut}`);

	if (roomType?.length) {
		params.push(`roomType=${roomType.join(',')}`);
	}

	const adults = guests?.adults ?? DEFAULT_BOOKING_PARAMS.GUESTS.adults;
	const children = guests?.children ?? DEFAULT_BOOKING_PARAMS.GUESTS.children;
	params.push(`guests=${adults},${children}`);

	if (priceRange) {
		params.push(`priceRange=${priceRange}`);
	}

	params.push(`limit=${limit}`);
	params.push(`page=${page}`);

	return `/api/rooms?${params.join('&')}`;
}
