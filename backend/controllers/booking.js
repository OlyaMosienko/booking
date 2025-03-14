const Booking = require('../models/Booking');

// add booking
async function addBooking(
    userId,
    { roomId, checkInDate, checkOutDate, guests }
) {
    if (!roomId || !checkInDate || !checkOutDate || !guests) {
        throw new Error('Все поля обязательны');
    }

    const newBooking = await Booking.create({
        user_id: userId,
        room_id: roomId,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guests,
    });

    return newBooking;
}

// remove booking
async function removeBooking(userId, bookingId) {
    const booking = await Booking.findOne({ _id: bookingId, user_id: userId });

    if (!booking) {
        throw new Error('Бронирование не найдено');
    }

    await Booking.deleteOne({ _id: bookingId });
}

// get user's bookings list
async function getUserBookings(userId) {
    return await Booking.find({ user_id: userId }).populate('room_id');
}

// get all bookings list
async function getAllBookings() {
    const bookings = await Booking.find().populate('room_id user_id');

    return bookings;
}

module.exports = { addBooking, removeBooking, getUserBookings, getAllBookings };
