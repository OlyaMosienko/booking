import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '@/shared/ui/Title/Title';
import { Button } from '@/shared/ui/Button/Button';
import { addReviewsAsync, removeReviewsAsync } from '@/entities/room/model/actions';
import { selectUserId, selectUserLogin } from '@/entities/user/model/selectors';
import { useServerRequest } from '@/shared/hooks';
import styles from './Reviews.module.scss';
import { useModal } from '@/app/providers/ModalProvider/lib/useModal';
import { useToast } from '@/app/providers/ToastProvider/lib/useToast';
import TrashSVG from '@/shared/assets/trash.svg?react';

export const Reviews = ({ roomId, reviews }) => {
	const [newReview, setNewReview] = useState('');
	const [isNewReviewFormOpen, setIsNewReviewFormOpen] = useState(false);
	const userId = useSelector(selectUserId);
	const userLogin = useSelector(selectUserLogin);
	// const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const { showToast } = useToast();

	const onNewReviewAdd = (userId, roomId, content) => {
		dispatch(addReviewsAsync(requestServer, userId, roomId, content));
		setNewReview('');
		setIsNewReviewFormOpen(!isNewReviewFormOpen);
	};

	const { openModal, closeModal } = useModal();

	const onReviewRemove = (id) => {
		dispatch(removeReviewsAsync(requestServer, roomId, id));
		closeModal();
		showToast({ message: 'Комментарий удалён!', type: 'success' });
	};

	return (
		<div className={styles.reviews}>
			<Title>Отзывы</Title>
			<div className={styles.reviews__list}>
				{reviews?.length ? (
					reviews.map(({ id, content, author, publishedAt }) => (
						<div key={id} className={styles.reviews__item}>
							<div className={styles['reviews-item__head']}>
								<span>{author}</span>
								<div className={styles['reviews-item__head-left']}>
									{publishedAt}
									{userLogin === author && (
										<button
											className={styles['reviews-item__delete']}
											onClick={() =>
												openModal(
													<div>
														<p className="modal__title">
															Вы действительно хотите
															удалить комментарий?
														</p>
														<div className="modal__btns">
															<Button
																onClick={() =>
																	onReviewRemove(id)
																}
															>
																Да
															</Button>
															<Button onClick={closeModal}>
																Нет
															</Button>
														</div>
													</div>,
												)
											}
										>
											<TrashSVG />
										</button>
									)}
								</div>
							</div>
							<div
								className={styles['reviews-item__body']}
								// contentEditable={userLogin === author}
							>
								{content}
							</div>
						</div>
					))
				) : (
					<p className={styles.reviews__empty}>Пока здесь нет отзывов!</p>
				)}
			</div>
			{isNewReviewFormOpen && (
				<div className={styles.reviews__form}>
					<textarea
						name="review"
						rows="3"
						value={newReview}
						onChange={({ target }) => setNewReview(target.value)}
						placeholder="Опишите ваши впечатления от пребывания в этом номере"
					></textarea>
					<Button onClick={() => onNewReviewAdd(userId, roomId, newReview)}>
						Отправить
					</Button>
				</div>
			)}
			<Button onClick={() => setIsNewReviewFormOpen(!isNewReviewFormOpen)}>
				{isNewReviewFormOpen ? 'Написать позже' : 'Оставить отзыв'}
			</Button>
		</div>
	);
};
