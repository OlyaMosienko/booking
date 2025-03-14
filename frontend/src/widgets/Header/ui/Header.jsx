import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/entities/user/model/actions';
import { selectUserLogin, selectUserRole } from '@/entities/user/model/selectors';
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig';
import { Button, Logo } from '@/shared/ui';
import { ROLE } from '@/shared/lib';
import LogoutIcon from '@/shared/assets/log-out.svg?react';
import styles from './Header.module.scss';

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const userLogin = useSelector(selectUserLogin);

	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.header__box}>
					<Logo />
					<nav className={styles.header__nav}>
						{roleId === ROLE.GUEST ? null : (
							<>
								<Link
									to={RoutePaths[AppRoutes.ABOUT]}
									className={styles.header__link}
								>
									О гостинице
								</Link>
								<Link
									to={RoutePaths[AppRoutes.FAVORITES]}
									className={styles.header__link}
								>
									Избранное
								</Link>
								<Link
									to={RoutePaths[AppRoutes.BOOKINGS]}
									className={styles.header__link}
								>
									Мои брони
								</Link>
							</>
						)}
						{roleId === ROLE.ADMIN ? (
							<Link
								to={RoutePaths[AppRoutes.ADMIN]}
								className={styles.header__link}
							>
								Панель администратора
							</Link>
						) : null}
					</nav>
					{roleId === ROLE.GUEST ? (
						<Button onClick={() => navigate(RoutePaths[AppRoutes.SIGN_IN])}>
							Вход / регистрация
						</Button>
					) : (
						<Button onClick={() => dispatch(logout())}>
							{userLogin}
							<LogoutIcon />
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};
