import { Link } from 'react-router-dom';
import { Title } from '@/shared/ui';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
	return (
		<div className={styles['not-found']}>
			<img src="../../../../src/shared/assets/diagonalley.gif" alt="Касалея!" />
			<div className={styles['not-found__text']}>
				<Title textAlign="center">Заблудился?</Title>
				<p className={styles['not-found__description']}>
					«Если я в чем-то сомневаюсь, я возвращаюсь к
					началу»&nbsp;–&nbsp;Альбус&nbsp;Дамблдор
				</p>
			</div>
			<Link className={styles['not-found__link']} to="/">
				Главная
			</Link>
		</div>
	);
};
