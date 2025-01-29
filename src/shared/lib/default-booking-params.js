export const DEFAULT_BOOKING_PARAMS = {
	CHECK_IN_DATE: new Date(),
	CHECK_OUT_DATE: new Date(Date.now() + 1000 * 60 * 60 * 24),
	GUESTS: {
		adults: 1,
		children: 0,
	},
};
