const mongoose = require('mongoose');
const mapReview = require('./mapReview');

module.exports = function (room) {
    return {
        id: room._id,
        guests: room.capacity,
        reviews: room.reviews.map((review) =>
            mongoose.isObjectIdOrHexString(review) ? review : mapReview(review)
        ),
        title: room.title,
        imageUrl: room.image_url,
        description: room.description,
        type: room.type,
        price: room.price,
        amenities: room.amenities,
    };
};
