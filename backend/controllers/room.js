const Room = require('../models/Room');
const Booking = require('../models/Booking');

// get list with search and pagination
async function getRooms(
    dateRange,
    roomType,
    guests,
    priceRange,
    limit = 4,
    page = 1
) {
    let filter = {};

    if (roomType && roomType.length > 0) {
        filter.type = { $in: roomType.split(',') };
    }

    if (guests) {
        filter['capacity.adults'] = { $gte: Number(guests.adults) || 0 };
        filter['capacity.children'] = { $gte: Number(guests.children) || 0 };
    }

    if (priceRange) {
        filter.price = { $lte: Number(priceRange) };
    }

    if (dateRange) {
        const dates = dateRange.split(',').map((date) => new Date(date));

        const [startDate, endDate] = dates;

        const bookedRooms = await Booking.distinct('room_id', {
            $and: [
                { checkInDate: { $lt: new Date(endDate) } },
                { checkOutDate: { $gt: new Date(startDate) } },
            ],
        });

        filter._id = { $nin: bookedRooms };
    }

    const [rooms, count] = await Promise.all([
        Room.find(filter)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ _id: 1 }),
        Room.countDocuments(filter),
    ]);

    return { rooms, lastPage: Math.ceil(count / Number(limit)) };
}

// get item
function getRoom(id) {
    return Room.findById(id).populate({ path: 'reviews', populate: 'author' });
}

// edit room
async function editRoom(id, room) {
    const newRoom = await Room.findByIdAndUpdate(id, room, {
        returnDocument: 'after',
    });

    await newRoom.populate({ path: 'reviews', populate: 'author' });

    return newRoom;
}

module.exports = {
    getRoom,
    getRooms,
    editRoom,
};
