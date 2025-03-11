const express = require('express');
const { toggleFavorite, getFavorites } = require('../controllers/favorite');
const mapFavorite = require('../helpers/mapFavorite');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
    try {
        const favorites = await getFavorites(req.user.id);

        res.send({ data: favorites.map(mapFavorite) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});
router.post('/', authenticated, async (req, res) => {
    try {
        const result = await toggleFavorite(req.user.id, req.body.roomId);

        res.send({ data: result });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

module.exports = router;
