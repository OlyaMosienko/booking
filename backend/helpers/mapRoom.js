module.exports = function (room) {
    return {
        id: room._id,
        guests: room.capacity,
        reviews: room.reviews,
        title: room.title,
        imageUrl: room.image_url,
        description: room.description,
        type: room.type,
        price: room.price,
        amenities: room.amenities,
    };
};
