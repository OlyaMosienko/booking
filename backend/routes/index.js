const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/rooms', require('./room'));
router.use('/users', require('./user'));
router.use('/favorites', require('./favorite'));
router.use('/bookings', require('./booking'));

module.exports = router;
