import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRole } from '@/entities/user/model/selectors';
import banner from '@/shared/assets/banner.webp';
import { ROLE } from '@/shared/lib';
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig';
import { Title } from '..';
import styles from './PrivateRoute.module.scss';

export const PrivateRoute = ({ children }) => {
	const userRole = useSelector(selectUserRole);
	const isAuth = userRole !== ROLE.GUEST;

	if (!isAuth) {
		return (
			<div className={styles.private}>
				<img src={banner} alt="" />
				<div className={styles.private__text}>
					<Title textAlign="center">Доступ ограничен</Title>
					<p className={styles.private__description}>
						Для просмотра содержимого{' '}
						<Link
							className={styles.private__link}
							to={RoutePaths[AppRoutes.SIGN_IN]}
						>
							войдите
						</Link>{' '}
						в систему. Если, конечно, <em>Алохомора</em> у вас до сих пор не
						работает без регистрации 🔑✨
					</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};
