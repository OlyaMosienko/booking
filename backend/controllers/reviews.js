const Review = require('../models/Review');
const Room = require('../models/Room');

// add
async function addReview(roomId, review) {
    const newReview = await Review.create(review);

    await Room.findByIdAndUpdate(roomId, { $push: { reviews: newReview } });

    await newReview.populate('author');

    return newReview;
}

// delete
async function deleteReview(roomId, reviewId) {
    await Review.deleteOne({ _id: reviewId });
    await Room.findByIdAndUpdate(roomId, { $pull: { reviews: reviewId } });
}

module.exports = { addReview, deleteReview };
