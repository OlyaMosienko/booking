export const transformReview = (dbReview) => ({
	id: dbReview.id,
	roomId: dbReview.room_id,
	authorId: dbReview.author_id,
	content: dbReview.content,
	publishedAt: dbReview.published_at,
});
