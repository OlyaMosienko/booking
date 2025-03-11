const mongoose = require('mongoose');
const mapRoom = require('./mapRoom');

module.exports = function (favorite) {
    return {
        id: favorite._id,
        room: mongoose.isObjectIdOrHexString(favorite.room_id)
            ? favorite.room_id
            : mapRoom(favorite.room_id),
        userId: favorite.user_id,
    };
};
