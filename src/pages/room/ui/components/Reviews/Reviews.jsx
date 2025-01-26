import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '@/shared/ui/Title/Title';
import { Button } from '@/shared/ui/Button/Button';
import { addReviewsAsync, removeReviewsAsync } from '@/entities/room/model/actions';
import { selectUserId } from '@/entities/user/model/selectors';
import { useServerRequest } from '@/shared/hooks';
import styles from './Reviews.module.scss';

export const Reviews = ({ roomId, reviews }) => {
	const [newReview, setNewReview] = useState('');
	const userId = useSelector(selectUserId);
	// const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewReviewAdd = (userId, roomId, content) => {
		dispatch(addReviewsAsync(requestServer, userId, roomId, content));
		setNewReview('');
	};

	const onReviewRemove = (id) =>
		dispatch(removeReviewsAsync(requestServer, roomId, id));

	return (
		<div className={styles.reviews}>
			<Title>Отзывы</Title>
			<div className={styles.reviews__list}>
				{reviews?.length
					? reviews.map(({ id, content, author, publishedAt }) => (
							<div key={id} className={styles.reviews__item}>
								<div className={styles['reviews-item__head']}>
									<div>{author}</div>
									<div>
										{publishedAt}
										<button onClick={() => onReviewRemove(id)}>
											🗑
										</button>
									</div>
								</div>
								<div className={styles['reviews-item__body']}>
									{content}
								</div>
							</div>
						))
					: 'Пока здесь нет отзывов, но ты можешь оставить первый!'}
			</div>
			<div>
				<textarea
					name="review"
					value={newReview}
					onChange={({ target }) => setNewReview(target.value)}
					placeholder="Оставьте свой отзыв"
				></textarea>
				<Button onClick={() => onNewReviewAdd(userId, roomId, newReview)}>
					Оставить отзыв
				</Button>
			</div>
		</div>
	);
};
