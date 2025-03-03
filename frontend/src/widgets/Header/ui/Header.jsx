import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/entities/user/model/actions';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '@/entities/user/model/selectors'; // TODO юзера видимо надо entities
import { Button, Logo } from '@/shared/ui';
import { ROLE } from '@/shared/lib';
import LogoutIcon from '@/shared/assets/log-out.svg?react';
import styles from './Header.module.scss';

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const userLogin = useSelector(selectUserLogin);
	const userSession = useSelector(selectUserSession);

	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.header__box}>
					<Logo />
					<nav className={styles.header__nav}>
						<Link to="/about" className={styles.header__link}>
							О гостинице
						</Link>
						{roleId === ROLE.GUEST ? null : (
							<>
								<Link to="/favorites" className={styles.header__link}>
									Избранное
								</Link>
								<Link to="/bookings" className={styles.header__link}>
									Мои брони
								</Link>
							</>
						)}
						{roleId === ROLE.ADMIN ? (
							<Link to="/admin" className={styles.header__link}>
								Панель администратора
							</Link>
						) : null}
					</nav>
					{roleId === ROLE.GUEST ? (
						<Button onClick={() => navigate('/login')}>
							Вход / регистрация
						</Button>
					) : (
						<Button onClick={() => dispatch(logout(userSession))}>
							{userLogin}
							<LogoutIcon />
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};
