const mapFavorite = require('../helpers/mapFavorite');
const Favorite = require('../models/Favorite');

// add/remove favorite
async function toggleFavorite(userId, roomId) {
    const existingFavorite = await Favorite.findOne({
        user_id: userId,
        room_id: roomId,
    });

    if (existingFavorite) {
        await Favorite.deleteOne({ _id: existingFavorite._id });

        return { message: 'Removed from favorites' };
    } else {
        const newFavorite = await Favorite.create({
            user_id: userId,
            room_id: roomId,
        });

        return {
            message: 'Added to favorites',
            data: mapFavorite(newFavorite),
        };
    }
}

// get all user's favorites
async function getFavorites(userId) {
    const favorites = await Favorite.find({ user_id: userId }).populate(
        'room_id'
    );

    return favorites;
}

module.exports = { toggleFavorite, getFavorites };
