const express = require('express');
const { getUsers } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const hasRole = require('../middlewares/hasRole');
const authenticated = require('../middlewares/authenticated');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const users = await getUsers();

        res.send({ data: users.map(mapUser) });
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' });
    }
});

module.exports = router;
