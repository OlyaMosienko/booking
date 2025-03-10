const mongoose = require('mongoose');
const validator = require('validator');

const RoomSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
            validate: {
                validator: validator.isURL,
                message: 'Image should be a valid url',
            },
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['econom', 'standard', 'lux', 'extra-lux'],
        },
        price: {
            type: Number,
            required: true,
        },
        amenities: {
            type: [String],
            default: [],
        },
        capacity: {
            adults: {
                type: Number,
                required: true,
            },
            children: {
                type: Number,
                required: true,
            },
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reviews',
            },
        ],
    },
    { timestamps: true }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = { Room };
