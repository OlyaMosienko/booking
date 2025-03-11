const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema(
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
        checkInDate: {
            type: Date,
            required: true,
        },
        checkOutDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > this.checkInDate;
                },
                message: 'Дата выезда должна быть позже даты заезда',
            },
        },
        guests: {
            adults: {
                type: Number,
                required: true,
                min: [1, 'Должен быть хотя бы 1 взрослый'],
            },
            children: {
                type: Number,
                required: true,
                min: [0, 'Количество детей не может быть отрицательным'],
            },
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
