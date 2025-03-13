module.exports = function (review) {
    return {
        id: review._id,
        content: review.content,
        author: review.author.login,
        publishedAt: review.createdAt.toLocaleDateString(),
    };
};
