const mongoose = require('mongoose');

const FavoriteSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        room_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
    },
    { timestamps: true }
);

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
