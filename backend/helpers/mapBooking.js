const mongoose = require('mongoose');

module.exports = function (booking) {
    return {
        id: booking._id,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        guests: booking.guests,
        room: mongoose.isObjectIdOrHexString(booking.room_id)
            ? booking.room_id
            : {
                  id: booking.room_id._id,
                  imageUrl: booking.room_id.image_url,
                  title: booking.room_id.title,
                  price: booking.room_id.price,
              },
        user: mongoose.isObjectIdOrHexString(booking.user_id)
            ? booking.user_id
            : { login: booking.user_id.login },
    };
};
