const express = require('express');
const {
    getUserBookings,
    addBooking,
    removeBooking,
    getAllBookings,
} = require('../controllers/booking');
const mapBooking = require('../helpers/mapBooking');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
    try {
        const bookings = await getUserBookings(req.user.id);

        res.send({ data: bookings.map(mapBooking) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});
router.post('/', authenticated, async (req, res) => {
    try {
        const newBooking = await addBooking(req.user.id, req.body);

        res.send({ data: mapBooking(newBooking) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});
router.delete(
    '/:id',
    authenticated,
    hasRole([ROLES.ADMIN, ROLES.RESIDENT]),
    async (req, res) => {
        try {
            await removeBooking(req.user.id, req.params.id);

            res.send({ message: 'Бронирование отменено!' });
        } catch (e) {
            res.send({ error: e.message || 'Unknown error' });
        }
    }
);
router.get('/all', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const bookings = await getAllBookings();

        res.send({ data: bookings.map(mapBooking) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

module.exports = router;
