const express = require('express');
const { getRooms, getRoom, editRoom } = require('../controllers/room');
const { addReview, deleteReview } = require('../controllers/reviews');
const authenticated = require('../middlewares/authenticated');
const mapRoom = require('../helpers/mapRoom');
const mapReview = require('../helpers/mapReview');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
    try {
        const { rooms, lastPage } = await getRooms(
            req.query.dateRange,
            req.query.roomType,
            req.query.guests,
            req.query.priceRange,
            req.query.limit,
            req.query.page
        );

        res.send({ data: { lastPage, rooms: rooms.map(mapRoom) } });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

router.get('/:id', authenticated, async (req, res) => {
    try {
        const room = await getRoom(req.params.id);

        res.send({ data: mapRoom(room) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

router.post('/:id/reviews', authenticated, async (req, res) => {
    try {
        const newReview = await addReview(req.params.id, {
            content: req.body.content,
            author: req.user.id,
        });

        res.send({ data: mapReview(newReview) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

router.patch(
    '/:id',
    authenticated,
    hasRole([ROLES.ADMIN]),
    async (req, res) => {
        try {
            const room = await editRoom(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            });

            res.send({ data: mapRoom(room) });
        } catch (e) {
            res.send({ error: e.message || 'Unknown error' });
        }
    }
);

router.delete(
    '/:roomId/reviews/:reviewId',
    authenticated,
    hasRole([ROLES.ADMIN, ROLES.RESIDENT]),
    async (req, res) => {
        try {
            await deleteReview(req.params.roomId, req.params.reviewId);

            res.send({ error: null });
        } catch (e) {
            res.send({ error: e.message || 'Unknown error' });
        }
    }
);

module.exports = router;
